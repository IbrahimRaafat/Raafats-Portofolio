import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { micromark } from "micromark";
import StaggeredMenu from "@/components/StaggeredMenu";
import { getAllPosts, getPostBySlug, type PostMeta } from "@/lib/blog";
import { Inter, Cairo } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });
const cairo = Cairo({ subsets: ["arabic", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-cairo", display: "swap" });

export async function getStaticPaths() {
  const posts = getAllPosts();
  return { paths: posts.map((p) => ({ params: { slug: p.slug } })), fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { notFound: true };
  const { cover, ...meta } = post.meta;
  return { props: { meta: { ...meta, cover: cover ?? null }, html: micromark(post.content) } };
}

export default function Post({ meta, html }: { meta: Omit<PostMeta, "cover"> & { cover: string | null }; html: string }) {
  const [direction, setDirection] = useState<"rtl" | "ltr">(meta.dir ?? "ltr");
  const isRtl = direction === "rtl";

  const toggleDirection = () => {
    setDirection((prev) => (prev === "rtl" ? "ltr" : "rtl"));
  };

  const menuItems = [
    { label: "Home", ariaLabel: "Go home", link: "/" },
    { label: "Stack", ariaLabel: "Tech Stack", link: "/#stack" },
    { label: "Experience", ariaLabel: "Experience", link: "/#experience" },
    { label: "Blog", ariaLabel: "Blog", link: "/blog" },
    { label: "Contact", ariaLabel: "Contact", link: "/#contact" },
  ];

  const formattedDate = new Date(meta.date).toLocaleDateString(
    isRtl ? "ar-EG" : "en-GB",
    isRtl
      ? { day: "numeric", month: "long", year: "numeric" }
      : { day: "2-digit", month: "short", year: "numeric" }
  );

  return (
    <div className={`${inter.variable} ${cairo.variable} font-sans bg-[#f1f1f1] text-[#120F17] min-h-screen`}>
      <Head>
        <title>{`${meta.title} — Ibrahim Raafat`}</title>
        <meta name="description" content={meta.excerpt} />
        {meta.cover && <meta property="og:image" content={meta.cover} />}
        {meta.cover && <meta name="twitter:image" content={meta.cover} />}
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
      <main className="max-w-4xl mx-auto px-4 sm:px-8 md:px-12 pt-28 pb-20">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-700 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-sm transition-colors"
          >
            {isRtl ? "← كل المقالات" : "← All posts"}
          </Link>

          {/* Direction / Language Override Switch */}
          <button
            onClick={toggleDirection}
            title={isRtl ? "Switch to Left-to-Right" : "التبديل إلى اليمين لليسار"}
            className="inline-flex items-center gap-1.5 text-xs font-medium bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded-full shadow-2xs transition-colors cursor-pointer"
          >
            <span className="text-gray-400 font-mono text-[11px]">⇄</span>
            <span>{isRtl ? "English (LTR)" : "عربي (RTL)"}</span>
          </button>
        </div>

        <div
          dir={direction}
          lang={isRtl ? "ar" : "en"}
          className={`mt-8 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-10 md:p-12 shadow-sm ${
            isRtl ? "font-arabic text-right" : "text-left"
          }`}
        >
          {meta.cover && (
            <div className="mb-8 rounded-2xl bg-gradient-to-b from-[#f5f5f0] to-[#eae9e2] border border-gray-200/80 p-6 sm:p-8 flex items-center justify-center">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden shadow-md border border-black/5 bg-white p-2">
                <img
                  src={meta.cover}
                  alt={meta.title}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600">
            <span>{formattedDate}</span>
            <span aria-hidden>·</span>
            <span>{meta.readingTime}</span>
            {meta.tags.length > 0 && (
              <>
                <span aria-hidden>·</span>
                <span>{meta.tags.join(" · ")}</span>
              </>
            )}
          </div>

          <h1
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mt-3 ${
              isRtl ? "leading-[1.35]" : ""
            }`}
          >
            {meta.title}
          </h1>

          <p
            className={`mt-4 text-base sm:text-lg text-gray-600 leading-relaxed pb-8 border-b border-gray-100 ${
              isRtl ? "leading-[1.8]" : ""
            }`}
          >
            {meta.excerpt}
          </p>

          <article className="post-body mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
    </div>
  );
}
