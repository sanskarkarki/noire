"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menu = [
  ["HIMALAYAN TROUT", "timur beurre blanc · charred leek · trout roe", "NPR 4,800"],
  ["SMOKED MOREL", "barley · wild herbs · cultured cream", "NPR 3,900"],
  ["FIRE & CELERIAC", "black garlic · hazelnut · mountain greens", "NPR 3,600"],
  ["CACAO / SEA SALT", "dark chocolate · fermented plum · tonka", "NPR 2,800"],
];

const photos = {
  hero: "/images/hero.jpg",
  room: "/images/room.jpg",
  chef: "/images/chef.jpg",
  trout: "/images/trout.jpg",
  morel: "/images/morel.jpg",
  celeriac: "/images/celeriac.jpg",
  dessert: "/images/dessert.jpg",
  tasting: "/images/tasting.jpg",
  candle: "/images/candle.jpg",
  privateRoom: "/images/private-room.jpg",
  chefCourse: "/images/chef-course.jpg",
  dessertCourse: "/images/dessert-course.jpg",
  formalTable: "/images/formal-table.jpg",
};

export default function NoireSite() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope);

      gsap.set(q(".hero-media img"), { scale: 1.14 });
      gsap.set(q(".hero-copy > *"), { y: 70, opacity: 0 });
      gsap.set(q(".nav > *"), { y: -18, opacity: 0 });

      gsap.timeline({ defaults: { ease: "power3.out" } })
        .to(q(".nav > *"), { y: 0, opacity: 1, duration: 0.8, stagger: 0.07 }, 0)
        .to(q(".hero-media img"), { scale: 1, duration: 1.7, ease: "power2.out" }, 0)
        .to(q(".hero-copy > *"), { y: 0, opacity: 1, duration: 1, stagger: 0.09 }, 0.25);

      gsap.utils.toArray<HTMLElement>(q(".reveal")).forEach((section) => {
        const items = section.querySelectorAll<HTMLElement>(".reveal-item");
        if (!items.length) return;
        gsap.fromTo(items, { y: 45, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 78%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>(q(".menu-row")).forEach((row, i) => {
        gsap.fromTo(row, { x: -35, opacity: 0 }, {
          x: 0, opacity: 1, duration: 0.8, delay: i * 0.04, ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", once: true },
        });
      });

      const storyMedia = q(".story-media")[0];
      const storyImage = q(".story-media img")[0];
      if (storyMedia && storyImage) {
        gsap.to(storyImage, {
          scale: 1.08,
          ease: "none",
          scrollTrigger: { trigger: storyMedia, start: "top bottom", end: "bottom top", scrub: true },
        });
      }

      // Safe magnetic interactions. Every target is checked before GSAP touches it.
      gsap.utils.toArray<HTMLElement>(q(".magnetic")).forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3.out" });
        const move = (e: MouseEvent) => {
          const r = el.getBoundingClientRect();
          xTo((e.clientX - (r.left + r.width / 2)) * 0.14);
          yTo((e.clientY - (r.top + r.height / 2)) * 0.14);
        };
        const leave = () => { xTo(0); yTo(0); };
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
        gsap.getTweensOf(el);
      });

      const cursor = q(".cursor")[0] as HTMLElement | undefined;
      const cursorDot = q(".cursor-dot")[0] as HTMLElement | undefined;
      if (cursor && cursorDot && window.matchMedia("(pointer:fine)").matches) {
        const cx = gsap.quickTo(cursor, "x", { duration: 0.45, ease: "power3.out" });
        const cy = gsap.quickTo(cursor, "y", { duration: 0.45, ease: "power3.out" });
        const dx = gsap.quickTo(cursorDot, "x", { duration: 0.12, ease: "power2.out" });
        const dy = gsap.quickTo(cursorDot, "y", { duration: 0.12, ease: "power2.out" });
        const move = (e: MouseEvent) => { cx(e.clientX); cy(e.clientY); dx(e.clientX); dy(e.clientY); };
        window.addEventListener("mousemove", move);
        cleanups.push(() => window.removeEventListener("mousemove", move));
      }
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  useLayoutEffect(() => {
    const scope = root.current;
    if (!scope) return;
    const cleanups: Array<() => void> = [];
    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope);

      // Loader
      const loader = q(".crazy-loader")[0] as HTMLElement | undefined;
      const number = q(".crazy-loader-number")[0] as HTMLElement | undefined;
      const line = q(".crazy-loader-line")[0] as HTMLElement | undefined;
      const loaderWord = q(".crazy-loader-word")[0] as HTMLElement | undefined;
      if (loader && number && line && loaderWord) {
        const progress = { value: 0 };
        gsap.to(progress, {
          value: 100,
          duration: 1.7,
          ease: "power3.inOut",
          onUpdate: () => { number.textContent = String(Math.round(progress.value)).padStart(2, "0"); },
        });
        gsap.fromTo(line, { scaleX: 0 }, {
          scaleX: 1, duration: 1.7, ease: "power3.inOut", transformOrigin: "left",
        });
        gsap.timeline({ delay: 1.7 })
          .to(loaderWord, { yPercent: -120, duration: 0.7, ease: "power4.inOut" })
          .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" }, "-=.15");
      }

      // IMPORTANT: the old global velocity-skew animation was removed.
      // It targeted .velocity-layer on every ScrollTrigger update even when that
      // element was unavailable, which caused the repeated "GSAP target not found" error.

      const hero = q(".hero-media")[0] as HTMLElement | undefined;
      if (hero && window.matchMedia("(pointer:fine)").matches) {
        const xTo = gsap.quickTo(hero, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(hero, "y", { duration: 0.8, ease: "power3.out" });
        const move = (e: MouseEvent) => {
          xTo((e.clientX / window.innerWidth - 0.5) * 14);
          yTo((e.clientY / window.innerHeight - 0.5) * 9);
        };
        window.addEventListener("mousemove", move);
        cleanups.push(() => window.removeEventListener("mousemove", move));
      }

      // Menu hover photography with explicit target checks.
      gsap.utils.toArray<HTMLElement>(q(".menu-row")).forEach((row, i) => {
        const image = row.querySelector<HTMLElement>(".menu-hover");
        const title = row.querySelector<HTMLElement>(".menu-main h3");
        if (!image || !title) return;

        const enter = () => {
          gsap.to(title, { x: 18, duration: 0.4, ease: "power3.out" });
          gsap.to(image, { opacity: 1, scale: 1, rotate: i % 2 ? -4 : 4, duration: 0.55, ease: "power3.out" });
        };
        const leave = () => {
          gsap.to(title, { x: 0, duration: 0.4, ease: "power3.out" });
          gsap.to(image, { opacity: 0, scale: 0.72, rotate: 0, duration: 0.45, ease: "power3.out" });
        };
        row.addEventListener("mouseenter", enter);
        row.addEventListener("mouseleave", leave);
        cleanups.push(() => {
          row.removeEventListener("mouseenter", enter);
          row.removeEventListener("mouseleave", leave);
        });
      });

      // FROM THE KITCHEN — smooth gallery loop.
      // It is intentionally NOT pinned. The document keeps flowing into the next section.
      const gallerySection = q(".crazy-gallery")[0] as HTMLElement | undefined;
      const foregroundCards = gsap.utils.toArray<HTMLElement>(q(".gallery-card"));
      const shadowCards = gsap.utils.toArray<HTMLElement>(q(".gallery-shadow-card"));

      if (gallerySection && foregroundCards.length) {
        let progress = 0;
        let lastTime = performance.now();
        let scrollBoost = 1;
        let rafId = 0;

        const setCard = (card: HTMLElement, p: number) => {
          const t = ((p % 1) + 1) % 1;
          const distance = Math.abs(t - 0.5) / 0.5;
          const focus = Math.pow(Math.max(0, 1 - distance), 1.8);
          const x = (t - 0.5) * window.innerWidth * 1.36;
          const scale = 0.70 + focus * 0.30;
          const opacity = 0.18 + focus * 0.82;
          const blur = distance * 3.2;

          gsap.set(card, {
            x,
            yPercent: -50,
            xPercent: -50,
            scale,
            opacity,
            filter: `blur(${blur}px) saturate(${0.82 + focus * 0.18}) contrast(${1 + focus * 0.05})`,
            zIndex: 20 + Math.round(focus * 50),
          });
        };

        const setShadow = (card: HTMLElement, p: number) => {
          const t = ((p % 1) + 1) % 1;
          const distance = Math.abs(t - 0.5) / 0.5;
          const focus = Math.pow(Math.max(0, 1 - distance), 1.25);
          const x = (t - 0.5) * window.innerWidth * 1.48;
          gsap.set(card, {
            x,
            yPercent: -50,
            xPercent: -50,
            scale: 0.72 + focus * 0.16,
            opacity: 0.018 + focus * 0.055,
            filter: `blur(${10 + distance * 5}px) saturate(.42) brightness(.38)`,
          });
        };

        const render = (now: number) => {
          const dt = Math.min(40, now - lastTime);
          lastTime = now;
          // Slower 1x-style pace. Scroll only nudges the speed slightly.
          progress += (dt / 1000) * 0.035 * scrollBoost;

          foregroundCards.forEach((card, i) => setCard(card, progress + i / foregroundCards.length));
          shadowCards.forEach((card, i) => setShadow(card, progress * 0.68 + i / Math.max(1, shadowCards.length)));
          rafId = requestAnimationFrame(render);
        };

        const speedTrigger = ScrollTrigger.create({
          trigger: gallerySection,
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            const velocity = Math.abs(self.getVelocity());
            const target = gsap.utils.clamp(0.98, 1.08, 1 + velocity / 11000);
            gsap.to({ value: scrollBoost }, {
              value: target,
              duration: 0.45,
              overwrite: true,
              ease: "power3.out",
              onUpdate: function () { scrollBoost = this.targets()[0].value; },
            });
          },
        });

        const renderNow = () => {
          foregroundCards.forEach((card, i) => setCard(card, progress + i / foregroundCards.length));
          shadowCards.forEach((card, i) => setShadow(card, progress * 0.68 + i / Math.max(1, shadowCards.length)));
        };

        const onResize = () => {
          renderNow();
          ScrollTrigger.refresh();
        };

        window.addEventListener("resize", onResize);
        rafId = requestAnimationFrame(render);
        renderNow();

        cleanups.push(() => {
          cancelAnimationFrame(rafId);
          speedTrigger.kill();
          window.removeEventListener("resize", onResize);
        });
      }

      // Rotating seal — only created if the element exists.
      const seal = q(".crazy-seal")[0];
      const story = q(".story")[0];
      if (seal && story) {
        gsap.to(seal, {
          rotation: 360,
          ease: "none",
          scrollTrigger: { trigger: story, start: "top bottom", end: "bottom top", scrub: 1.5 },
        });
      }

      // Portal animations — explicit guards prevent null GSAP targets.
      const portal = q(".image-portal")[0];
      const portalFrame = q(".portal-frame")[0];
      const portalWord = q(".portal-word")[0];
      if (portal && portalFrame) {
        gsap.fromTo(portalFrame,
          { clipPath: "inset(18% 28% 18% 28%)", scale: 0.88, rotate: -2 },
          {
            clipPath: "inset(0% 0% 0% 0%)", scale: 1, rotate: 0, ease: "none",
            scrollTrigger: { trigger: portal, start: "top bottom", end: "center center", scrub: 1 },
          }
        );
      }
      if (portal && portalWord) {
        gsap.to(portalWord, {
          yPercent: -55, xPercent: 12, opacity: 0.12, ease: "none",
          scrollTrigger: { trigger: portal, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }

      gsap.utils.toArray<HTMLElement>(q(".float-type")).forEach((el, i) => {
        gsap.to(el, {
          x: i % 2 ? 25 : -25,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 1 },
        });
      });
    }, root);

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      ctx.revert();
    };
  }, []);

  return (
    <main ref={root} className="site">
      <div className="crazy-loader">
        <div className="crazy-loader-word">NOIRÉ</div>
        <div className="crazy-loader-meta"><span>KATHMANDU / 2026</span><span className="crazy-loader-number">00</span></div>
        <div className="crazy-loader-line" />
      </div>
      <div className="cursor" />
      <div className="cursor-dot" />

      <nav className="nav">
        <Link className="logo" href="/">NOIRÉ</Link>
        <div className="nav-links">
          <Link href="/menu">MENU</Link>
          <Link href="/story">OUR STORY</Link>
          <Link href="/private-dining">PRIVATE DINING</Link>
          <a href="#contact">CONTACT</a>
        </div>
        <Link className="reserve-pill magnetic" href="/reservation">RESERVE A TABLE ↗</Link>
      </nav>

      <section className="hero hero-award">
        <div className="hero-media image-wrap">
          <img src={photos.hero} alt="Noiré restaurant dining" />
          <div className="image-overlay" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow">CONTEMPORARY FINE DINING / KATHMANDU / DINNER</p>
          <h1><span>A TABLE</span><span>WORTH</span><span><em>REMEMBERING.</em></span></h1>
          <p className="hero-description">A seven-course expression of the Himalayas — precise, restrained, and quietly theatrical.</p>
          <Link className="underlined-link magnetic" href="/menu">DISCOVER THE MENU ↗</Link>
          <div className="hero-rule" />
          <p className="micro">SEVEN COURSES / WINE PAIRING / LIMITED SEATS</p>
        </div>
      </section>

      <section className="intro reveal">
        <div className="intro-label reveal-item">01 / THE ROOM</div>
        <h2 className="reveal-item">Come for the food.<br />Stay for the feeling.</h2>
        <p className="intro-copy reveal-item">NOIRÉ is a contemporary tasting room rooted in Himalayan ingredients and classical technique. Each course is composed with restraint, then allowed one unexpected note.</p>
      </section>

      <section id="menu" className="menu-section reveal">
        <div className="section-label reveal-item">02 / TONIGHT&apos;S MENU</div>
        <div className="menu-list">
          {menu.map(([name, desc, price], i) => (
            <article className="menu-row" key={name}>
              <span className="menu-number">{String(i + 1).padStart(2, "0")}</span>
              <div className="menu-main"><h3>{name}</h3><p>{desc}</p></div>
              <span className="menu-price">{price}</span>
              <img className="menu-hover" src={[photos.tasting, photos.celeriac, photos.morel, photos.dessert][i]} alt="" />
            </article>
          ))}
        </div>
        <Link className="underlined-link" href="/menu">VIEW FULL MENU ↗</Link>
      </section>

      <section className="crazy-gallery" aria-label="Noiré visual journal">
        <div className="crazy-gallery-label">FROM THE KITCHEN / A MOVING TABLE</div>
        <div className="gallery-atmosphere" aria-hidden="true" />
        <div className="gallery-shadow-track" aria-hidden="true">
          {[photos.chef, photos.trout, photos.chefCourse, photos.dessertCourse, photos.formalTable].map((src, i) => (
            <div className="gallery-shadow-card" key={`shadow-${i}`}><img src={src} alt="" /></div>
          ))}
        </div>
        <div className="gallery-foreground">
          {[
            [photos.chef, "01 / THE PASS", "Chef finishing the first gesture"],
            [photos.trout, "02 / FIRST COURSE", "Himalayan trout / timur / smoke"],
            [photos.chefCourse, "03 / THE PLATE", "A composed plate at the pass"],
            [photos.dessertCourse, "04 / LAST COURSE", "The final note"],
            [photos.formalTable, "05 / AFTER DARK", "The room after service"],
          ].map(([src, label, note], i) => (
            <figure className="gallery-card" key={`${label}-${i}`}>
              <div className="gallery-glass">
                <img src={src} alt={note} />
                <div className="gallery-glass-shine" aria-hidden="true" />
                <span className="gallery-card-index">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <figcaption><span>{label}</span><small>{note}</small></figcaption>
            </figure>
          ))}
        </div>
        <div className="gallery-edge-note">SCROLL / LET THE TABLE PASS</div>
      </section>

      <section className="image-portal" aria-hidden="true">
        <div className="portal-word">NOIRÉ</div>
        <div className="portal-frame"><img src={photos.candle} alt="Fine dining service at Noiré" /></div>
        <span className="portal-note">EVERY PLATE / A SMALL EVENT</span>
      </section>

      <div className="marquee-band" aria-hidden="true">
        <div className="marquee-track">
          <span>NOIRÉ / HIMALAYAN INGREDIENTS / LIVE FIRE / SEASONAL PRODUCE / TIMUR / WOOD SMOKE / WILD BOTANICALS / PRECISION / SLOW FERMENTATION / LOCAL PRODUCERS / TASTING MENU / WINE PAIRINGS / CLASSICAL TECHNIQUE / A MOVING TABLE / </span>
          <span aria-hidden="true">NOIRÉ / HIMALAYAN INGREDIENTS / LIVE FIRE / SEASONAL PRODUCE / TIMUR / WOOD SMOKE / WILD BOTANICALS / PRECISION / SLOW FERMENTATION / LOCAL PRODUCERS / TASTING MENU / WINE PAIRINGS / CLASSICAL TECHNIQUE / A MOVING TABLE / </span>
        </div>
      </div>

      <section id="story" className="story reveal">
        <div className="story-media image-wrap reveal-item"><img src={photos.room} alt="Contemporary fine dining room at Noiré" /><div className="crazy-seal">NOIRÉ · KATHMANDU · 2026 ·</div></div>
        <div className="story-copy">
          <div className="section-label reveal-item">04 / OUR STORY</div>
          <h2 className="reveal-item">Built around fire.<br /><em>Grounded in place.</em></h2>
          <p className="reveal-item">From Himalayan botanicals to high-altitude produce, the menu follows the rhythm of the valley. We work with small producers, precise acids, gentle smoke, and patient fermentation.</p>
          <blockquote className="reveal-item">“The best meals leave a trace.”</blockquote>
          <Link className="underlined-link reveal-item" href="/story">MEET THE KITCHEN ↗</Link>
        </div>
      </section>

      <section id="private" className="private-dining reveal">
        <div className="private-photo reveal-item"><img src={photos.privateRoom} alt="Private fine dining room at Noiré" /></div>
        <div className="private-copy">
          <div className="section-label reveal-item">05 / AFTER DARK</div>
          <h2 className="reveal-item">Dinner,<br /><em>after hours.</em></h2>
          <p className="reveal-item">A quieter chapter of the experience — private tables, cellar selections, and an extended tasting menu after the city slows down.</p>
          <Link className="underlined-link magnetic reveal-item" href="/private-dining">EXPLORE PRIVATE DINING ↗</Link>
        </div>
      </section>

      <section id="reserve" className="booking reveal">
        <div className="booking-label reveal-item">06 / RESERVE</div>
        <div><h2 className="reveal-item">Save your seat.</h2><p className="reveal-item">Seven courses, one table. Reservations are limited each evening; smart evening attire is appreciated.</p></div>
        <Link className="booking-button magnetic reveal-item" href="/reservation">RESERVE A TABLE ↗</Link>
      </section>

      <footer id="contact">
        <div><div className="footer-logo">NOIRÉ</div><p>KATHMANDU / NEPAL</p><p>Thamel · 6:30 PM — 11 PM</p></div>
        <div className="footer-links"><a href="#">INSTAGRAM</a><Link href="/reservation">RESERVATIONS</Link><a href="#">PRESS</a></div>
        <div className="footer-bottom"><span>© 2026 NOIRÉ. Crafted slowly.</span><span>DESIGN / DIGITAL / EXPERIENCE</span></div>
      </footer>
    </main>
  );
}
