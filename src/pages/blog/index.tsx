import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import StaggeredMenu from "@/components/StaggeredMenu";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { Inter, Cairo } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-cairo", display: "swap" });

function formatDate(d: string, isAr: boolean) {
  return new Date(d).toLocaleDateString(
    isAr ? "ar-EG" : "en-GB",
    isAr
      ? { day: "numeric", month: "long", year: "numeric" }
      : { day: "2-digit", month: "short", year: "numeric" }
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const [selectedLang, setSelectedLang] = useState<"all" | "en" | "ar">("all");

  const filteredPosts = posts.filter((p) => {
    if (selectedLang === "all") return true;
    return p.lang === selectedLang;
  });

  const hasArabic = posts.some((p) => p.lang === "ar");
  const hasEnglish = posts.some((p) => p.lang === "en");

  const menuItems = [
    { label: "Home", ariaLabel: "Go to home", link: "/" },
    { label: "Stack", ariaLabel: "View tech stack", link: "/#stack" },
    { label: "Experience", ariaLabel: "View experience", link: "/#experience" },
    { label: "Blog", ariaLabel: "Blog", link: "/blog" },
    { label: "Contact", ariaLabel: "Contact", link: "/#contact" },
  ];

  return (
    <div className={`${inter.variable} ${cairo.variable} font-sans bg-[#f1f1f1] text-[#120F17] min-h-screen`}>
      <Head>
        <title>Ibra&apos;s Blog — Ibrahim Raafat</title>
        <meta name="description" content="Technical notes on AI coding agents, data pipelines, Odoo automations, and web engineering." />
      </Head>
      <StaggeredMenu
        position="right"
        isFixed
        items={menuItems}
        socialItems={[]}
        displaySocials={false}
        displayItemNumbering={false}
        menuButtonColor="#2563eb"
        openMenuButtonColor="#2563eb"
        colors={["#f1f1f1", "#2563eb"]}
        accentColor="#2563eb"
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 pt-28 pb-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">
              Writing &amp; Research · كتابات وتجارب برمجية
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mt-3">
              Notes from the Lab
            </h1>
            <p className="mt-4 max-w-2xl text-gray-600 text-base sm:text-lg leading-relaxed">
              Deep-dives on AI coding agents, data plumbing, Odoo automations, and resilient web architectures.
            </p>
          </div>

          {/* Language filter pills (if multiple languages exist) */}
          {hasArabic && hasEnglish && (
            <div className="flex items-center gap-2 bg-white/80 p-1.5 rounded-full border border-gray-200 shadow-2xs self-start md:self-auto shrink-0">
              <button
                onClick={() => setSelectedLang("all")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedLang === "all"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All Posts
              </button>
              <button
                onClick={() => setSelectedLang("en")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedLang === "en"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                English
              </button>
              <button
                onClick={() => setSelectedLang("ar")}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold font-arabic transition-all cursor-pointer ${
                  selectedLang === "ar"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                العربية
              </button>
            </div>
          )}
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const isAr = post.lang === "ar" || post.dir === "rtl";
            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                dir={isAr ? "rtl" : "ltr"}
                lang={isAr ? "ar" : "en"}
                className={`group rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col ${
                  isAr ? "font-arabic text-right" : "text-left"
                }`}
              >
                {post.cover && (
                  <div className="mb-5 overflow-hidden rounded-xl bg-gradient-to-b from-[#f7f6f2] to-[#eeece4] border border-gray-200/80 p-5 flex items-center justify-center group-hover:scale-[1.01] transition-transform">
                    <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white p-1.5 shadow-sm border border-black/5">
                      <img
                        src={post.cover}
                        alt={post.title}
                        className="w-full h-full object-contain rounded-xl"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}

                <div className={`text-xs font-medium text-gray-400 flex items-center gap-2 ${isAr ? "flex-row-reverse justify-end" : ""}`}>
                  <span>{formatDate(post.date, isAr)}</span>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                  {post.lang === "ar" && (
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-bold">
                      عربي
                    </span>
                  )}
                </div>

                <h2
                  className={`text-xl font-bold text-gray-900 tracking-tight leading-snug mt-3 group-hover:text-blue-600 transition-colors ${
                    isAr ? "leading-[1.4]" : ""
                  }`}
                >
                  {post.title}
                </h2>

                <p
                  className={`text-sm text-gray-600 leading-relaxed mt-3 line-clamp-3 ${
                    isAr ? "leading-[1.7]" : ""
                  }`}
                >
                  {post.excerpt}
                </p>

                <div className={`mt-4 flex flex-wrap gap-1.5 ${isAr ? "flex-row-reverse" : ""}`}>
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium uppercase tracking-wide border border-gray-200 px-2.5 py-1 rounded-md bg-gray-50 text-gray-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className={`mt-auto pt-6 text-xs font-semibold text-blue-600 flex items-center gap-1.5 ${
                    isAr ? "flex-row-reverse justify-end" : ""
                  }`}
                >
                  <span>{isAr ? "اقرأ المقال" : "Read article"}</span>
                  <span
                    className={`transition-transform duration-200 ${
                      isAr ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"
                    }`}
                  >
                    {isAr ? "←" : "→"}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
