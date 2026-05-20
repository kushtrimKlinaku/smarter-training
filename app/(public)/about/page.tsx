"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Target,
  Heart,
  Lightbulb,
  Rocket,
  CheckCircle,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const values = [
  {
    icon: Target,
    title: "Ndikimi",
    description:
      "Çdo program dizajnohet për të prodhuar ndryshim të matshëm tek individi dhe organizata.",
  },
  {
    icon: Heart,
    title: "Pasioni",
    description:
      "Besojmë se zhvillimi njerëzor është investimi më i rëndësishëm për çdo organizatë.",
  },
  {
    icon: Lightbulb,
    title: "Inovacioni",
    description:
      "Kombinojmë shkencën e sjelljes me praktikat më të fundit të zhvillimit profesional.",
  },
  {
    icon: Rocket,
    title: "Ekselenca",
    description:
      "Standardet e larta janë jo-negociueshme — nga dizajni i programeve deri tek dorëzimi.",
  },
];

const milestones = [
  { year: "2018", title: "Themelimi", description: "Fillimi i rrugëtimit me trajnimet e para në Kosovë." },
  { year: "2019", title: "Ekspansioni", description: "Zgjerimi në Shqipëri dhe Maqedoni me 10 programe." },
  { year: "2021", title: "2,000 Trajnuesit", description: "Arritëm mbi 2,000 profesionistë të trajnuar." },
  { year: "2023", title: "Akademia", description: "Lansimi i Soft Skills Academy si program publik." },
  { year: "2026", title: "5,000+", description: "Mbi 5,000 profesionistë në portofolin tonë." },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-white pt-[140px] pb-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-[720px]"
          >
            <span className="label-tag mb-4 block">RRETH NESH</span>
            <h1 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-6">
              Ne transformojmë
              <br />
              potencialin njerëzor.
            </h1>
            <p className="text-[17px] text-[#6B6B6B] leading-[1.65] max-w-[520px]">
              Smarter Training lindi nga bindja se aftësitë e buta janë
              fondamenti i çdo suksesi profesional. Që nga 2018, kemi
              trajnuar mbi 5,000 profesionistë në rajon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Founder / Story */}
      <section className="bg-[#F5F5F5] section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                    alt="Smarter Training Team"
                    className="w-full h-[400px] object-cover"
                  />
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-5 -right-4 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-4 border border-[#E8E8E8]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E8845A] flex items-center justify-center text-white font-bold text-sm">
                      A
                    </div>
                    <div>
                      <div className="text-[14px] font-semibold text-[#1A1A1A]">Arben</div>
                      <div className="text-[12px] text-[#6B6B6B]">Themelues & Trajner</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div {...fadeInUp}>
              <span className="label-tag mb-4 block">HISTORIA JONË</span>
              <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-6">
                Mentorimi nga ekspertë
              </h2>
              <div className="space-y-4 text-[#6B6B6B] text-[17px] leading-[1.65]">
                <p>
                  Smarter Training u themelua me një vizion të thjeshtë por
                  ambicioz: të bëjmë zhvillimin e aftësive të buta të arritshëm,
                  praktik, dhe transformues për profesionistët në rajonin tonë.
                </p>
                <p>
                  Me një background të fortë në psikologji organizative dhe mbi
                  8 vite përvojë direkte në trajnime, themuluesi ynë ka
                  dizajnuar programe që kombinojnë shkencën e sjelljes me
                  realitetet e tregut tonë.
                </p>
              </div>
              <div className="flex items-center gap-10 mt-8 pt-8 border-t border-[#E8E8E8]">
                <div>
                  <div className="text-[36px] font-bold text-[#1A1A1A] leading-none tracking-[-0.03em]">5,000+</div>
                  <div className="text-[13px] text-[#6B6B6B] mt-1">Trajnuesit</div>
                </div>
                <div>
                  <div className="text-[36px] font-bold text-[#1A1A1A] leading-none tracking-[-0.03em]">50+</div>
                  <div className="text-[13px] text-[#6B6B6B] mt-1">Organizata</div>
                </div>
                <div>
                  <div className="text-[36px] font-bold text-[#1A1A1A] leading-none tracking-[-0.03em]">3</div>
                  <div className="text-[13px] text-[#6B6B6B] mt-1">Vende</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">PARIMET</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Vlerat tona
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Parimet që udhëheqin çdo program dhe çdo ndërveprim me klientët
              tanë.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated p-8 text-center group cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mx-auto mb-5 group-hover:bg-[#E8845A]/10 transition-colors">
                  <value.icon className="w-7 h-7 text-[#E8845A]" />
                </div>
                <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">
                  {value.title}
                </h3>
                <p className="text-[#6B6B6B] text-[14px] leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-[#F5F5F5] section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">KRONOLOGJIA</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Rrugëtimi ynë
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Nga një ide e thjeshtë në një organizatë transformuese.
            </p>
          </motion.div>

          <div className="max-w-[640px] mx-auto">
            {milestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-[#1A1A1A] flex items-center justify-center text-white font-bold text-[13px] shrink-0">
                    {milestone.year.slice(2)}
                  </div>
                  {i < milestones.length - 1 && (
                    <div className="w-px h-full bg-[#E8E8E8] mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <div className="text-[13px] font-semibold text-[#E8845A] mb-1">
                    {milestone.year}
                  </div>
                  <h4 className="text-[18px] font-semibold text-[#1A1A1A] mb-1">
                    {milestone.title}
                  </h4>
                  <p className="text-[#6B6B6B] text-[14px]">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#1C1C1C] section-padding">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-[clamp(28px,4.5vw,48px)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-6">
              Gati të filloni?
            </h2>
            <p className="text-white/50 text-[17px] mb-10 max-w-[480px] mx-auto leading-[1.65]">
              Na kontaktoni për të diskutuar si mund t&apos;i shërbejmë nevojat e
              organizatës suaj për zhvillim profesional.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="btn-accent text-[15px]">
                Na Kontaktoni
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/soft-skills-academy"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white/10 text-white font-semibold text-[15px] border border-white/10 hover:bg-white/15 transition-all duration-200 cursor-pointer"
              >
                Eksploro Akademinë
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
