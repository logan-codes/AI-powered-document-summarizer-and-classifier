"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, type Transition, type Variants } from "framer-motion";
import { ArrowRight, Scale, Shield, Zap } from "lucide-react";

const expoEase: Transition = { duration: 0.65, ease: "easeOut" };
const expoEaseDelay = (delay: number): Transition => ({ duration: 0.65, ease: "easeOut", delay });

const CONTAINER_VARIANTS: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: expoEase },
};

const BADGE_VARIANTS: Variants = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: expoEaseDelay(0.1) },
};

const PILL_ITEMS = [
  { icon: Scale, label: "Legal Research" },
  { icon: Shield, label: "Case Analysis" },
  { icon: Zap, label: "AI Summarization" },
];

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center overflow-hidden bg-[#000510]">
      {/* Background: animated grid + radial glow */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,91,250,0.28),transparent)]" />

        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#3b82f6" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        <motion.div
          className="absolute top-1/4 right-[15%] w-72 h-72 rounded-full bg-blue-600/20 blur-[96px]"
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 left-[10%] w-56 h-56 rounded-full bg-blue-400/15 blur-[72px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.45, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <motion.div
          className="max-w-4xl"
          variants={CONTAINER_VARIANTS}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={BADGE_VARIANTS} className="inline-flex mb-6">
            <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-blue-400 bg-blue-400/10 border border-blue-400/25 rounded-full px-4 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              AI-Powered Legal Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={ITEM_VARIANTS}
            className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight"
          >
            Legal Research,{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Reinvented
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-blue-500 to-transparent rounded-full w-full block"
                initial={{ scaleX: 0, originX: "0%" }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              />
            </span>{" "}
            by AI
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={ITEM_VARIANTS}
            className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed font-light"
          >
            Summarize complex briefs, classify cases, and surface precedents in seconds.
            Legal AI transforms hours of research into precise, citation-ready insights.
          </motion.p>

          {/* CTA row */}
          <motion.div variants={ITEM_VARIANTS} className="mt-10 flex flex-wrap gap-4 items-center">
            <Link href="/signup">
              <Button
                size="lg"
                className="h-14 px-8 rounded-xl font-bold text-base bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_32px_rgba(0,91,250,0.45)] hover:shadow-[0_0_48px_rgba(59,130,246,0.6)] transition-all duration-300 group"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="ghost"
                size="lg"
                className="h-14 px-8 rounded-xl font-semibold text-base text-slate-300 hover:text-white hover:bg-white/5 border border-slate-700 hover:border-slate-500 transition-all duration-300"
              >
                Sign In
              </Button>
            </Link>
          </motion.div>

          {/* Feature pills */}
          <motion.div variants={ITEM_VARIANTS} className="mt-12 flex flex-wrap gap-3">
            {PILL_ITEMS.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 text-sm text-slate-400 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:text-slate-200 transition-colors duration-200"
              >
                <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
}
