"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import GlassPanel from "@/components/glass/GlassPanel";

/* ── Simulated data from the logistic regression results ── */

// Figure 1: Predicted probability of re-election by conflict intensity
const conflictData = [
  { level: "None", prob: 0.42, label: "無衝突" },
  { level: "Low", prob: 0.48, label: "低強度" },
  { level: "Medium", prob: 0.56, label: "中強度" },
  { level: "High", prob: 0.63, label: "高強度" },
  { level: "War", prob: 0.59, label: "戰爭" },
];

// Figure 2: Interaction effect — National Power moderates Conflict → Re-election
const interactionData = {
  highPower: [
    { conflict: 0, prob: 0.50 },
    { conflict: 1, prob: 0.58 },
    { conflict: 2, prob: 0.67 },
    { conflict: 3, prob: 0.72 },
    { conflict: 4, prob: 0.68 },
  ],
  lowPower: [
    { conflict: 0, prob: 0.38 },
    { conflict: 1, prob: 0.41 },
    { conflict: 2, prob: 0.43 },
    { conflict: 3, prob: 0.40 },
    { conflict: 4, prob: 0.35 },
  ],
};

// Figure 3: Logistic regression coefficients
const coefficients = [
  { name: "Conflict Intensity", coef: 0.34, se: 0.12, sig: true },
  { name: "National Power (CINC)", coef: 0.28, se: 0.09, sig: true },
  { name: "Conflict × Power", coef: 0.15, se: 0.11, sig: false },
  { name: "GDP Growth", coef: 0.22, se: 0.08, sig: true },
  { name: "Democracy Level", coef: 0.05, se: 0.14, sig: false },
  { name: "Tenure Length", coef: -0.18, se: 0.07, sig: true },
];

const barSpring = {
  hidden: { scaleY: 0, opacity: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    opacity: 1,
    transition: {
      delay: 0.2 + i * 0.1,
      type: "spring" as const,
      stiffness: 200,
      damping: 20,
    },
  }),
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.3 + i * 0.06, type: "spring" as const, stiffness: 200, damping: 22 },
  }),
};

