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
  lang: "ar" | "en";
  dir: "rtl" | "ltr";
};

const CONTENT_DIR = path.join(process.cwd(), "content/blog");

export function isArabicText(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

function readingTime(text: string, isAr: boolean) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  if (isAr) {
    return mins === 1 ? "دقيقة واحدة" : mins === 2 ? "دقيقتان" : `${mins} دقائق قراءة`;
  }
  return `${mins} min read`;
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const files = fs.readdirSync(CONTENT_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts = files.map((file) => {
    const slug = file.replace(/\.mdx?$/, "").replace(/^\d+-/, "");
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const title = String(data.title ?? slug);
    const excerpt = String(data.excerpt ?? "");
    const detectedArabic = isArabicText(title) || isArabicText(excerpt) || isArabicText(content.slice(0, 500));
    const lang: "ar" | "en" = (data.lang as "ar" | "en") ?? (detectedArabic ? "ar" : "en");
    const dir: "rtl" | "ltr" = (data.dir as "rtl" | "ltr") ?? (lang === "ar" ? "rtl" : "ltr");

    return {
      slug,
      title,
      date: String(data.date ?? "2025-01-01"),
      excerpt,
      tags: (data.tags as string[]) ?? [],
      cover: data.cover ? String(data.cover) : null,
      readingTime: readingTime(content, lang === "ar"),
      lang,
      dir,
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
  const title = String(data.title ?? slug);
  const excerpt = String(data.excerpt ?? "");
  const detectedArabic = isArabicText(title) || isArabicText(excerpt) || isArabicText(content.slice(0, 500));
  const lang: "ar" | "en" = (data.lang as "ar" | "en") ?? (detectedArabic ? "ar" : "en");
  const dir: "rtl" | "ltr" = (data.dir as "rtl" | "ltr") ?? (lang === "ar" ? "rtl" : "ltr");

  const meta: PostMeta = {
    slug,
    title,
    date: String(data.date ?? "2025-01-01"),
    excerpt,
    tags: (data.tags as string[]) ?? [],
    cover: data.cover ? String(data.cover) : null,
    readingTime: readingTime(content, lang === "ar"),
    lang,
    dir,
  };
  return { meta, content };
}
