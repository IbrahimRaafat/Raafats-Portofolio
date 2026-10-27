import Head from "next/head";
import Link from "next/link";
import StaggeredMenu from "@/components/StaggeredMenu";
import { getAllPosts, type PostMeta } from "@/lib/blog";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-inter", display: "swap" });

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

export async function getStaticProps() {
  const posts = getAllPosts();
  return { props: { posts } };
}

export default function BlogIndex({ posts }: { posts: PostMeta[] }) {
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home", link: "/" },
    { label: "Stack", ariaLabel: "View tech stack", link: "/#stack" },
    { label: "Experience", ariaLabel: "View experience", link: "/#experience" },
    { label: "Blog", ariaLabel: "Blog", link: "/blog" },
    { label: "Contact", ariaLabel: "Contact", link: "/#contact" },
  ];
  return (
    <div className={`${inter.variable} font-sans bg-[#f1f1f1] text-[#120F17] min-h-screen`}>
      <Head>
        <title>Writing — Ibrahim Raafat</title>
        <meta name="description" content="Notes on pipelines, Odoo, scraping, and shipping systems that stick." />
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
        <p className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-wider">Writing &amp; Research</p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mt-3">Notes from the Lab</h1>
        <p className="mt-4 max-w-2xl text-gray-600 text-base sm:text-lg leading-relaxed">
          Deep-dives on data plumbing, Odoo automations, and web scraping — the engineering behind making systems reliable.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-gray-200/90 bg-white p-6 sm:p-7 shadow-sm hover:shadow-md transition-all flex flex-col"
            >
              <div className="text-xs font-medium text-gray-400 flex gap-2">
                <span>{formatDate(post.date)}</span>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight leading-snug mt-3 group-hover:text-blue-600 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mt-3 line-clamp-3">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
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
      </main>
    </div>
  );
}
