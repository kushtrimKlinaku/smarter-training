'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { RegistrationModal } from "@/components/forms/RegistrationModal";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

export default function TrainingPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [training, setTraining] = useState<any>(null);
  const [otherTrainings, setOtherTrainings] = useState<any[]>([]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/trainings')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data) && data.length > 0) {
          const found = data.find(t => t.slug === slug);
          if (found) setTraining(found);
          const others = data.filter((t: any) => t.slug !== slug).slice(0, 2);
          setOtherTrainings(others);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 border-2 border-[#E8845A] border-t-transparent rounded-full animate-spin" />
          <span className="text-[#6B6B6B] text-[17px]">Duke u ngarkuar...</span>
        </div>
      </div>
    );
  }

  if (!training) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white pt-[72px]">
        <div className="text-center">
          <h1 className="text-[36px] font-bold text-[#1A1A1A] mb-4">
            Trajnimi nuk u gjet
          </h1>
          <p className="text-[#6B6B6B] mb-8 text-[17px]">
            Kjo faqe nuk ekziston ose trajnimi nuk është i disponueshëm.
          </p>
          <Link
            href="/soft-skills-academy"
            className="btn-primary text-[15px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Kthehu tek Akademia
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        trainingTitle={training.title}
        trainingSlug={training.slug}
      />

      {/* Hero */}
      <section className="bg-white pt-[120px] pb-[60px]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link
              href="/soft-skills-academy"
              className="inline-flex items-center gap-2 text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors text-[14px] cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Kthehu tek Akademia
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-12 items-start">
            {/* Training Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border mb-6"
                style={{
                  backgroundColor: `${training.color || '#E8845A'}10`,
                  borderColor: `${training.color || '#E8845A'}30`,
                }}
              >
                <BookOpen className="w-4 h-4" style={{ color: training.color || '#E8845A' }} />
                <span
                  className="text-[13px] font-medium"
                  style={{ color: training.color || '#E8845A' }}
                >
                  Soft Skills Academy
                </span>
              </div>

              <h1 className="text-[clamp(32px,5vw,52px)] font-bold text-[#1A1A1A] mb-4 leading-[1.1] tracking-[-0.03em]">
                {training.title}
              </h1>
              <p className="text-[18px] text-[#6B6B6B] mb-3 font-medium">{training.subtitle}</p>
              <p className="text-[17px] text-[#6B6B6B] leading-[1.65] mb-8 max-w-[560px]">
                {training.longDescription}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-[13px] text-[#6B6B6B]">
                <span className="inline-flex items-center gap-2">
                  <Calendar className="w-4 h-4" style={{ color: training.color || '#E8845A' }} />
                  {training.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock className="w-4 h-4" style={{ color: training.color || '#E8845A' }} />
                  {training.time || '10:00 - 16:00'}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" style={{ color: training.color || '#E8845A' }} />
                  {training.location}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Users className="w-4 h-4" style={{ color: training.color || '#E8845A' }} />
                  {training.audience || 'Të gjithë'}
                </span>
              </div>
            </motion.div>

            {/* Registration Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <div className="bg-[#1C1C1C] rounded-2xl p-8 sticky top-[90px]">
                <div className="text-center mb-6">
                  <div className="text-[36px] font-bold text-white mb-1 tracking-[-0.03em]">
                    {training.price}
                  </div>
                  <span className="text-white/40 text-[13px]">
                    {training.duration || 'Full day'} • përfshihet materiali
                  </span>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    "Certifikatë profesionale",
                    "Materiale trajnimi",
                    "Pauzë kafeje & dreke",
                    "Grup i vogël (max 20)",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-white/60 text-[14px]"
                    >
                      <CheckCircle className="w-4 h-4 text-[#E8845A] shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-3.5 rounded-full bg-[#E8845A] text-white font-semibold hover:bg-[#d4743f] shadow-lg shadow-[#E8845A]/25 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 text-[15px] cursor-pointer"
                >
                  Regjistrohu Tani
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p className="text-white/30 text-[12px] text-center mt-4">
                  Vendet janë të kufizuara. Siguroni vendin tuaj sot.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Attend */}
      <section className="bg-[#F5F5F5] section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div {...fadeInUp}>
              <span className="label-tag mb-4 block">PSE DUHET TË MERRNI PJESË</span>
              <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-6">
                Çfarë do të merrni
              </h2>
              <p className="text-[#6B6B6B] leading-[1.65] mb-8 text-[17px]">
                {training.whyAttend || 'Përveç njohurive teknike dhe praktike, do të përfitoni një eksperiencë unike e cila ju zgjeron horizontin profesional dhe rrit aftësinë tuaj për të komunikuar.'}
              </p>
              <ul className="space-y-3">
                {(training.benefits || ["Aftësi praktike", "Certifikatë", "Rritje profesionale"]).map((benefit: string) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-3 text-[#1A1A1A] text-[15px]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#E8845A] mt-0.5 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...fadeInUp}>
              <div
                className="aspect-square rounded-2xl p-8 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${training.color || '#E8845A'}15, ${training.color || '#E8845A'}05)`,
                  border: `1px solid ${training.color || '#E8845A'}20`,
                }}
              >
                <div className="text-center">
                  <Award
                    className="w-24 h-24 mx-auto mb-6"
                    style={{ color: `${training.color || '#E8845A'}40` }}
                  />
                  <div className="text-[28px] font-bold text-[#1A1A1A] mb-2">
                    Certifikatë
                  </div>
                  <p className="text-[#6B6B6B] text-[14px]">
                    Profesionale nga Smarter Training
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      {training.curriculum && training.curriculum.length > 0 && (
      <section className="bg-white section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">KURRIKULA</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Kurrikula e trajnimit
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Çdo modul është dizajnuar me kujdes për të siguruar mësim progresiv
              dhe praktik.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[960px] mx-auto">
            {training.curriculum.map((module: any, i: number) => (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-elevated p-6 cursor-pointer"
              >
                <div
                  className="text-[36px] font-bold mb-3 leading-none"
                  style={{ color: `${training.color || '#E8845A'}20` }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h4 className="text-[18px] font-semibold text-[#1A1A1A] mb-2">
                  {module.title}
                </h4>
                <p className="text-[#6B6B6B] text-[14px] leading-relaxed">
                  {module.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Bottom CTA */}
      <section className="bg-[#1C1C1C] section-padding">
        <div className="max-w-[800px] mx-auto px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="text-[clamp(28px,4.5vw,48px)] font-bold leading-[1.1] tracking-[-0.03em] text-white mb-4">
              Gati të regjistroheni?
            </h2>
            <p className="text-white/50 text-[17px] mb-4 leading-[1.65]">
              {training.date} • {training.location} • {training.price}
            </p>
            <p className="text-white/30 text-[14px] mb-10">
              Vendet janë të kufizuara në 20 pjesëmarrës.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-accent text-[15px] cursor-pointer"
            >
              Regjistrohu Tani
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Related Trainings */}
      {otherTrainings.length > 0 && (
      <section className="bg-white section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <span className="label-tag mb-4 block">TRAJNIME TË TJERA</span>
            <h2 className="text-[clamp(28px,4vw,42px)] font-semibold leading-[1.15] tracking-[-0.02em] text-[#1A1A1A] mb-4">
              Trajnime të tjera
            </h2>
            <p className="text-[#6B6B6B] max-w-[520px] mx-auto text-[17px] leading-[1.65]">
              Eksploro programet e tjera që mund t&apos;ju interesojnë.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
            {otherTrainings.map((t, i) => (
              <motion.div
                key={t.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link
                  href={`/soft-skills-academy/${t.slug}`}
                  className="group block bg-white rounded-2xl border border-[#E8E8E8] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <div
                    className="h-1.5"
                    style={{
                      background: `linear-gradient(to right, ${t.color || '#E8845A'}, ${t.color || '#E8845A'}88)`,
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-1 group-hover:text-[#E8845A] transition-colors">
                      {t.title}
                    </h3>
                    <p className="text-[#6B6B6B] text-[14px] mb-4 line-clamp-2">
                      {t.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[13px] text-[#6B6B6B] inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#E8845A]" />
                        {t.date}
                      </span>
                      <span className="text-[18px] font-bold text-[#1A1A1A]">
                        {t.price}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}
    </>
  );
}
