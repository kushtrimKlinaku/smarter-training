"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper as SwiperType } from 'swiper';
import { motion } from "motion/react";
import {
  ArrowRight,
  CheckCircle,
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Quote,
  ChevronRight,
  BarChart3,
  Target,
  Zap,
} from "lucide-react";
import { trainings } from "@/_data/trainings";
import HeroSection from "@/components/HeroSection";
import ProgramsHorizontalScroll from "@/components/ProgramsHorizontalScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/* ─── Animation Variants ─── */
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

/* ═══════════════════════════════════════════
   PROGRAMS / SERVICES SECTION (KAJABI STYLE)
   ═══════════════════════════════════════════ */
const programsData = [
  {
    id: "soft-skills",
    title: "Soft Skills",
    image: "/images/programs/soft_skills.png",
    description: "Zhvilloni aftësitë e komunikimit dhe bashkëpunimit për të krijuar një ambient pune më produktiv.",
    link: "/soft-skills-academy",
  },
  {
    id: "leadership",
    title: "Lidership",
    image: "/images/programs/leadership.png",
    description: "Ndërtoni liderët e së ardhmes përmes programeve tona të lidershipit transformues.",
    link: "/services",
  },
  {
    id: "coaching",
    title: "Coaching",
    image: "/images/programs/coaching.png",
    description: "Sesione 1-on-1 për të zbuluar dhe maksimizuar potencialin e secilit individ.",
    link: "/services",
  },
  {
    id: "sales",
    title: "Shitje & B2B",
    image: "/images/programs/sales.png",
    description: "Teknikat e bindjes dhe ndikimit për të rritur fitimet dhe mbyllur marrëveshje.",
    link: "/services",
  },
  {
    id: "in-house",
    title: "Trajnime In-house",
    image: "/images/programs/in_house.png",
    description: "Programe të personalizuara që mbahen direkt në ambientet e kompanisë suaj.",
    link: "/contact",
  },
];

