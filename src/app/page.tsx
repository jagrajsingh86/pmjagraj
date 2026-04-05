"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: "easeOut" as const },
  }),
};

/* ───────────────────────── NAVBAR ─────────────────────────── */
function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-5">
        <a href="#" className="font-serif text-xl text-stone-900">
          Jag Singh
        </a>
        <div className="flex items-center gap-8">
          <a
            href="#solution"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            About
          </a>
          <a
            href="#audit"
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors"
          >
            Services
          </a>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-stone-900 hover:text-amber-700 transition-colors"
          >
            Book a Call
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ───────────────────────── 1. HERO ───────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-20">
      <div className="max-w-3xl text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="text-sm tracking-widest uppercase text-stone-500 mb-4"
        >
          AI Solutions Architect &middot; Sydney
        </motion.p>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-tight tracking-tight text-stone-900"
        >
          Scale with AI.
          <br />
          <span className="text-amber-700">Keep your data private.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mt-6 text-lg md:text-xl text-stone-600 max-w-xl mx-auto leading-relaxed"
        >
          Private, local-first AI architecture for business owners who
          refuse to hand their data to a public cloud.
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
            className="inline-block px-8 py-4 bg-stone-900 text-white text-sm font-semibold tracking-wide uppercase rounded hover:bg-stone-800 transition-colors"
          >
            Book Your AI Audit
          </a>
          <a
            href="#problem"
            className="inline-block px-8 py-4 border border-stone-300 text-stone-700 text-sm font-semibold tracking-wide uppercase rounded hover:border-stone-500 transition-colors"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────── 2. THE PROBLEM ────────────────────── */
