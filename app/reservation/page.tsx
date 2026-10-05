"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import NoirePageShell from "../components/NoirePageShell";

export default function ReservationPage() {
  const [guests, setGuests] = useState(2);
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <NoirePageShell eyebrow="NOIRÉ / KATHMANDU / RESERVATIONS" title={"YOUR\nTABLE."}>
      <section className="reservation-intro page-reveal">
        <p className="page-reveal-item">An evening at Noiré begins long before the first course arrives. Choose your evening below.</p>
      </section>

      <section className="reservation-layout page-reveal">
        <div className="reservation-form-wrap">
          <div className="reservation-kicker page-reveal-item">RESERVE / 01 — 04 GUESTS</div>
          <form className="reservation-form" onSubmit={submit}>
            <div className="guest-control page-reveal-item">
              <label>GUESTS</label>
              <div className="guest-stepper">
                <button type="button" onClick={() => setGuests((value) => Math.max(1, value - 1))}>−</button>
                <strong>{String(guests).padStart(2, "0")}</strong>
                <button type="button" onClick={() => setGuests((value) => Math.min(4, value + 1))}>+</button>
              </div>
            </div>
            <label className="field page-reveal-item"><span>DATE</span><input type="date" required /></label>
            <label className="field page-reveal-item"><span>TIME</span><select defaultValue="" required><option value="" disabled>SELECT TIME</option><option>18:30</option><option>19:00</option><option>19:30</option><option>20:00</option><option>20:30</option><option>21:00</option></select></label>
            <label className="field page-reveal-item"><span>NAME</span><input type="text" placeholder="YOUR NAME" required /></label>
            <label className="field page-reveal-item"><span>EMAIL</span><input type="email" placeholder="YOUR EMAIL" required /></label>
            <label className="field field-wide page-reveal-item"><span>NOTE</span><textarea placeholder="CELEBRATION / ALLERGIES / SPECIAL REQUEST" rows={4} /></label>
            <button className="booking-button magnetic reservation-submit page-reveal-item" type="submit">FIND A TABLE ↗</button>
            {submitted && <p className="reservation-success">Thank you. Your request has been received — our reservations team will confirm the evening directly.</p>}
          </form>
        </div>

        <aside className="reservation-side page-reveal">
          <div className="reservation-side-image page-image page-reveal-item"><img src="/images/formal-table.jpg" alt="Formal dining table at Noiré" /></div>
          <div className="reservation-details">
            <span className="section-label page-reveal-item">01 / THE EXPERIENCE</span>
            <p className="page-reveal-item">Our tasting menu unfolds over approximately two hours and thirty minutes.</p>
            <p className="page-reveal-item">For larger parties, private dining and special occasions, please contact our reservations team directly.</p>
            <div className="reservation-hours page-reveal-item"><strong>KATHMANDU</strong><span>NEPAL</span><span>DINNER</span><span>WED — SUN</span><span>18:00 — 22:30</span></div>
            <Link className="underlined-link page-reveal-item" href="/">RETURN HOME ↗</Link>
          </div>
        </aside>
      </section>
    </NoirePageShell>
  );
}
