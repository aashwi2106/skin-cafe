import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import heroSkin from "@/assets/hero-skin.jpg";
import clinic1 from "@/assets/clinic-1.png";
import clinic2 from "@/assets/clinic-2.png";
import clinic3 from "@/assets/clinic-3.png";
import clinic4 from "@/assets/clinic-4.png";
import facial from "@/assets/treatment-facial.jpg";
import hair from "@/assets/treatment-hair.jpg";
import laser from "@/assets/treatment-laser.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Skin Café — Holistic Skin Clinic | Dr. Manisha Chauhan, Ahmedabad" },
      { name: "description", content: "Premium dermatology in Ahmedabad. Acne, pigmentation, laser, anti-aging, PRP & holistic skin care by Dr. Manisha Chauhan (MBBS, DDVL)." },
      { property: "og:title", content: "Skin Café — Reveal Your Natural Glow" },
      { property: "og:description", content: "Advanced & holistic dermatology by Dr. Manisha Chauhan, Ahmedabad." },
      { property: "og:image", content: heroSkin },
      { name: "twitter:image", content: heroSkin },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/919712951633?text=Hi%20Skin%20Caf%C3%A9%2C%20I%27d%20like%20to%20book%20a%20consultation.";
const PHONE = "+919712951633";

/* ───────────── helpers ───────────── */

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("reveal");
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      const start = performance.now();
      const dur = 1600;
      const tick = (t: number) => {
        const p = Math.min(1, (t - start) / dur);
        const eased = 1 - Math.pow(1 - p, 3);
        setN(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.disconnect();
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>;
}

/* ───────────── data ───────────── */

const TREATMENTS = [
  { name: "Acne Treatment", desc: "Clear, calm, balanced skin.", img: facial },
  { name: "Pigmentation", desc: "Even tone, restored radiance.", img: facial },
  { name: "Anti-Aging", desc: "Time, refined.", img: facial },
  { name: "Laser Treatments", desc: "Precision aesthetic care.", img: laser },
  { name: "Chemical Peels", desc: "Renewal at the surface.", img: facial },
  { name: "Hair Loss & PRP", desc: "Fuller, healthier hair.", img: hair },
  { name: "Skin Rejuvenation", desc: "Glow, from within.", img: facial },
  { name: "Acne Scar Therapy", desc: "Smooth what was scarred.", img: laser },
];

const REVIEWS = [
  { name: "Aarti S.", text: "Dr. Manisha's approach is unmatched — calm, scientific, and deeply caring. My skin has never looked better.", role: "Pigmentation patient" },
  { name: "Rhea K.", text: "The clinic feels like a luxury retreat. Honest advice and visible results within weeks.", role: "Acne treatment" },
  { name: "Megha P.", text: "Six sessions of laser and my confidence is restored. Highly recommend Skin Café.", role: "Laser hair removal" },
  { name: "Sneha D.", text: "Premium experience start to finish. Dr. Manisha truly listens.", role: "Anti-aging" },
];

/* ───────────── components ───────────── */

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-4">
        <div className="glass rounded-full px-5 md:px-7 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <span className="serif text-xl text-gradient-rose">Skin Café</span>
            <span className="hidden md:inline text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Holistic Skin Clinic</span>
          </a>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#treatments" className="hover:text-primary transition-colors">Treatments</a>
            <a href="#doctor" className="hover:text-primary transition-colors">Doctor</a>
            <a href="#results" className="hover:text-primary transition-colors">Results</a>
            <a href="#clinic" className="hover:text-primary transition-colors">Clinic</a>
            <a href="#reviews" className="hover:text-primary transition-colors">Reviews</a>
          </nav>
          <a href="#book" className="px-4 md:px-5 py-2 text-xs md:text-sm rounded-full bg-foreground text-background hover:bg-primary transition-colors">
            Book Appointment
          </a>
        </div>
      </div>
    </header>
  );
}

function FloatingActions({ onQuiz }: { onQuiz: () => void }) {
  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col gap-3">
      <button onClick={onQuiz} title="Skin Quiz" className="glass rounded-full px-4 py-2 text-xs hover:bg-accent transition-colors hidden md:block">
        ✨ Skin Quiz
      </button>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="float-slow h-12 w-12 rounded-full bg-[oklch(0.7_0.16_150)] text-white grid place-items-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.555-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.692 5.558l-.999 3.648 3.796-.905zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/></svg>
      </a>
      <a href={`tel:${PHONE}`} aria-label="Call"
        className="h-12 w-12 rounded-full bg-primary text-primary-foreground grid place-items-center shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] hover:scale-105 transition-transform">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
      </a>
    </div>
  );
}

