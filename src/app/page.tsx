"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

/* ─── ANIMATION VARIANTS ─────────────────────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.8, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

/* ─── PARTICLE MESH BACKGROUND ────────────────────────────── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const initParticles = useCallback((w: number, h: number) => {
    const count = Math.min(Math.floor((w * h) / 18000), 80);
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (particlesRef.current.length === 0) {
        initParticles(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      const particles = particlesRef.current;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      // draw connections
      const maxDist = 160;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // draw dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(6, 182, 212, 0.25)";
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animRef.current);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}

/* ─── NAVBAR ──────────────────────────────────────────────── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="font-serif text-xl text-white tracking-wide">
          Jag Singh
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#privacy"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            About
          </a>
          <a
            href="#audit"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Services
          </a>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors"
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── 1. HERO ─────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="relative z-10 max-w-4xl text-center">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs tracking-widest uppercase text-slate-400">
            AI Solutions Architect &middot; Sydney
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-white"
        >
          AI Architecture for the
          <br />
          <span className="text-gradient-amber">Data-First Enterprise.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          The efficiency of Generative AI. The security of Local-First systems.
          Built in Sydney.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#audit"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-amber-500 text-navy-950 text-sm font-bold tracking-wide uppercase rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            Book Your AI Audit
          </a>
          <a
            href="#privacy"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-semibold tracking-wide uppercase text-slate-300 glass hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          >
            See How It Works
          </a>
        </motion.div>

        {/* Decorative glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
}

/* ─── 2. THE PRIVACY WALL ─────────────────────────────────── */
function PrivacyWall() {
  const layers = [
    {
      label: "Your Data",
      desc: "Proprietary documents, client records, strategic plans",
      color: "text-amber-500",
      border: "border-amber-500/20",
    },
    {
      label: "Local LLM Layer",
      desc: "Llama 3, Mistral & fine-tuned models running on Apple Silicon",
      color: "text-cyan-400",
      border: "border-cyan-500/20",
    },
    {
      label: "AI Agent Layer",
      desc: "Custom agents for document analysis, lead triage, internal search",
      color: "text-cyan-400",
      border: "border-cyan-500/20",
    },
    {
      label: "Firewall",
      desc: "Zero data transmitted to external APIs or cloud LLMs",
      color: "text-red-400",
      border: "border-red-500/20",
    },
  ];

  return (
    <section id="privacy" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm tracking-widest uppercase text-cyan-400 mb-3">
            The Privacy Wall
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
            Your data never leaves
            <br />
            <span className="text-gradient-amber">your four walls.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl leading-relaxed">
            Most businesses pipe their most sensitive data into public LLMs.
            My architecture keeps everything on-premise &mdash; zero leakage,
            full control.
          </p>
        </motion.div>

        {/* Architecture Diagram */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {layers.map((l, i) => (
            <motion.div
              key={l.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className={`glass-strong rounded-xl p-6 border ${l.border} hover:glow-cyan transition-shadow duration-500`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 w-3 h-3 rounded-full ${l.color === "text-amber-500" ? "bg-amber-500" : l.color === "text-red-400" ? "bg-red-400" : "bg-cyan-400"} shrink-0`} />
                <div>
                  <h3 className={`font-semibold text-lg ${l.color}`}>
                    {l.label}
                  </h3>
                  <p className="mt-1 text-slate-400 text-sm leading-relaxed">
                    {l.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blocked Cloud */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={4}
          className="mt-8 glass-strong rounded-xl p-6 border border-red-500/10 text-center"
        >
          <p className="text-slate-500 text-sm uppercase tracking-widest mb-1">
            External Cloud LLMs
          </p>
          <p className="text-red-400 font-bold text-lg">
            Blocked &mdash; No data transmitted
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 3. THE OFFERS ───────────────────────────────────────── */
function Offers() {
  const offers = [
    {
      tag: "Most Popular",
      title: "The AI Readiness Audit",
      price: "$2,000",
      priceSub: "one-off",
      desc: "2-hour deep-dive + architecture blueprint",
      features: [
        "2-hour strategy session (recorded)",
        "Full data-privacy risk assessment",
        "Custom Local-First AI blueprint",
        "Hardware & model recommendations",
        "30-day post-audit email support",
      ],
      cta: "Book Your Audit",
      highlight: true,
    },
    {
      tag: "Ongoing",
      title: "The Fractional Architect",
      price: "$1,500",
      priceSub: "/month",
      desc: "Your AI architect on retainer",
      features: [
        "4 hours/month advisory",
        "Ongoing architecture support",
        "Workflow design & maintenance",
        "Priority async access",
        "Monthly progress reviews",
      ],
      cta: "Get Started",
      highlight: false,
    },
    {
      tag: "Automation",
      title: "Instant Lead Responder",
      price: "$1,000",
      priceSub: "setup + $199/mo",
      desc: "24/7 automated lead qualification",
      features: [
        "AI agent built for your pipeline",
        "24/7 lead qualification",
        "CRM integration",
        "Custom response templates",
        "Monthly performance reporting",
      ],
      cta: "Automate Leads",
      highlight: false,
    },
  ];

  return (
    <section id="audit" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="text-sm tracking-widest uppercase text-amber-500 mb-3">
            The Offers
          </p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
            Three ways to start.
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need a one-time blueprint, an ongoing architect, or
            instant automation &mdash; there&rsquo;s a path built for you.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          {offers.map((o, i) => (
            <motion.div
              key={o.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className={`relative glass-strong rounded-2xl p-8 border transition-shadow duration-500 flex flex-col ${
                o.highlight
                  ? "border-amber-500/20 hover:glow-amber"
                  : "border-white/5 hover:glow-cyan"
              }`}
            >
              {/* Tag */}
              <span
                className={`inline-block self-start text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-6 ${
                  o.highlight
                    ? "bg-amber-500/10 text-amber-500"
                    : "bg-cyan-500/10 text-cyan-400"
                }`}
              >
                {o.tag}
              </span>

              <h3 className="font-serif text-2xl font-medium text-white mb-2">
                {o.title}
              </h3>
              <p className="text-slate-400 text-sm mb-6">{o.desc}</p>

              <p className="font-serif text-4xl font-medium text-white mb-1">
                {o.price}
                <span className="text-base text-slate-500 font-sans ml-2">
                  {o.priceSub}
                </span>
              </p>

              <ul className="mt-6 space-y-3 text-slate-300 text-sm flex-1">
                {o.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-1 block w-1.5 h-1.5 rounded-full shrink-0 ${
                        o.highlight ? "bg-amber-500" : "bg-cyan-400"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block w-full text-center px-6 py-4 text-sm font-bold tracking-wide uppercase rounded-lg transition-all duration-300 ${
                  o.highlight
                    ? "bg-amber-500 text-navy-950 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
                    : "glass border border-cyan-500/20 text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                }`}
              >
                {o.cta}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-amber-500/5 blur-[150px] pointer-events-none" />
    </section>
  );
}

/* ─── 4. SOCIAL PROOF ─────────────────────────────────────── */
function SocialProof() {
  const credentials = [
    {
      value: "15+",
      label: "Years Delivery",
      accent: "text-gradient-amber",
    },
    {
      value: "AI Architect",
      label: "Product Delivery",
      accent: "text-gradient-cyan",
    },
    {
      value: "LLMOps",
      label: "Specialist",
      accent: "text-gradient-cyan",
    },
    {
      value: "MBA",
      label: "University of Illinois Urbana-Champaign",
      accent: "text-gradient-amber",
    },
    {
      value: "SAFe",
      label: "Certified",
      accent: "text-gradient-cyan",
    },
    {
      value: "PMP",
      label: "Certified",
      accent: "text-gradient-amber",
    },
  ];

  return (
    <section className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-cyan-400 mb-3">
            Credentials
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-white leading-tight">
            Not another AI hype merchant.
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Enterprise delivery experience. Real architecture. Real results.
          </p>
        </motion.div>

        {/* Top row: 3 items */}
        <div className="grid sm:grid-cols-3 gap-6">
          {credentials.slice(0, 3).map((c, i) => (
            <motion.div
              key={c.value}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="glass-strong rounded-xl p-8 text-center border border-white/5 hover:glow-cyan transition-shadow duration-500"
            >
              <p className={`font-serif text-4xl md:text-5xl font-medium ${c.accent}`}>
                {c.value}
              </p>
              <p className="mt-3 text-slate-400 text-sm tracking-widest uppercase">
                {c.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom row: 3 items */}
        <div className="mt-6 grid sm:grid-cols-3 gap-6">
          {credentials.slice(3).map((c, i) => (
            <motion.div
              key={c.value}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="glass-strong rounded-xl p-8 text-center border border-white/5 hover:glow-cyan transition-shadow duration-500"
            >
              <p className={`font-serif text-4xl md:text-5xl font-medium ${c.accent}`}>
                {c.value}
              </p>
              <p className="mt-3 text-slate-400 text-sm tracking-widest uppercase">
                {c.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── 5. FOOTER ───────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          &copy; 2026 Jag Singh AI | Built for Sydney businesses.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/pmjagraj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-cyan-400 text-sm transition-colors"
          >
            Calendly
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ─── PAGE ────────────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <ParticleBackground />
      <main className="relative z-10">
        <Navbar />
        <Hero />
        <PrivacyWall />
        <Offers />
        <SocialProof />
        <Footer />
      </main>
    </>
  );
}
