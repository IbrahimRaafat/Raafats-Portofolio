import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { projects } from "./data";
import styles from "./style.module.css";

const Scene = dynamic(() => import("./Scene"), { ssr: false });

export default function ClientProjects() {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <>
      <Scene activeMenu={activeMenu} />
      <section
        ref={sectionRef}
        id="projects"
        className={`${styles.section} bg-[#f1f1f1]`}
      >
        <div className={styles.container}>
          <h2
            className={`${styles.title} ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } transition-all duration-700 ease-out`}
          >
            Clients / Projects
          </h2>

          <div
            className={`${styles.projectsList} ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
            } transition-all duration-700 ease-out delay-200`}
          >
            <ul
              className={styles.projectsList}
              onMouseLeave={() => {
                setActiveMenu(null);
              }}
            >
              {projects.map((project, i) => {
                return (
                  <li
                    key={project.title}
                    className={styles.projectItem}
                    onMouseOver={() => {
                      setActiveMenu(i);
                    }}
                  >
                    <p className={styles.projectTitle}>{project.title}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
