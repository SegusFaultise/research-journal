import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Research Blog",
  description: "A blog detailing findings from an Honours project.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="min-h-screen flex flex-col">
            <header className="border-b border-border">
              <div className="container mx-auto flex justify-between items-center p-4">
                <Link href="/" className="text-xl font-bold hover:opacity-80">
                  Research Journal
                </Link>
                <ThemeSwitcher />
              </div>
            </header>

            <div className="flex-grow">{children}</div>
            <footer className="border-t border-border py-4 text-center text-sm text-foreground/60">
              <div className="container mx-auto">
                Honours Project - {new Date().getFullYear()}
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
