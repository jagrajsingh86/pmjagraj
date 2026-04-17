"use client";

import { useEffect, useRef, useCallback, useState, FormEvent } from "react";
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

      const maxDist = 160;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(217, 119, 6, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(217, 119, 6, 0.22)";
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
        <a href="#" className="text-lg font-bold text-white tracking-tight">
          Jag Singh AI
        </a>
        <div className="flex items-center gap-6 md:gap-8">
          <a
            href="#pulse"
            className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
          >
            Newsletter
          </a>
          <a
            href="#vault"
            className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
          >
            Blueprints
          </a>
          <a
            href="#community"
            className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
          >
            Community
          </a>
          <a
            href="#about"
            className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
          >
            About
          </a>
          <a
            href="#pulse"
            className="hidden sm:inline-flex text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors"
          >
            Subscribe
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
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-xs tracking-widest uppercase text-slate-400">
            A Resource Hub for AI Leaders &middot; Sydney
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white"
        >
          Master the Architecture
          <br />
          of <span className="text-gradient-amber">Private AI.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Insights, Blueprints, and Community for leaders who build.
          No fluff. No vendor hype. Just the playbook used by Sydney&rsquo;s
          most disciplined AI operators.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#pulse"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#d97706] text-[#020617] text-sm font-bold tracking-wide uppercase rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,6,0.35)]"
          >
            Join The Pulse
          </a>
          <a
            href="#vault"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-semibold tracking-wide uppercase text-slate-300 glass hover:border-amber-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(217,119,6,0.1)]"
          >
            Browse Blueprints
          </a>
        </motion.div>

        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
}

