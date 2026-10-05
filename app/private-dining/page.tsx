"use client";

import Link from "next/link";
import NoirePageShell from "../components/NoirePageShell";

const rooms = [
  ["01", "THE PRIVATE TABLE", "A room within the room.", "A secluded table for evenings that deserve a slower pace — the full tasting menu, cellar selections and service shaped around your party.", "private-room.jpg"],
  ["02", "THE CELLAR", "Bottles with a sense of place.", "Small-production wines and Himalayan-inspired pairings are selected to follow the menu rather than overpower it.", "formal-table.jpg"],
  ["03", "AFTER DARK", "Dinner, after hours.", "Extended tasting menus are available for private occasions, with a quieter final course once the city has gone still.", "candle.jpg"],
];

export default function PrivateDiningPage() {
  return (
    <NoirePageShell eyebrow="03 / PRIVATE DINING · AFTER DARK" title={"DINNER,\nAFTER\nHOURS."}>
      <section className="private-intro page-reveal">
        <div className="private-intro-copy">
          <span className="section-label page-reveal-item">A QUIETER CHAPTER</span>
          <p className="private-lead page-reveal-item">For nights that call for a little more time, Noiré opens beyond the dining room — intimate tables, deeper pours and an extended expression of the menu.</p>
        </div>
        <div className="private-intro-image page-image"><img src="/images/private-room.jpg" alt="Private fine dining room at Noiré" /></div>
      </section>

      <section className="private-chapters page-reveal">
        {rooms.map(([number, label, title, desc, image], i) => (
          <article className={`private-chapter private-chapter-${i + 1}`} key={number}>
            <div className="private-chapter-image page-image"><img src={`/images/${image}`} alt={title} /></div>
            <div className="private-chapter-copy">
              <span className="section-label page-reveal-item">{number} / {label}</span>
              <h2 className="page-reveal-item">{title}</h2>
              <p className="page-reveal-item">{desc}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="private-cta page-reveal">
        <span className="section-label page-reveal-item">PRIVATE OCCASIONS</span>
        <h2 className="page-reveal-item">Make the evening<br /><em>entirely yours.</em></h2>
        <p className="page-reveal-item">For parties, celebrations and special requests, our reservations team can shape the experience around your table.</p>
        <Link className="booking-button magnetic page-reveal-item" href="/reservation">ENQUIRE / RESERVE ↗</Link>
      </section>
    </NoirePageShell>
  );
}