function ProgramsSection() {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  
  return (
    <section className="bg-[#0A0A0A] pt-24 pb-32 overflow-hidden flex flex-col items-center">
      <div className="max-w-[1200px] w-full px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[clamp(32px,4vw,48px)] font-bold text-white tracking-[-0.02em]"
          >
            Zgjidhni si dëshironi të zhvilloheni
          </motion.h2>
        </div>

        {/* Custom Pagination Menu */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 custom-kajabi-pagination">
          {/* Pagination bullets will be rendered here by Swiper */}
        </div>
      </div>

      {/* Swiper Container */}
      <div className="w-full relative max-w-[100vw] mx-auto overflow-hidden pb-12">
        <Swiper
          modules={[Autoplay, Pagination]}
          onSwiper={setSwiperInstance}
          slidesPerView="auto"
          centeredSlides={true}
          spaceBetween={24}
          loop={true}
          speed={600}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            el: '.custom-kajabi-pagination',
            clickable: true,
            renderBullet: (index, className) => {
              return `<button class="${className} px-6 py-2.5 text-[15px] border border-[#1A1A1A] text-[#A0988A] bg-transparent transition-all duration-300 hover:text-white">${programsData[index].title}</button>`;
            },
          }}
          className="kajabi-swiper"
        >
          {programsData.map((program) => (
            <SwiperSlide key={program.id} className="transition-all duration-500 ease-in-out w-[90vw] lg:w-[1184px]">
              {({ isActive }) => (
                <div 
                  className={`relative w-full h-[500px] md:h-[666px] rounded-2xl overflow-hidden bg-[#1A1A1A] transition-all duration-500 ease-in-out ${
                    isActive ? "opacity-100 scale-100" : "opacity-40 scale-[0.97]"
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={program.image}
                    alt={program.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Dark gradient on the left side for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                  
                  {/* Left Content (Text directly on image, no white box) */}
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                      className="absolute left-6 sm:left-12 md:left-16 top-1/2 -translate-y-1/2 max-w-[420px] z-10"
                    >
                      <h3 className="text-3xl md:text-4xl lg:text-[42px] font-bold text-white mb-4 tracking-[-0.02em] leading-[1.1]">
                        {program.title}
                      </h3>
                      <p className="text-[16px] md:text-[18px] text-white/90 mb-8 leading-[1.6]">
                        {program.description}
                      </p>
                      <Link 
                        href={program.link} 
                        className="inline-flex items-center justify-center bg-white text-black px-8 py-3.5 text-[15px] font-bold hover:bg-[#E8845A] hover:text-white transition-colors"
                      >
                        Learn More
                      </Link>
                    </motion.div>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-kajabi-pagination {
          gap: 8px;
        }
        .custom-kajabi-pagination .swiper-pagination-bullet {
          background: transparent;
          opacity: 1;
          width: auto;
          height: auto;
          border-radius: 0;
          margin: 0 !important;
        }
        .custom-kajabi-pagination .swiper-pagination-bullet-active {
          background: #1A1A1A !important;
          border-color: #404040 !important;
          color: white !important;
          font-weight: 500;
        }
        .kajabi-swiper .swiper-slide {
          width: 90vw;
        }
        @media (min-width: 1024px) {
          .kajabi-swiper .swiper-slide {
            width: 1184px;
          }
        }
      `}} />
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2: LEADERSHIP / FEATURE SPLIT
   ═══════════════════════════════════════════ */
function LeadershipSection() {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image mockup */}
          <motion.div
            {...fadeInUp}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/programs/leadership.png"
                alt="Smarter Training Platform"
                className="w-full h-[400px] object-cover"
              />
            </div>
            {/* Floating card */}
            <div className="absolute -bottom-6 -right-4 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.1)] p-4 border border-[#E8E8E8]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#F5F5F5] flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-[#E8845A]" />
                </div>
                <div>
                  <div className="text-[13px] text-[#6B6B6B]">Rritje produktiviteti</div>
                  <div className="text-[18px] font-bold text-[#1A1A1A]">+40%</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-tag mb-4 block">SI E PËRDORIM</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-6">
              Ndërtoni liderët e së ardhmes.
            </h2>
            <p className="text-[17px] text-[#6B6B6B] leading-[1.65] mb-8 max-w-[480px]">
              Programet tona të Mentorship, Lidership dhe Coaching krijojnë mundësi
              për individët dhe ekipet për të shkëlqyer në çdo mjedis organizativ.
            </p>

            <ul className="space-y-4">
              {[
                "Identifikimi i talentëve me potencial",
                "Mentoring i strukturuar për progres",
                "Matja e zhvillimit me KPI të qarta",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#E8845A] mt-0.5 shrink-0" />
                  <span className="text-[15px] text-[#1A1A1A] font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3: SKILLS / FUTURE-PROOF
   ═══════════════════════════════════════════ */
function SkillsSection() {
  return (
    <section className="bg-[#F5F5F5] section-padding">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Content */}
          <motion.div {...fadeInUp}>
            <span className="label-tag mb-4 block">AFTËSI TË ARDHSHME</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-6">
              Rritni të ardhurat me teknika të provuara.
            </h2>
            <p className="text-[17px] text-[#6B6B6B] leading-[1.65] mb-8 max-w-[480px]">
              Transformoni Soft Skills në mjete strategjike për rritjen e fitimeve
              dhe ndërtimin e marrëdhënieve afatgjata.
            </p>

            <ul className="space-y-4 mb-8">
              {[
                "Teknikat e bindjes dhe ndikimit B2B",
                "Komunikim — mjet për rritje të shitjeve",
                "Menaxhimi inteligjent i marrëdhënieve",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#E8845A] mt-0.5 shrink-0" />
                  <span className="text-[15px] text-[#1A1A1A] font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <Link
              href="/services"
              className="btn-primary text-[15px]"
            >
              Shiko të gjitha
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Right — Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/programs/sales.png"
                alt="Training session"
                className="w-full h-[420px] object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 4: DIGITAL MARKETING / DOMINATION
   ═══════════════════════════════════════════ */
function DigitalSection() {
  return (
    <section className="bg-white section-padding">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — Image with overlay cards */}
          <motion.div {...fadeInUp} className="relative">
            <div className="rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/programs/coaching.png"
                alt="Corporate training"
                className="w-full h-[420px] object-cover"
              />
            </div>
            {/* Floating testimonial */}
            <div className="absolute -bottom-5 left-4 right-4 bg-white rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] p-4 border border-[#E8E8E8]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E8845A] flex items-center justify-center text-white font-bold text-sm">
                  AK
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-[#1A1A1A]">Arben K.</div>
                  <div className="text-[12px] text-[#6B6B6B]">CEO, TechPrishtina</div>
                </div>
                <div className="ml-auto flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-[#E8845A]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="label-tag mb-4 block">MARKETING & STRATEGJI</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-6">
              Dominoni tregun tuaj online.
            </h2>
            <p className="text-[17px] text-[#6B6B6B] leading-[1.65] mb-8 max-w-[480px]">
              Trajnim i avancuar për transformimin e ndërveprimit dixhital të
              ekipit tuaj. Dominim i tregut përmes komunikimit me efektivitet të lartë.
            </p>

            <ul className="space-y-4">
              {[
                "Strategji e markës për sjell klientë",
                "Menaxhimi efektiv i llogarive kryesore",
                "Analytics – vendime bazuar në të dhëna",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#E8845A] mt-0.5 shrink-0" />
                  <span className="text-[15px] text-[#1A1A1A] font-medium">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   TESTIMONIAL SECTION
   ═══════════════════════════════════════════ */
function TestimonialSection() {
  return (
    <section className="bg-[#1C1C1C] section-padding">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <motion.div
          {...fadeInUp}
          className="max-w-[800px] mx-auto text-center"
        >
          {/* Quote Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 rounded-full bg-[#E8845A] flex items-center justify-center">
              <Quote className="w-5 h-5 text-white" />
            </div>
          </div>

          <blockquote className="text-[clamp(20px,3vw,28px)] font-semibold leading-[1.4] text-white mb-10 tracking-[-0.01em]">
            &ldquo;Smarter ka transformuar plotësisht mënyrën se si ne operojmë.
            Trajnimet e tyre nuk ishin thjesht teori, por praktika të zbatueshme
            që sollën një rritje prej 40% në produktivitetin e ekipit tonë
            brenda 6 muajve.&rdquo;
          </blockquote>

          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#2D4A3E] flex items-center justify-center text-white font-bold text-sm">
              AR
            </div>
            <div className="text-left">
              <div className="text-[15px] font-semibold text-white">
                Agim Rexha
              </div>
              <div className="text-[13px] text-white/50">
                COO, Solaborate Innovations
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CTA SECTION
   ═══════════════════════════════════════════ */
function CTASection() {
  return (
    <section className="bg-[#2D4A3E] section-padding">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8 text-center">
        <motion.div {...fadeInUp} className="max-w-[640px] mx-auto">
          <h2 className="text-[clamp(28px,4.5vw,48px)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-5">
            Gati për të ngritur nivelin e ekipit tuaj?
          </h2>
          <p className="text-[17px] text-white/80 leading-[1.65] mb-10 max-w-[500px] mx-auto">
            Bashkë hartojmë strategji personalizuara të trajnimit për kompaninë
            e juaj, e mbështetur te fusha e veprimit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className="btn-accent text-[15px] !bg-white !text-[#2D4A3E] hover:!bg-[#E8845A] hover:!text-white border-none">
              Regjistro Konsultimin
            </Link>
            <Link href="/services" className="px-5 py-[11px] rounded-none border border-white/30 text-white hover:bg-white/10 transition-colors text-[15px] font-medium flex items-center justify-center">
              Shiko Programet
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOME PAGE EXPORT
   ═══════════════════════════════════════════ */
export default function HomePageClient({ initialPrograms }: { initialPrograms: any[] }) {
  return (
    <>
      <HeroSection />
      <ProgramsHorizontalScroll initialPrograms={initialPrograms} />
      <ProgramsSection />
      <LeadershipSection />
      <SkillsSection />
      <DigitalSection />
      <TestimonialSection />
      <CTASection />
    </>
  );
}
