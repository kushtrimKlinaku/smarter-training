"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ProgramsExplorer } from "@/components/ui/ProgramsExplorer";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Users,
  CheckCircle,
  Compass,
  Settings,
  Zap,
  BarChart3,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const services = [
  {
    icon: Briefcase,
    title: "Corporate Training",
    subtitle: "Programe të Personalizuara B2B",
    description:
      "Trajnime të dizajnuara enkas për nevojat specifike të organizatës suaj. Punojmë ngushtë me drejtuesit tuaj për të krijuar programe që adresojnë sfidat konkrete.",
    features: [
      "Analiza e nevojave organizative",
      "Programe tailor-made",
      "Workshop-e interaktive",
      "Matja e rezultateve (ROI)",
      "Mbështetje pas trajnimit",
    ],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: GraduationCap,
    title: "Soft Skills Academy",
    subtitle: "Trajnime të Hapura Full-Day",
    description:
      "Akademia e Aftësive të Buta ofron trajnime intensive një-ditore të hapura për çdo profesionist që dëshiron të investojë në zhvillimin e vet.",
    features: [
      "20+ programe unike",
      "Certifikatë e njohur",
      "Grupe të vogla (max 20)",
      "Materialet përfshihen",
      "Networking me profesionistë",
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop",
  },
  {
    icon: Users,
    title: "Executive Coaching",
    subtitle: "Mentorimi 1-on-1",
    description:
      "Coaching individual për drejtues dhe menaxherë që dëshirojnë të çojnë lidershipin e tyre në nivelin tjetër me mbështetje të dedikuar.",
    features: [
      "Sesione individuale",
      "Plan zhvillimi personal",
      "Vlerësim 360°",
      "Accountability partner",
      "Mundësi online/onsite",
    ],
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=800&auto=format&fit=crop",
  },
];

const processSteps = [
  {
    step: "01",
    icon: Compass,
    title: "Analiza e Nevojave",
    description:
      "Fillojmë me një analizë të thellë të nevojave, sfidave, dhe objektivave të organizatës suaj.",
  },
  {
    step: "02",
    icon: Settings,
    title: "Dizajni i Programit",
    description:
      "Krijojmë një program të personalizuar bazuar në nevojat e identifikuara dhe kulturën organizative.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Dorëzimi",
    description:
      "Trajnimi dorëzohet me metodologji interaktive që maksimizojnë mësimin dhe angazhimin.",
  },
  {
    step: "04",
    icon: BarChart3,
    title: "Matja & Përforcimi",
    description:
      "Matim rezultatet dhe ofrojmë sesione përforcuese për ndryshim të qëndrueshëm.",
  },
];

export default function ServicesPage() {
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
            <span className="label-tag mb-4 block">SHËRBIMET TONA</span>
            <h1 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-6">
              Zhvillimi profesional
              <br />
              i personalizuar.
            </h1>
            <p className="text-[17px] text-[#6B6B6B] leading-[1.65] max-w-[520px]">
              Ofrojmë gjithçka — nga trajnime korporative të kuruara për ekipet
              tuaja deri tek coaching individual për drejtuesit e ardhshëm.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="bg-white pb-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="space-y-24">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="grid lg:grid-cols-2 gap-12 items-center"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <span className="text-[13px] font-semibold text-[#E8845A] mb-2 block uppercase tracking-[0.06em]">
                    {service.subtitle}
                  </span>
                  <h3 className="text-[28px] md:text-[32px] font-semibold text-[#1A1A1A] mb-4 leading-[1.2] tracking-[-0.02em]">
                    {service.title}
                  </h3>
                  <p className="text-[#6B6B6B] leading-[1.65] mb-8 text-[17px]">
                    {service.description}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-3 text-[#1A1A1A] text-[15px]"
                      >
                        <CheckCircle className="w-4 h-4 text-[#E8845A] shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="btn-primary text-[15px]">
                    Kërko Informacion
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-[380px] object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs Catalog */}
      <section className="bg-[#F5F5F5] section-padding overflow-hidden relative">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8 relative z-10">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">KATALOGU</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Katalogu i programeve
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Eksploroni programet tona thelbësore, të ndërtuara rreth
              metodologjive më të avancuara.
            </p>
          </motion.div>

          <ProgramsExplorer />
        </div>
      </section>

      {/* Process */}
      <section className="bg-white section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">SI PUNOJMË</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Procesi ynë
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Çdo angazhim fillon me kuptime të thellë dhe përfundon me
              rezultate të matshme.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated p-8 group cursor-pointer"
              >
                <div className="text-[48px] font-bold text-[#E8E8E8] mb-4 leading-none">
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
              Keni nevojë për një propozim?
            </h2>
            <p className="text-white/50 text-[17px] mb-10 max-w-[480px] mx-auto leading-[1.65]">
              Na tregoni për sfidat dhe objektivat e organizatës suaj dhe ne do
              të krijojmë një propozim të personalizuar.
            </p>
            <Link href="/contact" className="btn-accent text-[15px]">
              Kërko Propozim Falas
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
