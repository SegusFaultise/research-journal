import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

const POSTS_PATH = path.join(process.cwd(), '_posts');

interface PostFrontmatter {
  title: string;
  date: string;
  author: string;
  excerpt: string;
}

async function getPost(slug: string) {
  const filePath = path.join(POSTS_PATH, `${slug}.mdx`);
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContent);
    return {
      frontmatter: data as PostFrontmatter,
      content,
    };
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(POSTS_PATH);
  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
      slug: file.replace('.mdx', ''),
    }));
}

export default async function PostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { frontmatter, content } = await getPost(params.slug);

  return (
    <main className="container mx-auto px-4 py-8">
      <article className="prose dark:prose-invert lg:prose-lg max-w-none">
        <div className="border-b pb-4 mb-8">
          <h1 className="text-4xl font-bold">{frontmatter.title}</h1>
          <p className="text-foreground/60 mt-2">
            By {frontmatter.author} on {new Date(frontmatter.date).toLocaleDateString()}
          </p>
        </div>

        <MDXRemote source={content} />
      </article>
    </main>
  );
}
