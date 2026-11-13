import Link from "next/link";
import type { PostMeta } from "@/lib/blog";

function formatDate(d: string, isAr: boolean) {
  return new Date(d).toLocaleDateString(
    isAr ? "ar-EG" : "en-GB",
    isAr
      ? { day: "numeric", month: "long", year: "numeric" }
      : { day: "2-digit", month: "short", year: "numeric" }
  );
}

export default function BlogSection({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;

  return (
    <section id="blog" className="bg-[#ede9e3] py-16 md:py-24 border-t border-[#e0ddd8] overflow-hidden relative">
      {/* subtle paper texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 lg:px-24 relative">
        {/* Header — extrafazant-like large editorial intro */}
        <div className="mb-10 md:mb-14">
          <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-gray-500 flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-gray-400" aria-hidden /> 04 — Writing / Notes
          </p>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="relative">
              <h2 className="text-[2.6rem] sm:text-5xl lg:text-[3.6rem] font-black leading-[0.9] tracking-[-0.04em] text-gray-900">
                Ibra<span className="font-normal italic" style={{ fontFamily: "var(--font-display)" }}>&apos;s</span> Blog
              </h2>
              {/* hand-drawn underline squiggle */}
              <svg className="absolute -bottom-2 left-0 w-[180px] h-3 text-blue-600" viewBox="0 0 180 10" fill="none" aria-hidden>
                <path d="M2 7 Q 45 2, 90 6 T 178 4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
              </svg>
              <p className="mt-6 text-sm md:text-[15px] leading-relaxed text-gray-600 max-w-[36ch]">
                Notes on shipping, debugging the wire, and building with agents — small pieces, written to be useful.
              </p>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-gray-900 hover:bg-black text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shrink-0 self-start lg:self-auto"
            >
              View all posts <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* Editorial scattered layout — like extrafazant #intro: uneven, lots of air, slight rotations */}
        {posts.length >= 3 ? (
          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-5 items-start">
            {/* Sticker — green badge like "GEEN PRAATJES" */}
            <div className="hidden xl:flex absolute -top-2 -right-6 rotate-[8deg] z-10 pointer-events-none select-none">
              <div className="bg-[#2d6a4f] text-white font-black text-[11px] leading-none tracking-wide px-3 py-2.5 rounded-xl shadow-md border-2 border-white text-center">
                <div className="text-[10px]">✦</div>
                NO FLUFF.<br />JUST<br />NOTES.
              </div>
            </div>

            {/* Featured — big left, slight tilt */}
            {(() => {
              const featured = posts[0];
              const isArF = featured.lang === "ar" || featured.dir === "rtl";
              return (
                <Link
                  key={featured.slug}
                  href={`/blog/${featured.slug}`}
                  dir={isArF ? "rtl" : "ltr"}
                  lang={isArF ? "ar" : "en"}
                  className={`group lg:col-span-7 relative bg-white rounded-[20px] border border-black/[0.06] shadow-[0_18px_40px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col hover:shadow-[0_22px_50px_rgba(0,0,0,0.12)] transition-all duration-300 lg:rotate-[-0.4deg] hover:rotate-[0deg] ${isArF ? "font-arabic text-right" : "text-left"}`}
                >
                  {/* bubbly number */}
                  <span className="absolute top-3 left-3 z-10 bg-blue-600 text-white font-black text-xs px-2.5 py-1 rounded-full rotate-[-4deg]">01</span>
                  {featured.cover && (
                    <div className="relative h-[220px] sm:h-[280px] overflow-hidden bg-[#f7f5f1] border-b border-black/5">
                      <img src={featured.cover} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                      {/* bubbly title overlay like "Natasja" */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="inline-block bg-white/95 backdrop-blur px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide text-gray-900 shadow-sm">
                          {featured.tags[0] ?? "Essay"} • {featured.readingTime}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="p-6 sm:p-7 flex flex-col flex-1">
                    <div className={`text-xs font-medium text-gray-400 mb-2 ${isArF ? "flex-row-reverse" : ""} flex items-center gap-2`}>
                      <span>{formatDate(featured.date, isArF)}</span><span aria-hidden>·</span><span>{featured.readingTime}</span>
                    </div>
                    <h3 className="text-[1.45rem] sm:text-[1.65rem] font-black leading-[1.05] tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                      {featured.title}
                    </h3>
                    <p className="mt-3 text-[14px] leading-relaxed text-gray-600 line-clamp-3">{featured.excerpt}</p>
                    <div className={`mt-5 text-sm font-bold text-gray-900 flex items-center gap-1 ${isArF ? "flex-row-reverse justify-end" : ""}`}>
                      <span className="underline decoration-2 underline-offset-4 decoration-blue-600">{isArF ? "اقرأ المقال" : "Read article"}</span>
                      <span className={`transition-transform ${isArF ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>{isArF ? "←" : "→"}</span>
                    </div>
                  </div>
                </Link>
              );
            })()}

            {/* Right stack — staggered down */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:mt-10">
              {posts.slice(1, 3).map((post, i) => {
                const isAr = post.lang === "ar" || post.dir === "rtl";
                const rot = i === 0 ? "lg:rotate-[0.6deg]" : "lg:rotate-[-0.5deg]";
                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    dir={isAr ? "rtl" : "ltr"}
                    lang={isAr ? "ar" : "en"}
                    className={`group relative bg-white rounded-[20px] border border-black/[0.06] shadow-[0_12px_30px_rgba(0,0,0,0.07)] overflow-hidden flex flex-col hover:shadow-[0_18px_40px_rgba(0,0,0,0.11)] transition-all duration-300 ${rot} hover:rotate-[0deg] ${isAr ? "font-arabic text-right" : "text-left"}`}
                  >
                    <span className="absolute top-3 left-3 z-10 bg-white text-gray-900 border border-black/10 font-black text-[11px] px-2 py-1 rounded-full rotate-[3deg]">0{i + 2}</span>
                    {post.cover && (
                      <div className="relative h-[160px] sm:h-[180px] overflow-hidden bg-[#f7f5f1] border-b border-black/5">
                        <img src={post.cover} alt="" className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500" loading="lazy" />
                      </div>
                    )}
                    <div className="p-5 sm:p-6 flex flex-col flex-1">
                      <div className={`flex items-center gap-2 text-xs font-medium text-gray-400 mb-2 ${isAr ? "flex-row-reverse justify-end" : ""}`}>
                        <span>{formatDate(post.date, isAr)}</span><span aria-hidden>·</span><span>{post.readingTime}</span>
                      </div>
                      <h3 className="text-[1.15rem] sm:text-[1.25rem] font-black leading-tight tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                        {post.title}
                      </h3>
                      <p className="mt-2 text-[13.5px] leading-relaxed text-gray-600 line-clamp-2">{post.excerpt}</p>
                      <div className={`mt-4 text-sm font-bold text-gray-900 flex items-center gap-1 ${isAr ? "flex-row-reverse justify-end" : ""}`}>
                        <span className="underline decoration-2 underline-offset-4 decoration-blue-600/60 group-hover:decoration-blue-600">{isAr ? "اقرأ المقال" : "Read article"}</span>
                        <span className={`transition-transform ${isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}>{isAr ? "←" : "→"}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => {
              const isAr = post.lang === "ar" || post.dir === "rtl";
              return (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  dir={isAr ? "rtl" : "ltr"}
                  lang={isAr ? "ar" : "en"}
                  className={`group flex flex-col rounded-[20px] bg-white border border-black/[0.06] shadow-sm p-6 hover:shadow-md transition-all ${isAr ? "font-arabic text-right" : "text-left"}`}
                >
                  <div className={`flex items-center gap-2 text-xs font-medium text-gray-400 mb-3 ${isAr ? "flex-row-reverse justify-end" : ""}`}>
                    <span>{formatDate(post.date, isAr)}</span><span aria-hidden>·</span><span>{post.readingTime}</span>
                  </div>
                  <h3 className="text-lg font-black text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-gray-600 line-clamp-3">{post.excerpt}</p>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