/* ─── 2. THE PRIVATE AI PULSE — NEWSLETTER ──────────────── */
function Pulse() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">(
    "idle"
  );

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("err");
      return;
    }
    setStatus("loading");
    try {
      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus("ok");
      setEmail("");
    } catch {
      setStatus("err");
    }
  }

  return (
    <section id="pulse" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-strong rounded-2xl border border-[#d97706]/20 p-10 md:p-14 text-center hover:glow-amber transition-shadow duration-500"
        >
          <p className="text-sm tracking-widest uppercase text-[#d97706] mb-3">
            The Private AI Pulse
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
            One dispatch. Every Sunday.
            <br />
            <span className="text-gradient-amber">Zero noise.</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">
            Field-tested blueprints, architecture notes, and security patterns
            from the front lines of private AI deployment. Read in six minutes.
          </p>

          <form
            onSubmit={onSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
          >
            <input
              type="email"
              required
              placeholder="you@yourcompany.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 rounded-lg glass border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-amber-500/50 focus:shadow-[0_0_20px_rgba(217,119,6,0.15)] transition-all"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="px-7 py-4 bg-[#d97706] text-[#020617] text-sm font-bold tracking-wide uppercase rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,6,0.35)] disabled:opacity-60"
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </form>

          {status === "ok" && (
            <p className="mt-5 text-sm text-amber-400">
              Welcome aboard. Check your inbox to confirm.
            </p>
          )}
          {status === "err" && (
            <p className="mt-5 text-sm text-red-400">
              Something went wrong. Try a different address.
            </p>
          )}

          <p className="mt-6 text-xs text-slate-500 tracking-wider">
            No spam. Unsubscribe in one click. Read by 1,200+ leaders.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 3. THE RESOURCE VAULT ──────────────────────────────── */
function Vault() {
  const blueprints = [
    {
      series: "BLUEPRINT · 01",
      title: "The Local-First AI Checklist",
      desc: "32-point readiness audit for deploying private LLMs on-premise. Hardware, runtime, RAG pipeline, and compliance gates.",
      format: "PDF · 18 pages",
      accent: "amber",
    },
    {
      series: "BLUEPRINT · 02",
      title: "The AI Readiness Template",
      desc: "Board-ready scorecard covering data residency, workflow fit, ROI modelling, and change-management risk.",
      format: "Notion + PDF",
      accent: "cyan",
    },
    {
      series: "BLUEPRINT · 03",
      title: "The RAG Architecture Playbook",
      desc: "Reference architectures for internal knowledge retrieval — embedding strategy, chunking, and retrieval scoring.",
      format: "PDF · 24 pages",
      accent: "amber",
    },
    {
      series: "BLUEPRINT · 04",
      title: "The Lead Qualification Protocol",
      desc: "The exact four-stage prompt sequence behind production AI concierge agents. Ready to adapt for your vertical.",
      format: "PDF + Prompts",
      accent: "cyan",
    },
    {
      series: "BLUEPRINT · 05",
      title: "The Private AI Cost Calculator",
      desc: "Spreadsheet model comparing three-year TCO of public-API vs. on-premise LLM deployment across four tiers.",
      format: "XLSX",
      accent: "amber",
    },
    {
      series: "BLUEPRINT · 06",
      title: "The Vendor Security Scorecard",
      desc: "The questionnaire to send every AI vendor before signing. Data residency, training clauses, audit rights.",
      format: "PDF · 12 pages",
      accent: "cyan",
    },
  ];

  return (
    <section id="vault" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="text-sm tracking-widest uppercase text-[#d97706] mb-3">
            The Resource Vault
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Digital Blueprints for builders.
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Premium gated resources. Drawn from real deployments. Free to
            subscribers of The Private AI Pulse.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blueprints.map((b, i) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className={`relative glass-strong rounded-2xl p-8 border flex flex-col transition-shadow duration-500 ${
                b.accent === "amber"
                  ? "border-[#d97706]/20 hover:glow-amber"
                  : "border-white/5 hover:glow-cyan"
              }`}
            >
              {/* Wax-seal style series badge */}
              <div className="flex items-center justify-between mb-5">
                <span
                  className={`text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full ${
                    b.accent === "amber"
                      ? "bg-[#d97706]/10 text-[#d97706]"
                      : "bg-cyan-500/10 text-cyan-400"
                  }`}
                >
                  {b.series}
                </span>
                <span className="text-[10px] tracking-wider uppercase text-slate-500">
                  Gated
                </span>
              </div>

              <h3 className="text-xl font-bold text-white tracking-tight mb-3 leading-snug">
                {b.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                {b.desc}
              </p>

              <div className="flex items-center justify-between pt-5 border-t border-white/5">
                <span className="text-xs text-slate-500 tracking-wider uppercase">
                  {b.format}
                </span>
                <a
                  href="#pulse"
                  className={`text-xs font-bold tracking-widest uppercase transition-colors ${
                    b.accent === "amber"
                      ? "text-[#d97706] hover:text-amber-400"
                      : "text-cyan-400 hover:text-cyan-300"
                  }`}
                >
                  Unlock &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-12 text-center text-sm text-slate-500"
        >
          All blueprints unlock when you subscribe to{" "}
          <a
            href="#pulse"
            className="text-amber-500 hover:text-amber-400 font-medium"
          >
            The Private AI Pulse
          </a>
          .
        </motion.p>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#d97706]/5 blur-[150px] pointer-events-none" />
    </section>
  );
}

/* ─── 4. THE COMMUNITY INVITE ────────────────────────────── */
function Community() {
  const perks = [
    {
      title: "Curated membership",
      desc: "Founders, CTOs, and heads of operations. Vetted on entry. No recruiters, no vendors pitching.",
    },
    {
      title: "Weekly architecture threads",
      desc: "Real deployment war stories. Cost models. Hardware benchmarks. Shared privately among peers.",
    },
    {
      title: "Monthly live sessions",
      desc: "Closed-door Zoom roundtables with Jag and invited practitioners. Ask anything. Recordings members-only.",
    },
  ];

  return (
    <section id="community" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-amber-400 mb-3">
            The Inner Circle
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Where Sydney&rsquo;s AI builders
            <br />
            <span className="text-gradient-amber">sharpen their craft.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            A private LinkedIn group for leaders architecting real AI systems.
            Invitation-only. Signal, not noise.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {perks.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="glass-strong rounded-xl p-7 border border-white/5 hover:glow-amber transition-shadow duration-500"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {p.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-strong rounded-2xl border border-[#d97706]/20 p-10 text-center hover:glow-amber transition-shadow duration-500"
        >
          <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-lg mx-auto">
            Requests are reviewed manually. A short note about what you&rsquo;re
            building gets you through faster.
          </p>
          <a
            href="https://www.linkedin.com/groups/jag-singh-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#d97706] text-[#020617] text-sm font-bold tracking-wide uppercase rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,6,0.35)]"
          >
            Request an Invite &rarr;
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 5. ABOUT JAG — TRAINER & ARCHITECT ─────────────────── */
function About() {
  const credentials = [
    { value: "15+", label: "Years Enterprise Delivery" },
    { value: "MBA", label: "University of Illinois Urbana-Champaign" },
    { value: "PMP", label: "Project Management Professional" },
    { value: "SAFe", label: "Certified Agilist" },
    { value: "GenAI", label: "Architecture & LLMOps" },
    { value: "Trainer", label: "Corporate & Executive Workshops" },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-widest uppercase text-amber-400 mb-3">
            About Jag
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Architect. Trainer. Educator.
          </h2>
          <p className="mt-5 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Fifteen years shipping enterprise software. The last five designing
            private AI systems for Sydney&rsquo;s high-stakes operators. Now
            teaching the patterns that work &mdash; and flagging the ones that
            don&rsquo;t.
          </p>
          <p className="mt-4 text-slate-400 text-base max-w-2xl mx-auto leading-relaxed italic">
            &ldquo;The best AI architecture is the one your team can still run
            in three years, without you.&rdquo;
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {credentials.map((c, i) => (
            <motion.div
              key={c.value + c.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="glass-strong rounded-xl p-8 text-center border border-white/5 hover:glow-amber transition-shadow duration-500"
            >
              <p className="text-4xl md:text-5xl font-bold text-gradient-amber">
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

/* ─── 6. FINAL PULSE CTA ─────────────────────────────────── */
function FinalCta() {
  return (
    <section className="relative py-16 px-6">
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
            Build private AI with discipline.
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            Subscribe to The Pulse. Unlock the Vault. Join the Circle.
          </p>
          <a
            href="#pulse"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#d97706] text-[#020617] text-sm font-bold tracking-wide uppercase rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,6,0.35)]"
          >
            Join The Private AI Pulse
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="relative z-10 py-12 px-6 border-t border-white/5">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500 text-sm">
          &copy; 2026 Jag Singh AI &middot; A resource hub for private AI
          builders.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/pmjagraj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-amber-400 text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="/demo"
            className="text-slate-500 hover:text-amber-400 text-sm transition-colors"
          >
            Live Demo
          </a>
          <a
            href="#pulse"
            className="text-slate-500 hover:text-amber-400 text-sm transition-colors"
          >
            Newsletter
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
        <Pulse />
        <Vault />
        <Community />
        <About />
        <FinalCta />
        <Footer />
      </main>
    </>
  );
}
