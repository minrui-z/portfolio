"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import GlassPanel from "@/components/glass/GlassPanel";

/* ── Simulated data from the housing bias research ── */

// Figure 1: Contact success rate by housing type
const contactRates = [
  { type: "透天厝", typeEn: "Townhouse", rate: 0.68, n: 1240 },
  { type: "公寓 (無電梯)", typeEn: "Walk-up Apt.", rate: 0.55, n: 890 },
  { type: "大樓 (無警衛)", typeEn: "High-rise (No Guard)", rate: 0.38, n: 620 },
  { type: "大樓 (有警衛)", typeEn: "High-rise (Guard)", rate: 0.21, n: 310 },
];

// Figure 2: Voter turnout estimation — survey vs actual
const turnoutComparison = [
  { area: "低大樓比例", areaEn: "Low High-rise %", survey: 78, actual: 72, gap: 6 },
  { area: "中大樓比例", areaEn: "Mid High-rise %", survey: 82, actual: 71, gap: 11 },
  { area: "高大樓比例", areaEn: "High High-rise %", survey: 86, actual: 68, gap: 18 },
];

// Figure 3: Heckman Selection Model — selection bias magnitude
const heckmanResults = [
  { sample: "Full Sample", lambda: -0.12, se: 0.08, sig: false },
  { sample: "Non-High-rise", lambda: -0.31, se: 0.11, sig: true },
  { sample: "High-rise Only", lambda: -0.08, se: 0.09, sig: false },
];

const barSpring = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    opacity: 1,
    transition: {
      delay: 0.2 + i * 0.12,
      type: "spring" as const,
      stiffness: 180,
      damping: 18,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.08, type: "spring" as const, stiffness: 200, damping: 22 },
  }),
};

