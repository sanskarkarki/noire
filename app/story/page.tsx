"use client";

import Link from "next/link";
import NoirePageShell from "../components/NoirePageShell";

export default function StoryPage() {
  return (
    <NoirePageShell eyebrow="04 / OUR STORY · KATHMANDU / NEPAL" title={"BUILT\nAROUND\nFIRE."}>
      <section className="story-feature page-reveal">
        <div className="story-feature-image page-image page-reveal-item">
          <img src="/images/room.jpg" alt="Noiré dining room" />
          <div className="story-seal">NOIRÉ · KATHMANDU · 2026 ·</div>
        </div>
        <div className="story-feature-copy">
          <span className="section-label page-reveal-item">THE PLACE</span>
          <h2 className="page-reveal-item">A dining room<br /><em>rooted in place.</em></h2>
          <p className="page-reveal-item">Noiré began with a simple idea: fine dining in Kathmandu should feel unmistakably of here. The room is restrained so the plate can speak, while the menu follows the landscape through seasons, altitude and fire.</p>
          <p className="page-reveal-item">We work with small producers, Himalayan botanicals, high-altitude produce, precise acids, gentle smoke and patient fermentation.</p>
          <blockquote className="page-reveal-item">“The best meals leave a trace.”</blockquote>
        </div>
      </section>

      <section className="story-strip page-reveal">
        <div className="story-strip-image page-image page-reveal-item"><img src="/images/chef.jpg" alt="Chef working at the pass" /></div>
        <div className="story-strip-copy">
          <span className="section-label page-reveal-item">THE KITCHEN</span>
          <h2 className="page-reveal-item">Technique is quiet.<br /><em>Ingredients are not.</em></h2>
          <p className="page-reveal-item">Every service starts at the pass. Sauces are finished to order, plates are composed one by one, and every course is sent when it is ready — never simply when the clock says so.</p>
          <Link className="underlined-link magnetic page-reveal-item" href="/menu">FOLLOW THE MENU ↗</Link>
        </div>
      </section>

      <section className="story-values page-reveal">
        <div><span className="section-label page-reveal-item">01 / PLACE</span><h3 className="page-reveal-item">Himalayan ingredients.</h3><p className="page-reveal-item">The valley, forests and mountains shape what reaches the table.</p></div>
        <div><span className="section-label page-reveal-item">02 / FIRE</span><h3 className="page-reveal-item">Smoke with restraint.</h3><p className="page-reveal-item">Fire adds depth, never noise.</p></div>
        <div><span className="section-label page-reveal-item">03 / TIME</span><h3 className="page-reveal-item">A slower service.</h3><p className="page-reveal-item">Two and a half hours to let the evening unfold.</p></div>
      </section>
    </NoirePageShell>
  );
}