function Problem() {
  const risks = [
    {
      title: "Data Exposure",
      desc: "Every prompt you send to ChatGPT can be used to train future models. Your proprietary processes, client data, and strategy docs \u2014 exposed.",
    },
    {
      title: "Vendor Lock-in",
      desc: "Building on closed APIs means you\u2019re one pricing change away from a budget crisis. OpenAI has already raised prices 3\u00D7.",
    },
    {
      title: "The Cost of Waiting",
      desc: "Your competitors are deploying AI agents now. Every quarter you delay, the gap widens \u2014 and the catch-up cost doubles.",
    },
  ];

  return (
    <section id="problem" className="py-24 md:py-32 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm tracking-widest uppercase text-amber-700 mb-3">
            The Problem
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-stone-900 leading-tight">
            The &ldquo;OpenAI Data Trap&rdquo;
          </h2>
          <p className="mt-4 text-stone-600 text-lg max-w-2xl leading-relaxed">
            Most businesses are feeding their most sensitive data into public
            LLMs without a second thought. That&rsquo;s not innovation &mdash;
            it&rsquo;s a liability.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-8">
          {risks.map((r, i) => (
            <motion.div
              key={r.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="border-t-2 border-stone-200 pt-6"
            >
              <h3 className="font-semibold text-stone-900 text-lg mb-2">
                {r.title}
              </h3>
              <p className="text-stone-500 leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── 3. THE SOLUTION ───────────────────── */
function Solution() {
  const pillars = [
    {
      label: "Local-First LLMs",
      desc: "Run Llama, Mistral, and fine-tuned models on your own hardware. No data leaves your walls.",
    },
    {
      label: "Custom AI Agents",
      desc: "Purpose-built agents that automate your highest-value workflows \u2014 document analysis, lead triage, internal search.",
    },
    {
      label: "Apple Silicon Power",
      desc: "M4 Pro hardware means enterprise-grade inference without enterprise-grade cloud bills.",
    },
  ];

  return (
    <section id="solution" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm tracking-widest uppercase text-amber-700 mb-3">
            The Solution
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-stone-900 leading-tight">
            Private AI. Your Data. Your Models. Your Edge.
          </h2>
          <p className="mt-4 text-stone-600 text-lg max-w-2xl leading-relaxed">
            I design and deploy local-first AI systems that give you the power
            of frontier models \u2014 without the privacy trade-off.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-3 gap-10">
          {pillars.map((p, i) => (
            <motion.div
              key={p.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
            >
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-semibold text-sm mb-4">
                {i + 1}
              </div>
              <h3 className="font-semibold text-stone-900 text-lg mb-2">
                {p.label}
              </h3>
              <p className="text-stone-500 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────── 4. AUTHORITY ──────────────────────── */
function Authority() {
  const stats = [
    { value: "14+", label: "Years in Product & Technology" },
    { value: "AI Studio", label: "Lead \u2014 Enterprise AI" },
    { value: "GenAI", label: "Trainer & Architect" },
  ];

  return (
    <section className="py-24 md:py-32 px-6 bg-stone-50">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <p className="text-sm tracking-widest uppercase text-amber-700 mb-3">
            Why Jag
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-stone-900 leading-tight">
            Not another AI hype merchant.
          </h2>
          <p className="mt-4 text-stone-600 text-lg max-w-2xl leading-relaxed">
            I&rsquo;ve spent 14+ years leading product and technology teams
            &mdash; from enterprise transformation to hands-on AI Studio builds.
            I sell architecture, not vaporware.
          </p>
        </motion.div>

        <div className="mt-14 grid sm:grid-cols-3 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={i}
              className="text-center sm:text-left"
            >
              <p className="font-serif text-4xl md:text-5xl font-medium text-stone-900">
                {s.value}
              </p>
              <p className="mt-2 text-stone-500 text-sm tracking-wide uppercase">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── 5. THE OFFER / CTA ─────────────────── */
function Offer() {
  const deliverables = [
    "2-hour deep-dive strategy session (recorded)",
    "Full data-privacy risk assessment",
    "Custom Local-First AI implementation blueprint",
    "Hardware & model recommendations tailored to your stack",
    "30-day post-audit email support",
  ];

  return (
    <section id="audit" className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <p className="text-sm tracking-widest uppercase text-amber-700 mb-3">
            The Offer
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-stone-900 leading-tight">
            The AI Readiness Audit
          </h2>
          <p className="mt-4 text-stone-600 text-lg max-w-xl mx-auto leading-relaxed">
            A focused, 2-hour engagement designed to give you a clear,
            actionable path to private AI adoption &mdash; without the
            six-month consulting engagement.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          custom={1}
          className="mt-14 max-w-xl mx-auto"
        >
          <div className="border border-stone-200 rounded-lg p-8 md:p-10">
            <p className="font-serif text-4xl font-medium text-stone-900 mb-1">
              $2,000 <span className="text-lg text-stone-400">AUD</span>
            </p>
            <p className="text-stone-500 text-sm mb-8">
              One-time investment. No retainers. No lock-in.
            </p>

            <ul className="space-y-4 text-stone-700">
              {deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3">
                  <span className="mt-1.5 block w-1.5 h-1.5 rounded-full bg-amber-600 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>

            <a
              href="https://calendly.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 block w-full text-center px-8 py-4 bg-amber-700 text-white text-sm font-semibold tracking-wide uppercase rounded hover:bg-amber-800 transition-colors"
            >
              Book Your Audit on Calendly
            </a>

            <p className="mt-4 text-center text-xs text-stone-400">
              Limited to 4 audits per month to ensure quality.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────── 6. FOOTER ─────────────────────────── */
function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-stone-200">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-stone-400 text-sm">
          &copy; {new Date().getFullYear()} Jag S. &mdash; AI Solutions
          Architect, Sydney.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.linkedin.com/in/pmjagraj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-stone-700 text-sm transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-stone-400 hover:text-stone-700 text-sm transition-colors"
          >
            Calendly
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ───────────────────── PAGE ──────────────────────────────── */
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Authority />
      <Offer />
      <Footer />
    </main>
  );
}
