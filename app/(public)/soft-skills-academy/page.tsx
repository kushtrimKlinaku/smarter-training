"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  MapPin,
  Clock,
  Users,
  Award,
  BookOpen,
  Target,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import { trainings } from "@/_data/trainings";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const howItWorks = [
  {
    step: "01",
    icon: BookOpen,
    title: "Zgjidh Trajnimin",
    description: "Eksploro katalogën tonë dhe zgjidh programin që përputhet me qëllimet e tua.",
  },
  {
    step: "02",
    icon: Users,
    title: "Regjistrohu",
    description: "Plotëso formularin e thjeshtë të regjistrimit online dhe siguro vendin tënd.",
  },
  {
    step: "03",
    icon: Target,
    title: "Mëso & Praktiko",
    description: "Merr pjesë në trajnimin intensiv full-day me ushtrime praktike dhe role-play.",
  },
  {
    step: "04",
    icon: Award,
    title: "Certifikohu",
    description: "Merr certifikatën tënde profesionale dhe vazhdo zhvillimin me resurset tona.",
  },
];

export default function SoftSkillsAcademyPage() {
  const [dynamicTrainings, setDynamicTrainings] = React.useState(trainings);

  React.useEffect(() => {
    fetch('/api/trainings')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data) && data.length > 0) {
          setDynamicTrainings(data);
        }
      })
      .catch(console.error);
  }, []);

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
            <span className="label-tag mb-4 block">SOFT SKILLS ACADEMY</span>
            <h1 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-6">
              Akademia e
              <br />
              aftësive të buta.
            </h1>
            <p className="text-[17px] text-[#6B6B6B] leading-[1.65] max-w-[520px] mb-8">
              Trajnime intensive full-day të hapura për çdo profesionist. Zhvillo
              aftësi lidershipi, komunikimi, dhe inteligjence emocionale me
              programet tona transformuese.
            </p>
            <div className="flex flex-wrap items-center gap-6 text-[13px] text-[#6B6B6B]">
              <span className="inline-flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#E8845A]" />
                Trajnime Full-Day (8 orë)
              </span>
              <span className="inline-flex items-center gap-2">
                <Users className="w-4 h-4 text-[#E8845A]" />
                Max 20 Pjesëmarrës
              </span>
              <span className="inline-flex items-center gap-2">
                <Award className="w-4 h-4 text-[#E8845A]" />
                Certifikatë profesionale
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F5F5F5] section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">SI FUNKSIONON</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              4 hapa të thjeshtë
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Nga regjistrimi deri tek certifikimi — procesi është i thjeshtë dhe
              i lehtë.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl p-6 border border-[#E8E8E8] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
              >
                <div className="text-[48px] font-bold text-[#E8E8E8] mb-2 leading-none">
                  {step.step}
                </div>
                <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mb-4 group-hover:bg-[#E8845A]/10 transition-colors">
                  <step.icon className="w-6 h-6 text-[#E8845A]" />
                </div>
                <h4 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">
                  {step.title}
                </h4>
                <p className="text-[#6B6B6B] text-[14px] leading-relaxed">
                  {step.description}
                </p>
                {i < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-6">
                    <ArrowRight className="w-6 h-6 text-[#E8E8E8]" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Catalog */}
      <section className="bg-white section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">KATALOGU I TRAJNIMEVE</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Trajnimet e ardhshme
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Zgjidh trajnimin që përputhet me nevojat dhe qëllimet e tua
              profesionale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {dynamicTrainings.map((training, i) => (
              <motion.div
                key={training.slug || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={`/soft-skills-academy/${training.slug}`}
                  className="group block bg-white rounded-2xl border border-[#E8E8E8] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full cursor-pointer"
                >
                  <div
                    className="h-1.5"
                    style={{
                      background: `linear-gradient(to right, ${training.color || '#E8845A'}, ${training.color || '#E8845A'}66)`,
                    }}
                  />
                  <div className="p-8">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-1 group-hover:text-[#E8845A] transition-colors">
                          {training.title}
                        </h3>
                        <p className="text-[#E8845A] text-[13px] font-medium">
                          {training.subtitle}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-[22px] font-bold text-[#1A1A1A]">
                          {training.price}
                        </div>
                      </div>
                    </div>

                    <p className="text-[#6B6B6B] text-[14px] mb-6 leading-relaxed line-clamp-2">
                      {training.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[13px] text-[#6B6B6B] mb-6">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E8845A]" />
                        {training.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#E8845A]" />
                        {training.time}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#E8845A]" />
                        {training.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#E8845A] text-[14px] font-semibold group-hover:gap-3 transition-all pt-4 border-t border-[#E8E8E8]">
                      Shiko Detajet e Plota
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="bg-[#F5F5F5] section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">PËR KË ËSHTË</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Për kë është akademia?
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Programet tona janë dizajnuara për profesionistë të çdo niveli.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[960px] mx-auto">
            {[
              {
                icon: Briefcase,
                title: "Menaxherë & Liderë",
                description:
                  "Drejtues ekipesh që dëshirojnë të përmirësojnë aftësitë e lidershipit.",
              },
              {
                icon: TrendingUp,
                title: "Profesionistë",
                description:
                  "Individë ambiciozë që po ndërtojnë karrierën e tyre me aftësi thelbësore.",
              },
              {
                icon: Award,
                title: "Sipërmarrës",
                description:
                  "Themelues dhe drejtues startup-esh që kanë nevojë për aftësi komunikimi.",
              },
              {
                icon: Users,
                title: "HR Profesionistë",
                description:
                  "Profesionistë të burimeve njerëzore që dëshirojnë mjete të reja.",
              },
              {
                icon: Target,
                title: "Shitës",
                description:
                  "Ekipet e shitjeve që dëshirojnë të përmirësojnë aftësitë bindëse.",
              },
              {
                icon: BookOpen,
                title: "Çdokush",
                description:
                  "Kushdo që dëshiron të investojë në zhvillimin personal dhe profesional.",
              },
            ].map((audience, i) => (
              <motion.div
                key={audience.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-[#E8E8E8] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#F5F5F5] flex items-center justify-center mx-auto mb-4">
                  <audience.icon className="w-6 h-6 text-[#E8845A]" />
                </div>
                <h4 className="font-semibold text-[#1A1A1A] mb-1 text-[16px]">
                  {audience.title}
                </h4>
                <p className="text-[#6B6B6B] text-[14px] leading-relaxed">{audience.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