function Hero() {
  return (
    <section id="top" className="relative min-h-[100svh] overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroSkin} alt="Glowing skin" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/30 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-background/10 to-transparent" />
      </div>

      {/* floating orbs */}
      <div className="absolute top-32 right-10 h-72 w-72 rounded-full bg-[var(--blush)]/60 blur-3xl float-slow" />
      <div className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-[var(--rose-gold)]/30 blur-3xl float-slow" style={{ animationDelay: "2s" }} />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-40 md:pt-48 pb-20 min-h-[100svh] flex flex-col justify-center">
        <div className="max-w-3xl reveal">
          <div className="flex items-center gap-3 mb-8">
            <span className="h-px w-12 bg-[var(--rose-gold)]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-primary">Ahmedabad · Est. since 2014</span>
          </div>
          <h1 className="serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] text-foreground text-balance">
            Reveal Your<br />
            <span className="italic text-gradient-rose">Natural Glow.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
            Advanced dermatology & holistic skin care, thoughtfully delivered by
            <span className="text-foreground"> Dr. Manisha Chauhan</span> — MBBS, DDVL.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#book" className="group inline-flex items-center gap-3 px-7 py-4 rounded-full bg-foreground text-background text-sm tracking-wide hover:bg-primary transition-all hover:shadow-[var(--shadow-soft)]">
              Book Appointment
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
            <a href="#treatments" className="inline-flex items-center gap-3 px-7 py-4 rounded-full border border-foreground/30 text-sm hover:bg-foreground/5 transition-colors">
              Explore Treatments
            </a>
          </div>

          <div className="mt-16 flex items-center gap-8 text-xs text-muted-foreground">
            <div className="flex items-center gap-2"><span className="text-primary">★★★★★</span> 4.9 / 1000+ reviews</div>
            <div className="hidden md:block">·</div>
            <div className="hidden md:block">Mon–Sat · 10am–6pm</div>
          </div>
        </div>
      </div>

      {/* shimmer line bottom */}
      <div className="absolute bottom-0 inset-x-0 h-px shimmer-line" />
    </section>
  );
}