export default function HousingBiasViz() {
  const [activeTab, setActiveTab] = useState<"contact" | "turnout" | "heckman">("contact");

  return (
    <GlassPanel className="!p-0 overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-black/6">
        {([
          ["contact", "Contact Rates"],
          ["turnout", "Turnout Bias"],
          ["heckman", "Selection Model"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-1 px-4 py-3 text-xs sm:text-sm font-medium tracking-wide transition-colors relative ${
              activeTab === key
                ? "text-foreground"
                : "text-foreground/40 hover:text-foreground/60"
            }`}
          >
            {label}
            {activeTab === key && (
              <motion.div
                layoutId="viz-tab-housing"
                className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent-warm"
                transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "contact" && <ContactRateChart />}
        {activeTab === "turnout" && <TurnoutBiasChart />}
        {activeTab === "heckman" && <HeckmanChart />}
      </div>
    </GlassPanel>
  );
}

/* ── Horizontal Bar: Contact Success Rate by Housing Type ── */
function ContactRateChart() {
  return (
    <motion.div initial="hidden" animate="visible" key="contact">
      <p className="text-sm text-foreground/50 mb-6">
        Survey Contact Success Rate by Housing Type
      </p>
      <div className="space-y-4">
        {contactRates.map((d, i) => (
          <div key={d.typeEn} className="flex items-center gap-3">
            <div className="w-28 shrink-0 text-right">
              <span className="text-xs text-foreground/60 block">{d.type}</span>
              <span className="text-[10px] text-foreground/30">{d.typeEn}</span>
            </div>
            <div className="flex-1 relative h-8 bg-surface/50 rounded-lg overflow-hidden">
              <motion.div
                custom={i}
                variants={barSpring}
                initial="hidden"
                animate="visible"
                className="absolute inset-y-0 left-0 rounded-lg"
                style={{
                  width: `${d.rate * 100}%`,
                  originX: 0,
                  background: `linear-gradient(90deg, rgba(140,109,80,${0.3 + d.rate * 0.5}), rgba(140,109,80,${0.15 + d.rate * 0.3}))`,
                }}
              />
              <motion.span
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-foreground/70"
              >
                {(d.rate * 100).toFixed(0)}%
              </motion.span>
            </div>
            <span className="w-16 shrink-0 text-[10px] text-foreground/30 tabular-nums">
              n={d.n}
            </span>
          </div>
        ))}
      </div>

      {/* Annotation arrow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-6 flex items-center gap-2 text-xs text-accent-warm/80"
      >
        <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
          <path d="M0 6H16M16 6L11 1M16 6L11 11" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>門禁系統越嚴格，訪問成功率越低</span>
      </motion.div>
    </motion.div>
  );
}

/* ── Grouped Bar: Survey vs Actual Turnout by Area Type ── */
function TurnoutBiasChart() {
  const maxVal = 95;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      key="turnout"
    >
      <p className="text-sm text-foreground/50 mb-6">
        Survey Estimated vs Actual Voter Turnout by High-rise Proportion
      </p>

      <div className="flex items-end gap-6 sm:gap-10 h-52 justify-center">
        {turnoutComparison.map((d, i) => (
          <div key={d.area} className="flex flex-col items-center gap-1">
            {/* Gap label */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.15, type: "spring" }}
              className="text-[10px] font-medium text-red-500/70 mb-1"
            >
              +{d.gap}%
            </motion.div>

            <div className="flex items-end gap-1.5 h-40">
              {/* Survey bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.3 + i * 0.12, type: "spring" as const, stiffness: 180, damping: 18 }}
                className="w-7 rounded-t-md bg-accent-warm/60"
                style={{ height: `${(d.survey / maxVal) * 100}%`, originY: 1 }}
              />
              {/* Actual bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: 0.45 + i * 0.12, type: "spring" as const, stiffness: 180, damping: 18 }}
                className="w-7 rounded-t-md bg-foreground/15"
                style={{ height: `${(d.actual / maxVal) * 100}%`, originY: 1 }}
              />
            </div>

            <div className="text-center mt-2">
              <span className="text-[10px] text-foreground/50 block">{d.area}</span>
              <span className="text-[10px] text-foreground/30">{d.areaEn}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 mt-5">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-accent-warm/60" />
          <span className="text-xs text-foreground/50">民調估計 Survey</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-sm bg-foreground/15" />
          <span className="text-xs text-foreground/50">實際投票率 Actual</span>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-xs text-foreground/35 mt-4 text-center"
      >
        大樓比例越高的村里，民調與實際投票率之間的誤差越大
      </motion.p>
    </motion.div>
  );
}

/* ── Heckman Lambda Visualization ── */
function HeckmanChart() {
  return (
    <motion.div initial="hidden" animate="visible" key="heckman">
      <p className="text-sm text-foreground/50 mb-2">
        Heckman Selection Model: Inverse Mills Ratio (λ) by Sample
      </p>
      <p className="text-xs text-foreground/35 mb-6">
        λ 顯著 → 存在選樣偏誤；非大樓樣本的 λ 最為顯著
      </p>

      <div className="space-y-5">
        {heckmanResults.map((d, i) => {
          const center = 50;
          const scale = 100; // maps -0.5 to 0, 0 to 50, +0.5 to 100
          const pct = center + d.lambda * scale;
          const seLeft = center + (d.lambda - d.se) * scale;
          const seRight = center + (d.lambda + d.se) * scale;

          return (
            <motion.div
              key={d.sample}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm font-medium text-foreground/70">{d.sample}</span>
                <span className="text-xs text-foreground/40 tabular-nums">
                  λ = {d.lambda.toFixed(2)} {d.sig ? "**" : "(n.s.)"}
                </span>
              </div>
              <div className="relative h-8 bg-surface/50 rounded-lg">
                {/* Zero line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/15" />

                {/* SE whisker */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 h-[2px] bg-foreground/20 rounded"
                  style={{ left: `${seLeft}%`, width: `${seRight - seLeft}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5 + i * 0.12, duration: 0.4 }}
                />

                {/* Lambda point */}
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full border-2 ${
                    d.sig
                      ? "bg-accent-warm border-accent-warm"
                      : "bg-white border-foreground/25"
                  }`}
                  style={{ left: `${pct}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.12, type: "spring" as const, stiffness: 400, damping: 15 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-between mt-4 text-[10px] text-foreground/30">
        <span>λ &lt; 0 (偏誤存在)</span>
        <span>0</span>
        <span>λ &gt; 0</span>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.0 }}
        className="mt-5 p-3 rounded-lg bg-accent-warm/5 border border-accent-warm/10"
      >
        <p className="text-xs text-foreground/50 leading-relaxed">
          <span className="font-medium text-foreground/70">Key Insight:</span>{" "}
          Non-High-rise 樣本的選樣偏誤最為顯著 (λ = -0.31**)，
          顯示民調高估投票率的主因在於高安全性大樓住戶被系統性排除，
          導致剩餘樣本中高投票傾向者比例偏高。
        </p>
      </motion.div>
    </motion.div>
  );
}
