"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import MedicineManager from "@/components/MedicineManager";
import { Pill, Shield, Zap, Heart } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const ScrollAnimation = dynamic(() => import("@/components/ScrollAnimation"), {
  ssr: false,
  loading: () => <div className="h-screen bg-black flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
});

export default function Home() {
  const container = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"]
  });

  return (
    <main className="relative min-h-screen bg-black" ref={container}>
      <Navbar />
      
      {/* Hero Section / Scrollytelling */}
      <section id="experience" className="w-full h-[500vh] relative">
        <div className="sticky top-0 h-screen overflow-hidden">
          <ScrollAnimation progress={scrollYProgress} />
          
          {/* Text Overlays */}
          <div className="absolute inset-0 pointer-events-none">
            {/* 0% - 12% Scroll */}
            <OverlaySection progress={scrollYProgress} range={[0, 0.12]} className="items-center justify-center">
              <h2 className="text-5xl md:text-7xl font-bold text-center tracking-tighter">
                Never Miss Your <br />
                <span className="text-accent underline decoration-accent/30">Medicine Again</span>
              </h2>
            </OverlaySection>

            {/* 28% - 40% Scroll */}
            <OverlaySection progress={scrollYProgress} range={[0.28, 0.4]} className="items-start justify-center pl-8 md:pl-24">
              <div className="max-w-md">
                <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                  Missing doses leads to <span className="text-red-500">serious health risks</span>
                </h3>
                <p className="text-white/60 text-lg">
                  Even a single missed pill can disrupt your treatment plan and recovery.
                </p>
              </div>
            </OverlaySection>

            {/* 58% - 70% Scroll */}
            <OverlaySection progress={scrollYProgress} range={[0.58, 0.7]} className="items-end justify-center pr-8 md:pr-24">
              <div className="max-w-md text-right">
                <h3 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
                  Track, remind, and <span className="text-green-500">stay consistent</span>
                </h3>
                <p className="text-white/60 text-lg">
                  Our smart system visualizes your health journey and ensures you're always on track.
                </p>
              </div>
            </OverlaySection>

            {/* 90% - 100% Scroll */}
            <OverlaySection progress={scrollYProgress} range={[0.88, 0.98]} className="items-center justify-center px-4">
              <div className="text-center">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
                  Simple. Smart. <span className="text-accent">Reliable.</span>
                </h2>
                <button 
                  onClick={() => window.scrollTo({ top: window.innerHeight * 5, behavior: 'smooth' })}
                  className="mt-8 px-10 py-4 bg-accent text-white rounded-full font-semibold hover:bg-accent/80 transition-all pointer-events-auto shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                >
                  Get Started Now
                </button>
              </div>
            </OverlaySection>
          </div>

          {/* Watermark Cover - Perfectly positioned to cover 'veo' */}
          <div className="absolute bottom-0 right-0 z-100 p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="bg-black px-6 py-4 border-l border-t border-white/20 rounded-tl-3xl shadow-2xl flex items-center gap-3"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">MedTrack Secured</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Core Features */}
      <MedicineManager />

      {/* Benefits Section */}
      <section id="benefits" className="py-32 px-6 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 underline decoration-accent/30">Why MedTrack?</h2>
            <p className="text-white/40 max-w-2xl mx-auto text-lg">Designed for patients who value consistency, health, and peace of mind.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Shield className="text-blue-500" />}
              title="Secure Records"
              desc="Your medication history is encrypted and private. Only you or your family can access it."
            />
            <FeatureCard 
              icon={<Zap className="text-amber-500" />}
              title="Smart Reminders"
              desc="Intelligent alerts that sync across devices and even notify your loved ones if needed."
            />
            <FeatureCard 
              icon={<Heart className="text-red-500" />}
              title="Health Adherence"
              desc="Improve recovery rates by staying 100% consistent with your doctor's prescriptions."
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="support" className="py-24 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent rounded-2xl flex items-center justify-center">
              <Pill className="text-white" size={24} />
            </div>
            <span className="text-2xl font-black tracking-tighter uppercase italic">MedTrack</span>
          </div>
          
          <div className="flex gap-8 text-white/40 text-sm font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
            <a href="#" className="hover:text-accent transition-colors">API Docs</a>
            <a href="#" className="hover:text-accent transition-colors">Support</a>
          </div>

          <div className="text-white/20 text-xs">
            © 2026 MedTrack Adherence Systems. Built with precision for premium health care.
          </div>
        </div>
      </footer>
    </main>
  );
}

function OverlaySection({ children, progress, range, className }: { children: React.ReactNode, progress: any, range: [number, number], className?: string }) {
  const start = range[0];
  const end = range[1];
  const buffer = 0.02;
  
  const p1 = Math.max(0, start - buffer);
  const p2 = start;
  const p3 = end;
  const p4 = Math.min(1, end + buffer);
  
  const input = [p1, p2, p3, p4].map(v => Math.min(Math.max(0, v), 1));

  // useTransform with clamp: true prevents the text from staying visible after scroll
  const opacity = useTransform(progress, input, [0, 1, 1, 0], { clamp: true });
  const y = useTransform(progress, input, [20, 0, 0, -20], { clamp: true });

  return (
    <motion.div 
      style={{ opacity, y }} 
      className={cn("absolute inset-0 flex flex-col px-6 md:px-12 pointer-events-none", className)}
    >
      <div className="pointer-events-auto max-w-7xl w-full">
        {children}
      </div>
    </motion.div>
  );
}

function FeatureCard({ icon, title, desc }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="p-10 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-accent/40 transition-all group"
    >
      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
        {React.cloneElement(icon, { size: 32 })}
      </div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-white/40 leading-relaxed">{desc}</p>
    </motion.div>
  );
}
