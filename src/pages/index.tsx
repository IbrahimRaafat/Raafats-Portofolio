import Image from "next/image";
import StaggeredMenu from "@/components/StaggeredMenu";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import FlowingMenu from "@/components/FlowingMenu";
import Contact from "@/components/Contact";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home page', link: '#hero' },
  { label: 'Experience', ariaLabel: 'View experience', link: '#experience' },
  { label: 'Projects', ariaLabel: 'View projects', link: '#projects' },
  { label: 'Blog', ariaLabel: 'Read blog', link: 'https://blog.ibrahimraafat.com' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/IbrahimRaafat' },
  { label: 'LinkedIn', link: 'https://linkedin.com/in/ibrahimraafat2000/' },
];

const projects = [
  { link: 'https://www.mazmrkt.com', text: 'Maz Mrkt', image: '/images/project1.png' },
  { link: '#', text: 'Project 2', image: '/images/project2.png' },
  { link: '#', text: 'Project 3', image: '/images/project3.png' },
  { link: '#', text: 'Project 4', image: '/images/project4.png' },
];

export default function Home() {
  return (
    <div className={`${inter.variable} font-sans bg-[#f1f1f1]`}>
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

      {/* Experience Section */}
      <Experience />

      {/* Projects Section */}
      <div id="projects" style={{ height: '100vh', position: 'relative', zIndex: 20 }}>
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

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
