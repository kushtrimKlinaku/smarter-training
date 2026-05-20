"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle, ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { programCategories, programItems as initialProgramItems } from "@/_data/programs";

export function ProgramsExplorer() {
  const [activeTab, setActiveTab] = useState(programCategories[0].id);
  const [programItems, setProgramItems] = useState(initialProgramItems);
  
  useEffect(() => {
    fetch('/api/programs')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data) && data.length > 0) {
          setProgramItems(data);
        }
      })
      .catch(console.error);
  }, []);

  const currentItems = programItems.filter((item) => item.categoryId === activeTab) || [];
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  
  const displayedItem = currentItems.find((item) => item.id === activeItemId) || currentItems[0];

  return (
    <div className="w-full">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
        {programCategories.map((category) => {
          const isActive = activeTab === category.id;
          return (
            <button
              key={category.id}
              onClick={() => {
                setActiveTab(category.id);
                setActiveItemId(null);
              }}
              className={`relative px-6 py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300 cursor-pointer ${
                isActive 
                 ? "text-white shadow-lg shadow-[#1A1A1A]/15 border border-[#333]" 
                 : "text-[#6B6B6B] hover:text-[#1A1A1A] bg-white hover:bg-[#F5F5F5] shadow-sm border border-[#E8E8E8]"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPillPrograms"
                  className="absolute inset-0 bg-[#1A1A1A] rounded-full"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <div className="flex items-center gap-2.5 relative z-10">
                <category.icon className={`w-4 h-4 ${isActive ? 'text-[#E8845A]' : 'text-[#E8845A]'}`} />
                {category.name}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Master-Detail Split Layout */}
      {currentItems.length > 0 ? (
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 min-h-[600px] relative items-start">
          
          {/* Master List (Left Column) */}
          <div className="lg:col-span-5 flex flex-col gap-3 sticky top-32">
            {currentItems.map((item) => {
              const isActive = displayedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveItemId(item.id)}
                  className={`group text-left px-6 py-5 rounded-2xl transition-all duration-300 border focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-[#1A1A1A] border-[#333] shadow-xl shadow-[#1A1A1A]/15 scale-[1.02] z-10"
                      : "bg-white border-[#E8E8E8] hover:border-[#E8845A]/30 hover:bg-[#F5F5F5]/50"
                  }`}
                >
                  <h4
                    className={`font-semibold text-[18px] mb-1.5 transition-colors ${
                      isActive ? "text-white" : "text-[#1A1A1A] group-hover:text-[#E8845A]"
                    }`}
                  >
                    {item.title}
                  </h4>
                  <p
                    className={`text-[14px] line-clamp-1 transition-colors leading-relaxed ${
                      isActive ? "text-white/60" : "text-[#6B6B6B]"
                    }`}
                  >
                    {item.shortDescription}
                  </p>
                </button>
              );
            })}
            
            {/* Contextual Empty Slot */}
            <div className="mt-4 p-6 rounded-2xl border-2 border-dashed border-[#E8E8E8] bg-white/20 hidden lg:block opacity-50">
              <p className="text-[#6B6B6B] text-[13px] font-medium text-center">
                Më shumë module gjatë vitit...
              </p>
            </div>
          </div>

          {/* Detail View (Right Column) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {displayedItem ? (
                <motion.div
                  key={displayedItem.id}
                  initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="bg-white rounded-2xl border border-[#E8E8E8] shadow-[0_20px_60px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col"
                >
                  <div className="relative h-72 w-full bg-[#1C1C1C]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={displayedItem.image}
                      alt={displayedItem.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent" />
                    
                    {/* Floating badge */}
                    <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-xl px-4 py-2 rounded-full shadow-lg border border-[#E8E8E8]">
                      <span className="text-[#E8845A] font-semibold text-[11px] uppercase tracking-[0.1em]">
                        Program i Personalizuar
                      </span>
                    </div>
                  </div>

                  <div className="p-8 lg:p-12 flex-1 flex flex-col bg-white -mt-24 relative z-10 rounded-t-[2rem]">
                    <span className="label-tag mb-4 block">PROGRAM EKSKLUZIV</span>
                    <h3 className="text-[28px] lg:text-[32px] font-bold text-[#1A1A1A] mb-6 leading-tight tracking-[-0.02em]">
                      {displayedItem.title}
                    </h3>
                    <p className="text-[#6B6B6B] leading-[1.65] text-[17px] mb-10">
                      {displayedItem.description}
                    </p>

                    <div className="mb-12">
                      <h5 className="label-tag mb-5 block">
                        REZULTATET & PËRFITIMET
                      </h5>
                      <ul className="space-y-4">
                        {displayedItem.benefits.map((benefit, idx) => (
                          <motion.li
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + idx * 0.1, duration: 0.4 }}
                            key={idx}
                            className="flex items-start gap-4 text-[#1A1A1A] bg-white shadow-sm hover:shadow-md transition-shadow p-5 rounded-2xl border border-[#E8E8E8] group cursor-pointer"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#E8845A]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E8845A]/20 transition-colors">
                              <CheckCircle className="w-4 h-4 text-[#E8845A]" />
                            </div>
                            <span className="text-[15px] leading-relaxed font-medium mt-1">{benefit}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8 border-t border-[#E8E8E8]">
                      <Link
                        href="/contact"
                        className="group flex w-full items-center justify-between px-8 py-5 rounded-full bg-[#1A1A1A] text-white font-semibold text-[16px] transition-all duration-300 shadow-lg hover:shadow-xl hover:bg-[#333] active:scale-[0.98] cursor-pointer"
                      >
                        <span>Kërko Propozim</span>
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 group-hover:translate-x-1 transition-all">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full min-h-[400px] flex items-center justify-center">
                  <p className="text-[#6B6B6B]">Përmbajtja nuk u gjet.</p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-2xl border border-[#E8E8E8]">
          <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center mx-auto mb-4">
            <Briefcase className="w-8 h-8 text-[#E8E8E8]" />
          </div>
          <p className="text-[#1A1A1A] font-medium text-[17px]">Modulet për këtë kategori janë në zhvillim.</p>
          <p className="text-[#6B6B6B] text-[14px] mt-2">Përditësohen së shpejti.</p>
        </div>
      )}
    </div>
  );
}
