import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export default function BlogSection({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;
  return (
    <section id="blog" className="bg-[#f1f1f1] py-16 md:py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider mb-2">Writing &amp; Notes</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
              Pipelines, Odoo &amp; Scraping at Scale
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm hover:shadow shrink-0 self-start md:self-auto"
          >
            View all posts <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400 mb-3">
                <span>{formatDate(post.date)}</span>
                <span aria-hidden>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.slice(0, 2).map((t) => (
                  <span key={t} className="text-[11px] font-medium uppercase tracking-wide border border-gray-200 px-2.5 py-1 rounded-md bg-gray-50 text-gray-600">
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-auto pt-6 text-xs font-semibold text-blue-600 flex items-center gap-1">
                Read article <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
