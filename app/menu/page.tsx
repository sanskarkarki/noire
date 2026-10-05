"use client";

import Link from "next/link";
import NoirePageShell from "../components/NoirePageShell";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const courses = [
  ["01", "THE FIRST GESTURE", "Himalayan trout", "timur beurre blanc · charred leek · trout roe", "trout.jpg"],
  ["02", "SMOKE / GREEN", "Fire & celeriac", "black garlic · mountain greens · hazelnut", "celeriac.jpg"],
  ["03", "THE MOUNTAIN", "Smoked morel", "barley · wild herbs · cultured cream", "morel.jpg"],
  ["04", "THE LAST NOTE", "Cacao / sea salt", "fermented plum · tonka · dark chocolate", "dessert.jpg"],
];

export default function MenuPage() {
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = list.current?.querySelectorAll<HTMLElement>(".menu-course");
    if (!rows) return;
    const handlers: Array<() => void> = [];
    rows.forEach((row) => {
      const image = row.querySelector<HTMLElement>(".menu-course-image");
      if (!image) return;
      const enter = () => gsap.to(image, { opacity: 1, scale: 1, rotate: 0, duration: 0.55, ease: "power3.out" });
      const leave = () => gsap.to(image, { opacity: 0, scale: 0.84, rotate: -3, duration: 0.4, ease: "power3.out" });
      row.addEventListener("mouseenter", enter);
      row.addEventListener("mouseleave", leave);
      handlers.push(() => { row.removeEventListener("mouseenter", enter); row.removeEventListener("mouseleave", leave); });
    });
    return () => handlers.forEach((fn) => fn());
  }, []);

  return (
    <NoirePageShell eyebrow="01 / THE TASTING · KATHMANDU / NEPAL" title={"THE\nTASTING\nMENU."}>
      <section className="menu-intro page-reveal">
        <p className="page-reveal-item">Seven courses shaped by the Himalayas — precise technique, seasonal ingredients and the quiet intensity of fire.</p>
        <a className="scroll-cue page-reveal-item" href="#taste">SCROLL TO TASTE ↓</a>
      </section>

      <section id="taste" className="menu-experience page-reveal" ref={list}>
        <div className="menu-experience-head">
          <div className="section-label page-reveal-item">01 / THE EXPERIENCE</div>
          <h2 className="page-reveal-item">A menu that<br /><em>moves with the season.</em></h2>
          <p className="page-reveal-item">Our tasting menu changes with the landscape. Ingredients arrive when they are at their most expressive, then disappear when the season turns.</p>
        </div>

        <div className="menu-course-list">
          {courses.map(([number, label, title, desc, image]) => (
            <article className="menu-course page-reveal-item" key={number}>
              <div className="menu-course-index">{number}</div>
              <div className="menu-course-copy">
                <span>{label}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
              <img className="menu-course-image" src={`/images/${image}`} alt={title} />
            </article>
          ))}
        </div>
      </section>

      <section className="menu-feature page-reveal">
        <div className="menu-feature-image page-image"><img src="/images/tasting.jpg" alt="Noiré tasting course" /></div>
        <div className="menu-feature-copy">
          <span className="section-label page-reveal-item">02 / THE TABLE</span>
          <h2 className="page-reveal-item">Nothing arrives<br /><em>by accident.</em></h2>
          <p className="page-reveal-item">Every course is a small piece of the valley — built around temperature, texture, smoke and acid. The sequence is designed to feel inevitable only after it is finished.</p>
          <Link className="underlined-link magnetic page-reveal-item" href="/reservation">RESERVE THE EXPERIENCE ↗</Link>
        </div>
      </section>
    </NoirePageShell>
  );
}
