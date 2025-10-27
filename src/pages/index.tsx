import Image from "next/image";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export default function Home() {
  return (
    <div className={`${inter.variable} font-sans bg-[#fcf5eb]`}>
      <Navbar />
      
      {/* Hero Section */}
      <Hero />

      {/* Experience Section */}
      {/* <Experience /> */}

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <Contact />
    </div>
  );
}