export default function PowerConflictViz() {
  const [activeTab, setActiveTab] = useState<"bar" | "interaction" | "coef">("bar");

  return (
    <GlassPanel className="!p-0 overflow-hidden">
      {/* Tab bar */}
      <div className="flex border-b border-black/6">
        {([
          ["bar", "Conflict & Re-election"],
          ["interaction", "Power Interaction"],
          ["coef", "Regression Results"],
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
                layoutId="viz-tab-power"
                className="absolute bottom-0 left-2 right-2 h-[2px] bg-accent-warm"
                transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "bar" && <ConflictBarChart />}
        {activeTab === "interaction" && <InteractionChart />}
        {activeTab === "coef" && <CoefficientChart />}
      </div>
    </GlassPanel>
  );
}

/* ── Bar Chart: Conflict Intensity vs Re-election Probability ── */
function ConflictBarChart() {
  const maxProb = 0.8;

  return (
    <motion.div initial="hidden" animate="visible" key="bar">
      <p className="text-sm text-foreground/50 mb-6">
        Predicted Re-election Probability by International Conflict Intensity
      </p>
      <div className="flex items-end gap-3 h-52">
        {conflictData.map((d, i) => {
          const height = (d.prob / maxProb) * 100;
          return (
            <div key={d.level} className="flex-1 flex flex-col items-center gap-2">
              <motion.span
                custom={i}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="text-xs font-medium text-foreground/70"
              >
                {(d.prob * 100).toFixed(0)}%
              </motion.span>
              <motion.div
                custom={i}
                variants={barSpring}
                initial="hidden"
                animate="visible"
                className="w-full rounded-t-lg bg-gradient-to-t from-accent-warm/80 to-accent-warm/40"
                style={{ height: `${height}%`, originY: 1 }}
              />
              <div className="text-center">
                <span className="text-[10px] text-foreground/40 block">{d.label}</span>
                <span className="text-[10px] text-foreground/30">{d.level}</span>
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-foreground/35 mt-4 text-center">
        資料範圍：全球總統/半總統制民主國家 (1875–2020)，V-Dem Electoral Democracy Index &gt; 0.5
      </p>
    </motion.div>
  );
}

/* ── Interaction Effect: Two lines showing High vs Low Power ── */
function InteractionChart() {
  const chartW = 280;
  const chartH = 160;
  const padL = 0;
  const padR = 0;

  const toPath = (data: { conflict: number; prob: number }[]) => {
    return data
      .map((d, i) => {
        const x = padL + (i / (data.length - 1)) * (chartW - padL - padR);
        const y = chartH - ((d.prob - 0.25) / 0.55) * chartH;
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");
  };

  const highPath = toPath(interactionData.highPower);
  const lowPath = toPath(interactionData.lowPower);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      key="interaction"
    >
      <p className="text-sm text-foreground/50 mb-6">
        National Power as Moderator: Conflict Effect on Re-election
      </p>
      <div className="flex justify-center">
        <svg viewBox={`0 0 ${chartW} ${chartH + 30}`} className="w-full max-w-sm">
          {/* Grid lines */}
          {[0.3, 0.4, 0.5, 0.6, 0.7].map((v) => {
            const y = chartH - ((v - 0.25) / 0.55) * chartH;
            return (
              <g key={v}>
                <line x1={0} y1={y} x2={chartW} y2={y} stroke="currentColor" strokeOpacity={0.08} />
                <text x={chartW + 4} y={y + 3} fontSize={9} fill="currentColor" opacity={0.3}>
                  {(v * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          {/* High Power line */}
          <motion.path
            d={highPath}
            fill="none"
            stroke="#8c6d50"
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.3, duration: 1.2, ease: "easeOut" }}
          />

          {/* Low Power line */}
          <motion.path
            d={lowPath}
            fill="none"
            stroke="#8c6d50"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeDasharray="6 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 1.2, ease: "easeOut" }}
          />

          {/* Dots for High Power */}
          {interactionData.highPower.map((d, i) => {
            const x = padL + (i / 4) * (chartW - padL - padR);
            const y = chartH - ((d.prob - 0.25) / 0.55) * chartH;
            return (
              <motion.circle
                key={`h-${i}`}
                cx={x}
                cy={y}
                r={4}
                fill="#8c6d50"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 + i * 0.1, type: "spring" as const, stiffness: 300 }}
              />
            );
          })}

          {/* Dots for Low Power */}
          {interactionData.lowPower.map((d, i) => {
            const x = padL + (i / 4) * (chartW - padL - padR);
            const y = chartH - ((d.prob - 0.25) / 0.55) * chartH;
            return (
              <motion.circle
                key={`l-${i}`}
                cx={x}
                cy={y}
                r={4}
                fill="#8c6d50"
                fillOpacity={0.4}
                stroke="#8c6d50"
                strokeWidth={1.5}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, type: "spring" as const, stiffness: 300 }}
              />
            );
          })}

          {/* X-axis labels */}
          {["None", "Low", "Med", "High", "War"].map((label, i) => {
            const x = padL + (i / 4) * (chartW - padL - padR);
            return (
              <text key={label} x={x} y={chartH + 16} fontSize={9} fill="currentColor" opacity={0.4} textAnchor="middle">
                {label}
              </text>
            );
          })}
        </svg>
      </div>
      {/* Legend */}
      <div className="flex justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-[2px] bg-accent-warm" />
          <span className="text-xs text-foreground/50">High National Power</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-5 h-[2px] bg-accent-warm/50 border-t border-dashed border-accent-warm" />
          <span className="text-xs text-foreground/50">Low National Power</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Coefficient Forest Plot ── */
function CoefficientChart() {
  const maxCoef = 0.5;

  return (
    <motion.div initial="hidden" animate="visible" key="coef">
      <p className="text-sm text-foreground/50 mb-6">
        Logistic Regression Coefficients (Binary DV: Re-election)
      </p>
      <div className="space-y-3">
        {coefficients.map((c, i) => {
          const pct = ((c.coef + maxCoef) / (maxCoef * 2)) * 100;
          const sePctL = ((c.coef - c.se + maxCoef) / (maxCoef * 2)) * 100;
          const sePctR = ((c.coef + c.se + maxCoef) / (maxCoef * 2)) * 100;

          return (
            <motion.div
              key={c.name}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex items-center gap-3"
            >
              <span className="w-36 shrink-0 text-xs text-foreground/60 text-right truncate">
                {c.name}
              </span>
              <div className="relative flex-1 h-6">
                {/* Zero line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-px bg-foreground/15" />
                {/* SE whisker */}
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 h-px bg-foreground/25"
                  style={{ left: `${sePctL}%`, width: `${sePctR - sePctL}%` }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                />
                {/* Point estimate */}
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full ${
                    c.sig ? "bg-accent-warm" : "bg-foreground/25"
                  }`}
                  style={{ left: `${pct}%` }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.06, type: "spring" as const, stiffness: 400 }}
                />
              </div>
              <span className="w-14 shrink-0 text-xs text-foreground/40 tabular-nums">
                {c.coef > 0 ? "+" : ""}
                {c.coef.toFixed(2)}
                {c.sig ? " *" : ""}
              </span>
            </motion.div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-4 text-[10px] text-foreground/30">
        <span>&larr; 負向效果</span>
        <span>0</span>
        <span>正向效果 &rarr;</span>
      </div>
      <p className="text-xs text-foreground/35 mt-3">
        * p &lt; 0.05 | Whiskers = ± 1 SE | DV: 執政黨是否連任 (0/1)
      </p>
    </motion.div>
  );
}
