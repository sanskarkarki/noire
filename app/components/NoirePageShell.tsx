"use client";

import { ReactNode, useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NoirePageShell({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;

    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope);
      const loader = q(".page-loader")[0] as HTMLElement | undefined;
      const loaderWord = q(".page-loader-word")[0] as HTMLElement | undefined;
      const loaderLine = q(".page-loader-line")[0] as HTMLElement | undefined;
      const loaderNumber = q(".page-loader-number")[0] as HTMLElement | undefined;

      if (loader && loaderWord && loaderLine && loaderNumber) {
        const progress = { value: 0 };
        gsap.to(progress, {
          value: 100,
          duration: 0.95,
          ease: "power3.inOut",
          onUpdate: () => {
            loaderNumber.textContent = String(Math.round(progress.value)).padStart(2, "0");
          },
        });
        gsap.fromTo(loaderLine, { scaleX: 0 }, { scaleX: 1, duration: 0.95, ease: "power3.inOut", transformOrigin: "left" });
        gsap.timeline({ delay: 0.95 })
          .to(loaderWord, { yPercent: -120, duration: 0.45, ease: "power4.inOut" })
          .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 0.65, ease: "power4.inOut" }, "-=.1");
      }

      gsap.fromTo(q(".subpage-hero > *"), { y: 42, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
      });

      q(".page-reveal").forEach((section) => {
        const items = (section as HTMLElement).querySelectorAll<HTMLElement>(".page-reveal-item");
        if (!items.length) return;
        gsap.fromTo(items, { y: 35, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            once: true,
          },
        });
      });

      q(".page-image").forEach((el) => {
        const image = (el as HTMLElement).querySelector("img");
        if (!image) return;
        gsap.fromTo(image, { scale: 1.08 }, {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      q(".magnetic").forEach((node) => {
        const el = node as HTMLElement;
        const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
        const move = (event: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          xTo((event.clientX - (rect.left + rect.width / 2)) * 0.12);
          yTo((event.clientY - (rect.top + rect.height / 2)) * 0.12);
        };
        const leave = () => { xTo(0); yTo(0); };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          el.removeEventListener("mousemove", move);
          el.removeEventListener("mouseleave", leave);
        });
      });

      const cursor = q(".cursor")[0] as HTMLElement | undefined;
      const dot = q(".cursor-dot")[0] as HTMLElement | undefined;
      if (cursor && dot && window.matchMedia("(pointer:fine)").matches) {
        const cx = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
        const cy = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });
        const dx = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power2.out" });
        const dy = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power2.out" });
        const move = (event: MouseEvent) => {
          cx(event.clientX); cy(event.clientY); dx(event.clientX); dy(event.clientY);
        };
        window.addEventListener("mousemove", move);
        cleanups.push(() => window.removeEventListener("mousemove", move));
      }
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root} className="site noire-subpage">
      <div className="page-loader" aria-hidden="true">
        <div className="page-loader-word">NOIRÉ</div>
        <div className="page-loader-meta"><span>KATHMANDU / 2026</span><span className="page-loader-number">00</span></div>
        <div className="page-loader-line" />
      </div>
      <div className="cursor" aria-hidden="true" />
      <div className="cursor-dot" aria-hidden="true" />

      <nav className="nav subpage-nav">
        <Link className="logo" href="/">NOIRÉ</Link>
        <div className="nav-links">
          <Link href="/menu">MENU</Link>
          <Link href="/story">OUR STORY</Link>
          <Link href="/private-dining">PRIVATE DINING</Link>
          <Link href="/#contact">CONTACT</Link>
        </div>
        <Link className="reserve-pill magnetic" href="/reservation">RESERVE A TABLE ↗</Link>
      </nav>

      <header className="subpage-hero">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
      </header>

      {children}

      <footer id="contact">
        <div><div className="footer-logo">NOIRÉ</div><p>KATHMANDU / NEPAL</p><p>Thamel · 6:30 PM — 11 PM</p></div>
        <div className="footer-links"><Link href="/#contact">INSTAGRAM</Link><Link href="/reservation">RESERVATIONS</Link><Link href="/#contact">PRESS</Link></div>
        <div className="footer-bottom"><span>© 2026 NOIRÉ. Crafted slowly.</span><span>DESIGN / DIGITAL / EXPERIENCE</span></div>
      </footer>
    </main>
  );
}
