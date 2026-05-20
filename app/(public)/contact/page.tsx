"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { contactSchema, type ContactFormData } from "@/lib/schemas";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
};

const contactInfo = [
  {
    icon: MapPin,
    label: "Adresa",
    value: "Prishtinë, Kosovë",
    href: null,
  },
  {
    icon: Phone,
    label: "Telefoni",
    value: "+383 44 123 456",
    href: "tel:+38344123456",
  },
  {
    icon: Mail,
    label: "Email",
    value: "get@smarter.training",
    href: "mailto:get@smarter.training",
  },
  {
    icon: Clock,
    label: "Orari",
    value: "E Hënë – E Premte, 09:00 – 17:00",
    href: null,
  },
];

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Contact form data:", data);
    setIsLoading(false);
    setIsSubmitted(true);
  };

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
            <span className="label-tag mb-4 block">KONTAKTI</span>
            <h1 className="text-[clamp(36px,5vw,60px)] font-bold leading-[1.05] tracking-[-0.03em] text-[#1A1A1A] mb-6">
              Le të bisedojmë për
              <br />
              zhvillimin tuaj.
            </h1>
            <p className="text-[17px] text-[#6B6B6B] leading-[1.65] max-w-[520px]">
              Keni nevojë për trajnime korporative? Dëshironi informacion për
              akademinë? Na dërgoni një mesazh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="bg-[#F5F5F5] section-padding">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Form */}
            <motion.div {...fadeInUp} className="lg:col-span-3">
              <div className="bg-white rounded-2xl border border-[#E8E8E8] p-8 md:p-10">
                {isSubmitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 rounded-full bg-[#E8845A]/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-[#E8845A]" />
                    </div>
                    <h3 className="text-[24px] font-semibold text-[#1A1A1A] mb-3">
                      Mesazhi u dërgua!
                    </h3>
                    <p className="text-[#6B6B6B] mb-8 text-[17px]">
                      Faleminderit! Do t&apos;ju kontaktojmë brenda 24 orësh.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        reset();
                      }}
                      className="btn-primary text-[15px] cursor-pointer"
                    >
                      Dërgo Mesazh Tjetër
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">
                          Emri
                        </label>
                        <input
                          {...register("name")}
                          placeholder="Emri juaj"
                          className="w-full px-4 py-3.5 rounded-xl border border-[#E8E8E8] bg-[#F5F5F5] text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#E8845A]/20 focus:border-[#E8845A] transition-all text-[15px]"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-[12px] mt-1.5">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">
                          Email
                        </label>
                        <input
                          {...register("email")}
                          type="email"
                          placeholder="emri@email.com"
                          className="w-full px-4 py-3.5 rounded-xl border border-[#E8E8E8] bg-[#F5F5F5] text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#E8845A]/20 focus:border-[#E8845A] transition-all text-[15px]"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[12px] mt-1.5">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">
                        Tema
                      </label>
                      <input
                        {...register("subject")}
                        placeholder="Si mund t'ju ndihmojmë?"
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E8E8E8] bg-[#F5F5F5] text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#E8845A]/20 focus:border-[#E8845A] transition-all text-[15px]"
                      />
                      {errors.subject && (
                        <p className="text-red-500 text-[12px] mt-1.5">
                          {errors.subject.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[14px] font-medium text-[#1A1A1A] mb-2">
                        Mesazhi
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        placeholder="Shkruani mesazhin tuaj këtu..."
                        className="w-full px-4 py-3.5 rounded-xl border border-[#E8E8E8] bg-[#F5F5F5] text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#E8845A]/20 focus:border-[#E8845A] transition-all resize-none text-[15px]"
                      />
                      {errors.message && (
                        <p className="text-red-500 text-[12px] mt-1.5">
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-4 rounded-full bg-[#1A1A1A] text-white font-semibold hover:bg-[#333] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 text-[15px] cursor-pointer"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Duke u dërguar...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Dërgo Mesazhin
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div {...fadeInUp} className="lg:col-span-2 space-y-6">
              <div className="bg-[#1C1C1C] rounded-2xl p-8 text-white">
                <h3 className="text-[20px] font-semibold mb-6 text-white">
                  Informacione kontakti
                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                        <info.icon className="w-5 h-5 text-[#E8845A]" />
                      </div>
                      <div>
                        <div className="text-[12px] font-medium text-white/40 mb-0.5 uppercase tracking-[0.04em]">
                          {info.label}
                        </div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white/80 hover:text-[#E8845A] transition-colors text-[14px] cursor-pointer"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <span className="text-white/80 text-[14px]">
                            {info.value}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-[#E8E8E8]">
                <h3 className="text-[18px] font-semibold text-[#1A1A1A] mb-3">
                  Propozim korporativ?
                </h3>
                <p className="text-[#6B6B6B] text-[14px] mb-6 leading-relaxed">
                  Nëse keni nevojë për një propozim të personalizuar për
                  organizatën tuaj, na dërgoni email direkt ose plotësoni
                  formularin.
                </p>
                <a
                  href="mailto:get@smarter.training"
                  className="inline-flex items-center gap-2 text-[#E8845A] font-semibold text-[14px] hover:text-[#d4743f] transition-colors cursor-pointer"
                >
                  <Mail className="w-4 h-4" />
                  get@smarter.training
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
