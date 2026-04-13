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
        <a href="#" className="text-lg font-bold text-white tracking-tight">
          Jag Singh AI
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#systems"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Systems
          </a>
          <a
            href="#security"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Security
          </a>
          <a
            href="#pricing"
            className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
          >
            Pricing
          </a>
          <a
            href="#systems"
            className="text-sm font-semibold text-amber-500 hover:text-amber-400 transition-colors"
          >
            View Solutions
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
            Boutique AI Product Company &middot; Sydney
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white"
        >
          Secure AI Systems for the
          <br />
          <span className="text-gradient-amber">Private Enterprise.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
        >
          Automated Lead Qualification. Local Document Intelligence.
          Zero Data Leaks. Built for Sydney&rsquo;s High-Stakes Businesses.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#systems"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-[#d97706] text-[#020617] text-sm font-bold tracking-wide uppercase rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,6,0.35)]"
          >
            Explore Our Systems
          </a>
          <a
            href="#security"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg text-sm font-semibold tracking-wide uppercase text-slate-300 glass hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.1)]"
          >
            See How It Works
          </a>
        </motion.div>

        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none" />
      </div>
    </section>
  );
}

/* ─── 2. PRODUCT LINEUP ──────────────────────────────────── */
function ProductLineup() {
  const systems = [
    {
      code: "SYSTEM A",
      name: "SENTINEL",
      subtitle: "Real Estate Lead Responder",
      desc: "24/7 AI-powered lead qualification that never sleeps. Every inbound enquiry is triaged, scored, and booked into your calendar before your competitor hits reply.",
      features: [
        "Instant lead response (<60 sec)",
        "Intelligent qualification & scoring",
        "Google Calendar integration",
        "CRM sync (HubSpot, Salesforce, custom)",
        "Multilingual support (EN, 中文, हिन्दी)",
        "White-labelled to your brand",
      ],
      accent: "amber",
    },
    {
      code: "SYSTEM B",
      name: "VAULT",
      subtitle: "Local-First AI Hub",
      desc: "Secure internal RAG and private document processing. Your contracts, policies, and strategic plans — searchable by AI, accessible only on your hardware.",
      features: [
        "100% on-premise — zero cloud leakage",
        "Document ingestion (PDF, DOCX, email)",
        "Natural-language internal search",
        "Role-based access controls",
        "Apple Silicon & NVIDIA optimised",
        "Custom fine-tuned models available",
      ],
      accent: "cyan",
    },
    {
      code: "SYSTEM C",
      name: "REPLY",
      subtitle: "Allied Health Missed Call Text-Back",
      desc: "Instant patient recovery for physios, dentists, and clinics. Every missed call triggers an intelligent SMS within seconds — reducing no-shows and recovering lost bookings.",
      features: [
        "Missed-call detection (<10 sec response)",
        "Smart SMS with booking link",
        "Practice management integration",
        "After-hours auto-responder",
        "Appointment confirmation follow-ups",
        "HIPAA-conscious data handling",
      ],
      accent: "cyan",
    },
  ];

  return (
    <section id="systems" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="text-sm tracking-widest uppercase text-[#d97706] mb-3">
            Product Lineup
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Three systems. Zero data leaks.
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Each system is purpose-built, deployable in weeks, and runs
            on infrastructure you control.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          {systems.map((s, i) => (
            <motion.div
              key={s.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className={`relative glass-strong rounded-2xl p-8 border transition-shadow duration-500 flex flex-col ${
                s.accent === "amber"
                  ? "border-[#d97706]/20 hover:glow-amber"
                  : "border-white/5 hover:glow-cyan"
              }`}
            >
              <span
                className={`inline-block self-start text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-4 ${
                  s.accent === "amber"
                    ? "bg-[#d97706]/10 text-[#d97706]"
                    : "bg-cyan-500/10 text-cyan-400"
                }`}
              >
                {s.code}
              </span>

              <h3 className="text-3xl font-bold text-white tracking-tight mb-1">
                {s.name}
              </h3>
              <p
                className={`text-sm font-medium mb-4 ${
                  s.accent === "amber" ? "text-[#d97706]" : "text-cyan-400"
                }`}
              >
                {s.subtitle}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {s.desc}
              </p>

              <ul className="space-y-3 text-slate-300 text-sm flex-1">
                {s.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 block w-1.5 h-1.5 rounded-full shrink-0 ${
                        s.accent === "amber" ? "bg-[#d97706]" : "bg-cyan-400"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#pricing"
                className={`mt-8 block w-full text-center px-6 py-4 text-sm font-bold tracking-wide uppercase rounded-lg transition-all duration-300 ${
                  s.accent === "amber"
                    ? "bg-[#d97706] text-[#020617] hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]"
                    : "glass border border-cyan-500/20 text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                }`}
              >
                See Product Specs
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#d97706]/5 blur-[150px] pointer-events-none" />
    </section>
  );
}

/* ─── 3. SECURITY FIRST ──────────────────────────────────── */
function SecurityFirst() {
  const stack = [
    {
      label: "Your Hardware",
      desc: "Mac Studio, on-premise GPU server, or secure cloud VM — you own the metal",
      color: "text-[#d97706]",
      dot: "bg-[#d97706]",
      border: "border-[#d97706]/20",
    },
    {
      label: "Local LLM Runtime",
      desc: "Llama 3, Mistral, Phi-3 & custom fine-tunes running on Apple Silicon or CUDA",
      color: "text-cyan-400",
      dot: "bg-cyan-400",
      border: "border-cyan-500/20",
    },
    {
      label: "Private RAG Pipeline",
      desc: "Embedding, vector storage, and retrieval — all local. No API calls leave the network",
      color: "text-cyan-400",
      dot: "bg-cyan-400",
      border: "border-cyan-500/20",
    },
    {
      label: "AI Agent Layer",
      desc: "Task-specific agents for lead triage, document Q&A, and workflow automation",
      color: "text-cyan-400",
      dot: "bg-cyan-400",
      border: "border-cyan-500/20",
    },
  ];

  const comparison = [
    {
      label: "Data residency",
      public: "US/EU data centres (unknown)",
      jsa: "Your premises or your chosen DC",
    },
    {
      label: "Model training",
      public: "Your data may train their model",
      jsa: "Your data never leaves your wall",
    },
    {
      label: "Compliance",
      public: "Shared responsibility, vague SLAs",
      jsa: "Full control, auditable, local logs",
    },
    {
      label: "Cost trajectory",
      public: "Per-token pricing, scales with usage",
      jsa: "Fixed hardware + licensing, predictable",
    },
    {
      label: "Customisation",
      public: "Prompt engineering only",
      jsa: "Fine-tuned models + custom agents",
    },
  ];

  return (
    <section id="security" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm tracking-widest uppercase text-cyan-400 mb-3">
            Security First
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Your data never leaves
            <br />
            <span className="text-gradient-amber">your four walls.</span>
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl leading-relaxed">
            Every system we ship runs on infrastructure you control.
            No tokens sent to OpenAI. No embeddings stored on someone
            else&rsquo;s cloud. Full sovereignty.
          </p>
        </motion.div>

        {/* Stack Diagram */}
        <div className="mt-16 grid md:grid-cols-2 gap-5">
          {stack.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className={`glass-strong rounded-xl p-6 border ${s.border} hover:glow-cyan transition-shadow duration-500`}
            >
              <div className="flex items-start gap-4">
                <div className={`mt-1 w-3 h-3 rounded-full ${s.dot} shrink-0`} />
                <div>
                  <h3 className={`font-semibold text-lg ${s.color}`}>
                    {s.label}
                  </h3>
                  <p className="mt-1 text-slate-400 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Blocked Cloud Banner */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={4}
          className="mt-5 glass-strong rounded-xl p-6 border border-red-500/10 text-center"
        >
          <p className="text-slate-500 text-sm uppercase tracking-widest mb-1">
            External Cloud LLMs
          </p>
          <p className="text-red-400 font-bold text-lg">
            Blocked &mdash; No data transmitted
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={5}
          className="mt-16"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Public AI vs. Jag Singh AI
          </h3>
          <div className="glass-strong rounded-2xl border border-white/5 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-[11px] uppercase tracking-wider border-b border-white/10">
                    <th className="px-6 py-4 font-medium text-slate-400 w-1/3" />
                    <th className="px-6 py-4 font-medium text-red-400">
                      Public AI (Risk)
                    </th>
                    <th className="px-6 py-4 font-medium text-cyan-400">
                      Jag Singh AI (Secure)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((row, i) => (
                    <tr
                      key={row.label}
                      className={`border-b border-white/5 ${
                        i % 2 === 0 ? "bg-white/[0.02]" : ""
                      }`}
                    >
                      <td className="px-6 py-4 text-white font-medium">
                        {row.label}
                      </td>
                      <td className="px-6 py-4 text-slate-400">{row.public}</td>
                      <td className="px-6 py-4 text-slate-200">{row.jsa}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── 4. TRANSPARENT PRICING ─────────────────────────────── */
function Pricing() {
  const products = [
    {
      name: "SENTINEL",
      subtitle: "Real Estate Lead Responder",
      setup: "$2,500",
      monthly: "$499",
      includes: [
        "Full AI agent build & deployment",
        "CRM + calendar integration",
        "Branded response templates",
        "Monthly performance report",
        "Priority email & Slack support",
      ],
      accent: "amber",
    },
    {
      name: "VAULT",
      subtitle: "Local-First AI Hub",
      setup: "$5,000",
      monthly: "$799",
      includes: [
        "Hardware spec & procurement guidance",
        "Local LLM + RAG pipeline setup",
        "Document ingestion pipeline",
        "Role-based access configuration",
        "Quarterly model tuning review",
      ],
      accent: "cyan",
    },
    {
      name: "REPLY",
      subtitle: "Missed Call Text-Back",
      setup: "$1,500",
      monthly: "$299",
      includes: [
        "Missed-call detection integration",
        "Smart SMS template build",
        "Practice management hookup",
        "After-hours auto-responder",
        "Monthly conversion report",
      ],
      accent: "cyan",
    },
  ];

  return (
    <section id="pricing" className="relative py-24 md:py-32 px-6">
      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="text-sm tracking-widest uppercase text-[#d97706] mb-3">
            Transparent Pricing
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            No hidden fees. No per-token surprises.
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            One-off implementation fee + predictable monthly licensing.
            Scale without the meter running.
          </p>
        </motion.div>

        <div className="mt-16 grid lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.name}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              className={`glass-strong rounded-2xl p-8 border flex flex-col transition-shadow duration-500 ${
                p.accent === "amber"
                  ? "border-[#d97706]/20 hover:glow-amber"
                  : "border-white/5 hover:glow-cyan"
              }`}
            >
              <h3 className="text-2xl font-bold text-white tracking-tight">
                {p.name}
              </h3>
              <p
                className={`text-sm font-medium mb-6 ${
                  p.accent === "amber" ? "text-[#d97706]" : "text-cyan-400"
                }`}
              >
                {p.subtitle}
              </p>

              <div className="flex items-baseline gap-4 mb-2">
                <div>
                  <p className="text-3xl font-bold text-white">{p.setup}</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Implementation
                  </p>
                </div>
                <span className="text-slate-600 text-lg">+</span>
                <div>
                  <p className="text-3xl font-bold text-white">
                    {p.monthly}
                    <span className="text-base text-slate-500 font-normal">
                      /mo
                    </span>
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">
                    Licensing
                  </p>
                </div>
              </div>

              <ul className="mt-6 space-y-3 text-slate-300 text-sm flex-1">
                {p.includes.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span
                      className={`mt-1.5 block w-1.5 h-1.5 rounded-full shrink-0 ${
                        p.accent === "amber" ? "bg-[#d97706]" : "bg-cyan-400"
                      }`}
                    />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="https://calendly.com/jagrajsingh-au/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 block w-full text-center px-6 py-4 text-sm font-bold tracking-wide uppercase rounded-lg transition-all duration-300 ${
                  p.accent === "amber"
                    ? "bg-[#d97706] text-[#020617] hover:shadow-[0_0_30px_rgba(217,119,6,0.3)]"
                    : "glass border border-cyan-500/20 text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                }`}
              >
                Get Started
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#d97706]/5 blur-[150px] pointer-events-none" />
    </section>
  );
}

/* ─── 5. FOUNDER BACKGROUND ──────────────────────────────── */
function Founder() {
  const credentials = [
    { value: "15+", label: "Years Enterprise Delivery", accent: "text-gradient-amber" },
    { value: "MBA", label: "University of Illinois Urbana-Champaign", accent: "text-gradient-amber" },
    { value: "GenAI", label: "Architecture & LLMOps", accent: "text-gradient-cyan" },
    { value: "SAFe", label: "Certified Agilist", accent: "text-gradient-cyan" },
    { value: "PMP", label: "Certified", accent: "text-gradient-amber" },
    { value: "AI Architect", label: "Product Delivery", accent: "text-gradient-cyan" },
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
            The Builder
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Chief Architect & Founder
          </h2>
          <p className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Every system carries 15 years of enterprise delivery discipline.
            Jag Singh doesn&rsquo;t just advise &mdash; he architects, builds,
            and ships.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-5">
          {credentials.slice(0, 3).map((c, i) => (
            <motion.div
              key={c.value + c.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="glass-strong rounded-xl p-8 text-center border border-white/5 hover:glow-cyan transition-shadow duration-500"
            >
              <p className={`text-4xl md:text-5xl font-bold ${c.accent}`}>
                {c.value}
              </p>
              <p className="mt-3 text-slate-400 text-sm tracking-widest uppercase">
                {c.label}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-5 grid sm:grid-cols-3 gap-5">
          {credentials.slice(3).map((c, i) => (
            <motion.div
              key={c.value + c.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="glass-strong rounded-xl p-8 text-center border border-white/5 hover:glow-cyan transition-shadow duration-500"
            >
              <p className={`text-4xl md:text-5xl font-bold ${c.accent}`}>
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

/* ─── 6. LIVE DEMO CTA ───────────────────────────────────── */
function DemoCta() {
  return (
    <section className="relative py-16 px-6">
      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="glass-strong rounded-2xl border border-[#d97706]/20 p-10 text-center hover:glow-amber transition-shadow duration-500"
        >
          <p className="text-sm tracking-widest uppercase text-[#d97706] mb-3">
            See It In Action
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
            Try SENTINEL — Live Demo
          </h2>
          <p className="text-slate-400 text-sm leading-relaxed max-w-lg mx-auto mb-8">
            Chat with an AI property concierge trained on real Sydney listings.
            Compare properties side-by-side. Switch languages mid-conversation.
            This is what your clients will experience.
          </p>
          <a
            href="/demo"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#d97706] text-[#020617] text-sm font-bold tracking-wide uppercase rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(217,119,6,0.35)]"
          >
            Launch Live Demo
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
            href="https://calendly.com/jagrajsingh-au/30min"
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
        <ProductLineup />
        <SecurityFirst />
        <Pricing />
        <Founder />
        <DemoCta />
        <Footer />
      </main>
    </>
  );
}
