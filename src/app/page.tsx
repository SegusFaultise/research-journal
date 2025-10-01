import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";

const POSTS_PATH = path.join(process.cwd(), "_posts");

function getPosts() {
  const files = fs.readdirSync(POSTS_PATH);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const filePath = path.join(POSTS_PATH, file);
      const fileContent = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug: slug,
        title: data.title,
        excerpt: data.excerpt,
      };
    });
}

export default function HomePage() {
  const allPosts = getPosts();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-extrabold mb-8 border-b border-border pb-4">
        Findings
      </h1>
      <div className="space-y-4">
        {allPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 border border-border hover:border-primary/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-foreground/80">{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
