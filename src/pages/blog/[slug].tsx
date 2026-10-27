import Head from "next/head";
import Link from "next/link";
import { micromark } from "micromark";
import StaggeredMenu from "@/components/StaggeredMenu";
import { getAllPosts, getPostBySlug, type PostMeta } from "@/lib/blog";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

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
  const menuItems = [
    { label: "Home", ariaLabel: "Go home", link: "/" },
    { label: "Stack", ariaLabel: "Tech Stack", link: "/#stack" },
    { label: "Experience", ariaLabel: "Experience", link: "/#experience" },
    { label: "Blog", ariaLabel: "Blog", link: "/blog" },
    { label: "Contact", ariaLabel: "Contact", link: "/#contact" },
  ];
  return (
    <div className={`${inter.variable} font-sans bg-[#f1f1f1] text-[#120F17] min-h-screen`}>
      <Head>
        <title>{`${meta.title} — Ibrahim Raafat`}</title>
        <meta name="description" content={meta.excerpt} />
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
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-600 hover:text-blue-700 bg-white border border-gray-200 px-3.5 py-1.5 rounded-full shadow-sm transition-colors"
        >
          ← All posts
        </Link>
        <div className="mt-8 rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-10 md:p-12 shadow-sm">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-blue-600">
            {new Date(meta.date).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })} · {meta.tags.join(" · ")}
          </p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight mt-3">
            {meta.title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed pb-8 border-b border-gray-100">
            {meta.excerpt}
          </p>
          <article className="post-body mt-8" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </main>
    </div>
  );
}
