import Head from "next/head";
import StaggeredMenu from "@/components/StaggeredMenu";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import FlowingMenu from "@/components/FlowingMenu";
import Contact from "@/components/Contact";
import { Inter } from "next/font/google";

const SITE_URL = "https://ibrahimraafat.com";
const TITLE = "Ibrahim Raafat | Full Stack Engineer";
const DESCRIPTION =
  "Ibrahim Raafat is a Full Stack Engineer based in Cairo, Egypt — building scalable web apps, APIs, and data pipelines with React, Next.js, Python, Flask, and AWS.";
const OG_IMAGE = `${SITE_URL}/og-image.png`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Ibrahim Raafat",
      jobTitle: "Full Stack Engineer",
      url: SITE_URL,
      sameAs: [
        "https://github.com/IbrahimRaafat",
        "https://linkedin.com/in/ibrahimraafat2000/",
        "https://blog.ibrahimraafat.com",
      ],
      knowsAbout: [
        "Full Stack Engineering",
        "React",
        "Next.js",
        "Python",
        "Flask",
        "AWS",
        "PostgreSQL",
        "Web Scraping",
        "Data Pipelines",
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cairo",
        addressCountry: "EG",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      author: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-US",
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      description: DESCRIPTION,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Clients", item: `${SITE_URL}/#clients` },
          { "@type": "ListItem", position: 3, name: "Experience", item: `${SITE_URL}/#experience` },
          { "@type": "ListItem", position: 4, name: "Blog", item: "https://blog.ibrahimraafat.com" },
          { "@type": "ListItem", position: 5, name: "Contact", item: `${SITE_URL}/#contact` },
        ],
      },
    },
    {
      "@type": "SiteNavigationElement",
      "@id": `${SITE_URL}/#navigation`,
      name: "Main Navigation",
      hasPart: [
        { "@type": "WebPage", name: "Home", url: `${SITE_URL}/` },
        { "@type": "WebPage", name: "Clients", url: `${SITE_URL}/#clients` },
        { "@type": "WebPage", name: "Experience", url: `${SITE_URL}/#experience` },
        { "@type": "WebPage", name: "Blog", url: "https://blog.ibrahimraafat.com" },
        { "@type": "WebPage", name: "Contact", url: `${SITE_URL}/#contact` },
      ],
    },
  ],
};

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#hero' },
  { label: 'Clients', ariaLabel: 'View clients', link: '#clients' },
  { label: 'Experience', ariaLabel: 'View experience', link: '#experience' },
  // { label: 'Blog', ariaLabel: 'Read blog', link: 'https://blog.ibrahimraafat.com' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/IbrahimRaafat' },
  { label: 'LinkedIn', link: 'https://linkedin.com/in/ibrahimraafat2000/' },
];

const projects = [
  { link: '/maz', text: 'Maz Mrkt', image: '/images/maz-logo.svg' },
  { link: '/coins-cloth', text: 'Coins & Cloth', image: '/images/coins-cloth-logo.png' },
  { link: '/kolr', text: 'Kolr Perfumes', image: '/images/kolr-logo.webp' },
  // { link: '#', text: 'Project 3', image: '/images/project3.png' },
  // { link: '#', text: 'Project 4', image: '/images/project4.png' },
];

export default function Home() {
  return (
    <div className={`${inter.variable} font-sans bg-[#f1f1f1]`}>
      <Head>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <meta
          name="keywords"
          content="Ibrahim Raafat, Full Stack Engineer, React developer, Next.js developer, Python developer, Flask, AWS, Cairo Egypt, web developer portfolio, full stack developer Egypt"
        />
        <meta name="author" content="Ibrahim Raafat" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${SITE_URL}/`} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Ibrahim Raafat — Full Stack Engineer portfolio" />
        <meta property="og:site_name" content="Ibrahim Raafat" />
        <meta property="og:locale" content="en_US" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={OG_IMAGE} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>
      <StaggeredMenu
        position="right"
        isFixed
        items={menuItems}
        socialItems={socialItems}
        displaySocials
        displayItemNumbering={true}
        menuButtonColor="#3b82f6"
        openMenuButtonColor="#3b82f6"
        changeMenuColorOnOpen={true}
        colors={['#f1f1f1', '#3b82f6']}
        accentColor="#3b82f6"
      />
      
      {/* Hero Section */}
      <Hero />

      {/* Clients Section */}
      <section id="clients" className="relative bg-[#f1f1f1] py-8 md:py-12 lg:py-16" style={{ zIndex: 20 }}>
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 mb-6">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-[#120F17] leading-tight">
            Clients
          </h2>
        </div>
        <div style={{ height: 'auto', position: 'relative' }}>
          <FlowingMenu
            items={projects}
            speed={15}
            textColor="#120F17"
            bgColor="#f1f1f1"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#120F17"
            borderColor="#120F17"
          />
        </div>
      </section>

      {/* Experience Section */}
      <Experience />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
