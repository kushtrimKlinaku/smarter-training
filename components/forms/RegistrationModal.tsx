"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "motion/react";
import { X, CheckCircle, Loader2 } from "lucide-react";
import { b2cSchema, type B2CFormData } from "@/lib/schemas";

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainingTitle?: string;
  trainingSlug?: string;
}

export function RegistrationModal({
  isOpen,
  onClose,
  trainingTitle,
  trainingSlug,
}: RegistrationModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<B2CFormData>({
    resolver: zodResolver(b2cSchema),
    defaultValues: {
      trainingSlug: trainingSlug || "",
    },
  });

  const onSubmit = async (data: B2CFormData) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Registration data:", data);
    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsSubmitted(false);
      reset();
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-[#1A1A1A]/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#1C1C1C] px-6 py-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-white font-semibold text-[18px]">Regjistrohu</h2>
                  {trainingTitle && (
                    <p className="text-[#E8845A] text-[13px] mt-0.5 font-medium">
                      {trainingTitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Mbyll"
                >
                  <X className="w-5 h-5 text-white/70" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#E8845A]/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#E8845A]" />
                    </div>
                    <h3 className="text-[20px] font-semibold text-[#1A1A1A] mb-2">
                      Regjistrimi u krye!
                    </h3>
                    <p className="text-[#6B6B6B] text-[14px] mb-6">
                      Do t&apos;ju kontaktojmë së shpejti me detajet e trajnimit.
                    </p>
                    <button
                      onClick={handleClose}
                      className="btn-primary text-[14px] cursor-pointer"
                    >
                      Mbyll
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#1A1A1A] mb-1.5">
                        Emri i Plotë
                      </label>
                      <input
                        {...register("fullName")}
                        placeholder="Emri Mbiemri"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E8] bg-[#F5F5F5] text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#E8845A]/20 focus:border-[#E8845A] transition-all text-[14px]"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-[12px] mt-1">
                          {errors.fullName.message}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#1A1A1A] mb-1.5">
                        Email
                      </label>
                      <input
                        {...register("email")}
                        type="email"
                        placeholder="emri@email.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E8] bg-[#F5F5F5] text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#E8845A]/20 focus:border-[#E8845A] transition-all text-[14px]"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-[12px] mt-1">
                          {errors.email.message}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[14px] font-medium text-[#1A1A1A] mb-1.5">
                        Telefoni
                      </label>
                      <input
                        {...register("phone")}
                        type="tel"
                        placeholder="+383 44 xxx xxx"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8E8E8] bg-[#F5F5F5] text-[#1A1A1A] placeholder:text-[#6B6B6B]/50 focus:outline-none focus:ring-2 focus:ring-[#E8845A]/20 focus:border-[#E8845A] transition-all text-[14px]"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-[12px] mt-1">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>

                    <input type="hidden" {...register("trainingSlug")} />

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 rounded-full bg-[#E8845A] text-white font-semibold hover:bg-[#d4743f] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md shadow-[#E8845A]/20 cursor-pointer text-[15px]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Duke u regjistruar...
                        </>
                      ) : (
                        "Regjistrohu Tani"
                      )}
                    </button>

                    <p className="text-[12px] text-[#6B6B6B] text-center">
                      Duke u regjistruar, ju pranoni kushtet tona të shërbimit.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
