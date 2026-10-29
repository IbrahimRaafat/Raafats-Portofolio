import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  cover?: string | null;
  readingTime: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

function readingTime(text: string) {
  const words = text.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} min`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "").replace(/^\d+-/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    return {
      slug,
      title: String(data.title ?? slug),
      date: String(data.date ?? "2025-01-01"),
      excerpt: String(data.excerpt ?? ""),
      tags: (data.tags as string[]) ?? [],
      cover: data.cover ? String(data.cover) : null,
      readingTime: readingTime(content),
    } as PostMeta;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): { meta: PostMeta; content: string } | null {
  if (!fs.existsSync(CONTENT_DIR)) return null;
  const files = fs.readdirSync(CONTENT_DIR);
  const match = files.find((f) => f.replace(/\.mdx?$/, "").replace(/^\d+-/, "") === slug);
  if (!match) return null;
  const raw = fs.readFileSync(path.join(CONTENT_DIR, match), "utf-8");
  const { data, content } = matter(raw);
  const meta: PostMeta = {
    slug,
    title: String(data.title ?? slug),
    date: String(data.date ?? "2025-01-01"),
    excerpt: String(data.excerpt ?? ""),
    tags: (data.tags as string[]) ?? [],
    cover: data.cover ? String(data.cover) : null,
    readingTime: readingTime(content),
  };
  return { meta, content };
}