function Trust() {
  const ref = useReveal<HTMLDivElement>();
  const items = [
    { v: 1000, s: "+", l: "Happy Patients" },
    { v: 49,   s: "★", l: "Google Rating", div: 10 },
    { v: 10,   s: "+", l: "Years of Practice" },
    { v: 25,   s: "+", l: "Advanced Treatments" },
  ];
  return (
    <section className="py-28 bg-[var(--cream)] relative grain">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-2 md:grid-cols-4 gap-10">
        {items.map((it, i) => (
          <div key={i} className="text-center">
            <div className="serif text-5xl md:text-6xl text-foreground">
              {it.div ? (it.v / it.div).toFixed(1) : <Counter to={it.v} />}
              <span className="text-primary">{it.s}</span>
            </div>
            <div className="mt-3 text-[11px] tracking-[0.3em] uppercase text-muted-foreground">{it.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Doctor() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="doctor" className="py-28 md:py-40 relative">
      <div ref={ref} className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: rich typographic composition replacing photo */}
        <div className="relative flex flex-col justify-center min-h-[420px] md:min-h-[520px]">
          {/* decorative blush backdrop */}
          <div className="absolute -inset-8 bg-[var(--blush)]/60 rounded-[2.5rem] -z-10" />
          <div className="absolute -inset-2 border border-[var(--rose-gold)]/30 rounded-[2rem] -z-10" />

          <div className="relative z-10 px-6 py-10">
            <div className="serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.1] text-foreground text-balance">
              <span className="text-gradient-rose italic">"</span>
              Every face tells a story.<br />
              <span className="italic text-gradient-rose">My role is to help it glow.</span>
              <span className="text-gradient-rose italic">"</span>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6">
              <div className="glass rounded-2xl p-5">
                <div className="serif text-3xl text-foreground">10<span className="text-primary">+</span></div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">Years Practice</div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="serif text-3xl text-foreground">1K<span className="text-primary">+</span></div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">Patients Treated</div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="serif text-3xl text-foreground">25<span className="text-primary">+</span></div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">Procedures</div>
              </div>
              <div className="glass rounded-2xl p-5">
                <div className="serif text-3xl text-foreground">4.9<span className="text-primary">★</span></div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mt-1">Google Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-12 bg-[var(--rose-gold)]" />
            <span className="text-[11px] tracking-[0.35em] uppercase text-primary">About the Doctor</span>
          </div>
          <h2 className="serif text-4xl md:text-6xl leading-[1] text-balance">
            Skin as a <em className="italic text-gradient-rose">science</em>,<br />care as an art.
          </h2>
          <p className="mt-8 text-muted-foreground text-lg leading-relaxed max-w-xl">
            For over a decade, Dr. Manisha Chauhan has dedicated her practice to dermatology,
            cosmetology and laser surgery — blending evidence-based medicine with a holistic,
            patient-first philosophy.
          </p>
          <ul className="mt-10 space-y-4 text-sm">
            {["Dermatologist · Cosmetologist · LASER Surgeon",
              "Trained in advanced aesthetic & medical dermatology",
              "Personalized protocols for every skin type & concern",
              "Featured in leading wellness publications"].map(x => (
              <li key={x} className="flex items-start gap-3">
                <span className="mt-2 h-1 w-6 bg-[var(--rose-gold)]" />
                <span className="text-foreground/80">{x}</span>
              </li>
            ))}
          </ul>
          <a href="#book" className="mt-10 inline-flex items-center gap-3 text-sm border-b border-foreground/40 pb-1 hover:border-primary hover:text-primary transition-colors">
            Consult with Dr. Manisha →
          </a>
        </div>
      </div>
    </section>
  );
}

function Treatments() {
  return (
    <section id="treatments" className="py-28 md:py-40 bg-[var(--blush)]/40 relative">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-12 bg-[var(--rose-gold)]" />
              <span className="text-[11px] tracking-[0.35em] uppercase text-primary">Signature Treatments</span>
            </div>
            <h2 className="serif text-4xl md:text-6xl leading-[1] text-balance max-w-2xl">
              Considered care for <em className="italic text-gradient-rose">every concern.</em>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            Every treatment is preceded by a thorough consultation, so the protocol is shaped to your skin — not the other way around.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TREATMENTS.map((t, i) => (
            <article key={t.name} className="group relative overflow-hidden rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition-all duration-700">
              <div className="aspect-[4/5] overflow-hidden">
                <img src={t.img} alt={t.name} loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/0 to-transparent" />
              </div>
              <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-background/80">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="absolute bottom-0 inset-x-0 p-5 text-background">
                <h3 className="serif text-2xl">{t.name}</h3>
                <p className="text-xs text-background/80 mt-1">{t.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-xs opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  Learn more →
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const [pos, setPos] = useState(50);
  return (
    <section id="results" className="py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="text-center mb-14">
          <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">Real Results</div>
          <h2 className="serif text-4xl md:text-6xl text-balance">Before · <em className="italic text-gradient-rose">After</em></h2>
        </div>
        <div
          className="relative mx-auto max-w-4xl aspect-[16/10] rounded-2xl overflow-hidden select-none shadow-[var(--shadow-luxe)] cursor-ew-resize"
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setPos(Math.max(5, Math.min(95, ((e.clientX - r.left) / r.width) * 100)));
          }}
        >
          <img src={facial} alt="Before" className="absolute inset-0 h-full w-full object-cover" style={{ filter: "grayscale(0.4) brightness(0.85)" }} />
          <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <img src={facial} alt="After" className="h-full w-full object-cover" />
          </div>
          <div className="absolute top-4 left-4 text-[10px] tracking-[0.3em] uppercase text-white/90">Before</div>
          <div className="absolute top-4 right-4 text-[10px] tracking-[0.3em] uppercase text-white/90">After</div>
          <div className="absolute top-0 bottom-0" style={{ left: `${pos}%` }}>
            <div className="absolute inset-y-0 -translate-x-1/2 w-px bg-white/80" />
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-10 w-10 rounded-full bg-white grid place-items-center text-foreground shadow-lg">⇆</div>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-4">Drag to compare · Pigmentation, 6 sessions</p>
      </div>
    </section>
  );
}

function Gallery() {
  return (
    <section id="clinic" className="py-28 md:py-40 bg-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-10 mb-14 items-end">
          <div>
            <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">Inside the Clinic</div>
            <h2 className="serif text-4xl md:text-6xl text-balance">A sanctuary for your <em className="italic text-gradient-rose">skin.</em></h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Tucked in the heart of Ahmedabad, Skin Café is designed to feel less like a clinic
            and more like a calm, private retreat.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-12 gap-4">
          <img src={clinic1} className="col-span-2 md:col-span-7 aspect-[16/10] rounded-2xl object-cover w-full hover:scale-[1.01] transition-transform duration-700" alt="Reception" loading="lazy" />
          <img src={clinic2} className="col-span-1 md:col-span-5 aspect-[4/5] rounded-2xl object-cover w-full hover:scale-[1.01] transition-transform duration-700" alt="Treatment room" loading="lazy" />
          <img src={clinic3} className="col-span-1 md:col-span-5 aspect-[4/5] rounded-2xl object-cover w-full hover:scale-[1.01] transition-transform duration-700" alt="Consultation" loading="lazy" />
          <img src={clinic4} className="col-span-2 md:col-span-7 aspect-[16/10] rounded-2xl object-cover w-full hover:scale-[1.01] transition-transform duration-700" alt="Lounge" loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % REVIEWS.length), 5000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="reviews" className="py-28 md:py-40">
      <div className="mx-auto max-w-5xl px-6 md:px-10 text-center">
        <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-3">Patient Stories</div>
        <h2 className="serif text-4xl md:text-6xl text-balance mb-14">Words from those we&apos;ve <em className="italic text-gradient-rose">cared for.</em></h2>

        <div className="relative h-[260px] md:h-[200px]">
          {REVIEWS.map((r, idx) => (
            <figure
              key={r.name}
              className="absolute inset-0 transition-all duration-700 px-4"
              style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? "translateY(0)" : "translateY(20px)" }}
            >
              <div className="text-primary text-lg mb-4">★★★★★</div>
              <blockquote className="serif text-2xl md:text-3xl leading-snug text-balance text-foreground/90">
                "{r.text}"
              </blockquote>
              <figcaption className="mt-6 text-sm text-muted-foreground">— {r.name} · {r.role}</figcaption>
            </figure>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {REVIEWS.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)}
              className={`h-1 rounded-full transition-all ${i === idx ? "w-10 bg-primary" : "w-4 bg-border"}`}
              aria-label={`Review ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Satisfaction() {
  const ref = useReveal<HTMLDivElement>();
  const bars = [
    { label: "Patient Satisfaction", v: 98 },
    { label: "Treatment Success", v: 95 },
    { label: "Repeat Visits", v: 90 },
  ];
  return (
    <section className="py-28 md:py-36 bg-foreground text-background relative overflow-hidden">
      <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[var(--rose-gold)]/20 blur-3xl" />
      <div ref={ref} className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-[11px] tracking-[0.35em] uppercase text-[var(--rose-gold)] mb-4">By the Numbers</div>
          <h2 className="serif text-4xl md:text-6xl text-balance">Results that <em className="italic">speak softly.</em></h2>
          <p className="mt-6 text-background/70 max-w-md">Measured across consultations, follow-ups and patient satisfaction surveys over the past 24 months.</p>
        </div>
        <div className="space-y-10">
          {bars.map(b => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-sm text-background/80">{b.label}</span>
                <span className="serif text-3xl"><Counter to={b.v} suffix="%" /></span>
              </div>
              <div className="h-px bg-background/15 relative overflow-hidden">
                <div className="absolute inset-y-0 left-0 bg-[var(--rose-gold)] transition-all duration-[2000ms]" style={{ width: `${b.v}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Booking() {
  const [sent, setSent] = useState(false);
  return (
    <section id="book" className="py-28 md:py-40 bg-[var(--blush)]/50">
      <div className="mx-auto max-w-6xl px-6 md:px-10 grid md:grid-cols-2 gap-16">
        <div>
          <div className="text-[11px] tracking-[0.35em] uppercase text-primary mb-4">Book a Consultation</div>
          <h2 className="serif text-4xl md:text-6xl text-balance">Begin your <em className="italic text-gradient-rose">skin story.</em></h2>
          <p className="mt-6 text-muted-foreground max-w-md">
            Share a few details and our team will confirm your appointment within
            business hours. By appointment Sundays.
          </p>
          <div className="mt-10 space-y-4 text-sm">
            <div className="flex items-center gap-3"><span className="text-primary">·</span> +91 97129 51633</div>
            <div className="flex items-center gap-3"><span className="text-primary">·</span> skincafe@outlook.com</div>
            <div className="flex items-center gap-3"><span className="text-primary">·</span> Mon–Sat · 10am – 6pm</div>
          </div>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="glass rounded-3xl p-7 md:p-10 space-y-5"
        >
          {sent ? (
            <div className="py-10 text-center">
              <div className="serif text-3xl mb-3">Thank you ✿</div>
              <p className="text-muted-foreground text-sm">Your request has been received. We&apos;ll reach out shortly to confirm.</p>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Name" name="name" />
                <Field label="Phone" name="phone" type="tel" />
              </div>
              <Field label="Email" name="email" type="email" />
              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Concern</label>
                <select className="w-full mt-2 bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-primary text-sm">
                  {["Acne","Pigmentation","Hair Loss","Anti-Aging","Laser","Other"].map(o => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <Field label="Preferred date" name="date" type="date" />
                <Field label="Preferred time" name="time" type="time" />
              </div>
              <div>
                <label className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">Message</label>
                <textarea rows={3} className="w-full mt-2 bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-primary text-sm resize-none" />
              </div>
              <button className="w-full mt-4 py-4 rounded-full bg-foreground text-background text-sm tracking-wide hover:bg-primary transition-colors">
                Request Appointment
              </button>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="block text-center text-xs text-muted-foreground hover:text-primary">
                or message us on WhatsApp →
              </a>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} required
        className="w-full mt-2 bg-transparent border-b border-foreground/20 py-3 focus:outline-none focus:border-primary text-sm" />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background pt-20 pb-10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="serif text-3xl text-[var(--rose-gold)]">Skin Café</div>
          <p className="text-[10px] tracking-[0.3em] uppercase text-background/60 mt-2">The Holistic Skin Clinic</p>
          <p className="mt-6 text-sm text-background/70 max-w-sm leading-relaxed">
            Dermatology, cosmetology & laser surgery in Ahmedabad — by Dr. Manisha Chauhan (MBBS, DDVL).
          </p>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">Visit</div>
          <p className="text-sm text-background/70 leading-relaxed">
            Ahmedabad, Gujarat<br />India
          </p>
          <p className="text-sm text-background/70 mt-4">Mon–Sat · 10am – 6pm<br />Sun · 11am – 1pm (by appt.)</p>
        </div>
        <div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--rose-gold)] mb-4">Contact</div>
          <p className="text-sm text-background/70">+91 97129 51633</p>
          <p className="text-sm text-background/70">skincafe@outlook.com</p>
          <div className="mt-4 flex gap-3 text-xs">
            <a href="#" className="hover:text-[var(--rose-gold)]">Instagram</a>
            <a href="#" className="hover:text-[var(--rose-gold)]">Facebook</a>
            <a href="#" className="hover:text-[var(--rose-gold)]">Google</a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 md:px-10 mt-16 pt-8 border-t border-background/10 flex flex-wrap justify-between gap-4 text-xs text-background/50">
        <div>© {new Date().getFullYear()} Skin Café. All rights reserved.</div>
        <div>Crafted with care.</div>
      </div>
    </footer>
  );
}

function Quiz({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const concerns = ["Acne", "Hair Fall", "Pigmentation", "Anti-Aging"];
  const recos: Record<string, string> = {
    Acne: "A medical-grade acne protocol with chemical peels & topical regimen.",
    "Hair Fall": "PRP therapy with a personalised nutrition & topical plan.",
    Pigmentation: "Q-switched laser sessions paired with brightening peels.",
    "Anti-Aging": "Skin boosters, collagen-stimulating treatments & at-home regimen.",
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="glass rounded-3xl max-w-md w-full p-8" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <div className="text-[10px] tracking-[0.3em] uppercase text-primary">Skin Quiz</div>
          <button onClick={onClose} aria-label="Close" className="text-foreground/60 hover:text-foreground">✕</button>
        </div>
        {step === 0 ? (
          <>
            <h3 className="serif text-3xl mb-6">What is your main skin concern?</h3>
            <div className="grid grid-cols-2 gap-3">
              {concerns.map(c => (
                <button key={c} onClick={() => { setChoice(c); setStep(1); }}
                  className="py-4 rounded-xl border border-border hover:border-primary hover:bg-accent text-sm transition-all">
                  {c}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-xs text-muted-foreground mb-2">Our recommendation for {choice}:</div>
            <h3 className="serif text-2xl mb-6">{recos[choice!]}</h3>
            <a href="#book" onClick={onClose} className="block w-full text-center py-4 rounded-full bg-foreground text-background text-sm hover:bg-primary transition-colors">
              Book a Consultation
            </a>
          </>
        )}
      </div>
    </div>
  );
}

/* ───────────── page ───────────── */

function Index() {
  const [quiz, setQuiz] = useState(false);
  return (
    <main className="bg-background text-foreground">
      <Nav />
      <Hero />
      <Trust />
      <Doctor />
      <Treatments />
      <BeforeAfter />
      <Gallery />
      <Reviews />
      <Satisfaction />
      <Booking />
      <Footer />
      <FloatingActions onQuiz={() => setQuiz(true)} />
      <Quiz open={quiz} onClose={() => setQuiz(false)} />
    </main>
  );
}
