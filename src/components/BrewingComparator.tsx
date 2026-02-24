"use client";

import { useState, useMemo } from "react";
import {
  brewingMethods,
  generateComparison,
  type BrewingMethod,
  type ComparisonInsight,
} from "@/lib/brewing-data";

const categoryColors: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  chemistry: { bg: "bg-blue-50 dark:bg-blue-950/40", text: "text-blue-700 dark:text-blue-300", border: "border-blue-200 dark:border-blue-800", dot: "bg-blue-500" },
  sensory: { bg: "bg-amber-50 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-300", border: "border-amber-200 dark:border-amber-800", dot: "bg-amber-500" },
  health: { bg: "bg-emerald-50 dark:bg-emerald-950/40", text: "text-emerald-700 dark:text-emerald-300", border: "border-emerald-200 dark:border-emerald-800", dot: "bg-emerald-500" },
  practical: { bg: "bg-purple-50 dark:bg-purple-950/40", text: "text-purple-700 dark:text-purple-300", border: "border-purple-200 dark:border-purple-800", dot: "bg-purple-500" },
};

const categoryLabels: Record<string, string> = {
  chemistry: "Chemistry & Extraction",
  sensory: "Sensory Profile",
  health: "Health & Bioactives",
  practical: "Practical Factors",
};

function MethodSelector({
  label,
  selected,
  onSelect,
  disabledId,
}: {
  label: string;
  selected: BrewingMethod | null;
  onSelect: (method: BrewingMethod) => void;
  disabledId: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex-1">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-neutral-200 bg-white px-5 py-4 text-left shadow-sm transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
      >
        {selected ? (
          <div className="flex items-center gap-3">
            <span className="text-2xl">{selected.icon}</span>
            <div>
              <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                {selected.name}
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                {selected.category} | {selected.origin}
              </div>
            </div>
          </div>
        ) : (
          <span className="text-neutral-400 dark:text-neutral-500">
            Select a brewing method...
          </span>
        )}
        <svg
          className={`h-5 w-5 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-800">
          {brewingMethods.map((method) => {
            const isDisabled = method.id === disabledId;
            return (
              <button
                key={method.id}
                disabled={isDisabled}
                onClick={() => {
                  onSelect(method);
                  setIsOpen(false);
                }}
                className={`flex w-full items-center gap-3 px-5 py-3 text-left transition-colors ${
                  isDisabled
                    ? "cursor-not-allowed opacity-40"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-700"
                } ${selected?.id === method.id ? "bg-neutral-50 dark:bg-neutral-700" : ""}`}
              >
                <span className="text-xl">{method.icon}</span>
                <div>
                  <div className="font-medium text-neutral-900 dark:text-neutral-100">
                    {method.name}
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {method.category} | est. {method.inventedYear}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function RadarChart({ methodA, methodB }: { methodA: BrewingMethod; methodB: BrewingMethod }) {
  const dimensions = [
    { key: "sweetness", label: "Sweetness" },
    { key: "bitterness", label: "Bitterness" },
    { key: "acidity", label: "Acidity" },
    { key: "body", label: "Body" },
    { key: "complexity", label: "Complexity" },
  ] as const;

  const cx = 150;
  const cy = 150;
  const maxR = 110;
  const levels = 5;

  function polarToCartesian(angle: number, radius: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
  }

  const angleStep = 360 / dimensions.length;

  const gridLines = Array.from({ length: levels }, (_, i) => {
    const r = (maxR / levels) * (i + 1);
    const points = dimensions
      .map((_, j) => {
        const { x, y } = polarToCartesian(j * angleStep, r);
        return `${x},${y}`;
      })
      .join(" ");
    return points;
  });

  function getPoints(method: BrewingMethod) {
    return dimensions
      .map((d, i) => {
        const value = method.flavorProfile[d.key];
        const r = (value / 10) * maxR;
        const { x, y } = polarToCartesian(i * angleStep, r);
        return `${x},${y}`;
      })
      .join(" ");
  }

  return (
    <div className="flex flex-col items-center">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
        Flavor Radar
      </h3>
      <svg viewBox="0 0 300 300" className="h-64 w-64 sm:h-72 sm:w-72">
        {/* Grid */}
        {gridLines.map((points, i) => (
          <polygon
            key={i}
            points={points}
            fill="none"
            stroke="currentColor"
            className="text-neutral-200 dark:text-neutral-700"
            strokeWidth="1"
          />
        ))}
        {/* Axis lines */}
        {dimensions.map((_, i) => {
          const { x, y } = polarToCartesian(i * angleStep, maxR);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="currentColor"
              className="text-neutral-200 dark:text-neutral-700"
              strokeWidth="1"
            />
          );
        })}
        {/* Method A */}
        <polygon
          points={getPoints(methodA)}
          fill="rgba(59, 130, 246, 0.15)"
          stroke="rgb(59, 130, 246)"
          strokeWidth="2"
        />
        {/* Method B */}
        <polygon
          points={getPoints(methodB)}
          fill="rgba(249, 115, 22, 0.15)"
          stroke="rgb(249, 115, 22)"
          strokeWidth="2"
        />
        {/* Labels */}
        {dimensions.map((d, i) => {
          const { x, y } = polarToCartesian(i * angleStep, maxR + 20);
          return (
            <text
              key={d.key}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-neutral-600 text-[10px] font-medium dark:fill-neutral-400"
            >
              {d.label}
            </text>
          );
        })}
      </svg>
      <div className="mt-2 flex items-center gap-4 text-xs">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
          {methodA.name}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" />
          {methodB.name}
        </span>
      </div>
    </div>
  );
}

function BarComparison({
  label,
  valueA,
  valueB,
  maxVal = 10,
  unitSuffix = "",
}: {
  label: string;
  valueA: number;
  valueB: number;
  maxVal?: number;
  unitSuffix?: string;
}) {
  const pctA = Math.min((valueA / maxVal) * 100, 100);
  const pctB = Math.min((valueB / maxVal) * 100, 100);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-medium text-neutral-600 dark:text-neutral-400">
        <span>{label}</span>
        <span>
          {valueA}{unitSuffix} vs {valueB}{unitSuffix}
        </span>
      </div>
      <div className="flex gap-1">
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <div
            className="h-full rounded-full bg-blue-500 transition-all duration-500"
            style={{ width: `${pctA}%` }}
          />
        </div>
        <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-800">
          <div
            className="h-full rounded-full bg-orange-500 transition-all duration-500"
            style={{ width: `${pctB}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function InsightCard({ insight, methodA, methodB }: { insight: ComparisonInsight; methodA: BrewingMethod; methodB: BrewingMethod }) {
  const colors = categoryColors[insight.category];
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`rounded-2xl border p-5 transition-all ${colors.border} ${colors.bg}`}
    >
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${colors.dot}`} />
          <h4 className={`text-sm font-bold ${colors.text}`}>
            {insight.dimension}
          </h4>
        </div>
        {insight.significance !== "low" && (
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
              insight.significance === "high"
                ? "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300"
            }`}
          >
            {insight.significance} difference
          </span>
        )}
      </div>

      <div className="mb-3 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-blue-500/10 px-3 py-2">
          <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {methodA.name}
          </div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {insight.methodAValue}
          </div>
        </div>
        <div className="rounded-xl bg-orange-500/10 px-3 py-2">
          <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
            {methodB.name}
          </div>
          <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {insight.methodBValue}
          </div>
        </div>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center gap-1.5 text-left text-xs font-medium text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
      >
        <svg
          className={`h-3.5 w-3.5 transition-transform ${expanded ? "rotate-90" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {expanded ? "Hide" : "Show"} scientific explanation
      </button>

      {expanded && (
        <p className="mt-2 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
          {insight.explanation}
        </p>
      )}
    </div>
  );
}

function MethodDetailPanel({ method, color }: { method: BrewingMethod; color: "blue" | "orange" }) {
  const borderColor = color === "blue" ? "border-blue-200 dark:border-blue-800" : "border-orange-200 dark:border-orange-800";
  const accentBg = color === "blue" ? "bg-blue-500" : "bg-orange-500";

  return (
    <div className={`rounded-2xl border ${borderColor} bg-white p-5 shadow-sm dark:bg-neutral-900`}>
      <div className="mb-4 flex items-center gap-3">
        <div className={`h-1 w-6 rounded-full ${accentBg}`} />
        <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
          {method.icon} {method.name}
        </h3>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {method.description}
      </p>

      <div className="mb-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-neutral-50 px-3 py-2 dark:bg-neutral-800">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Brew Time</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            {method.brewTime.min}-{method.brewTime.max} {method.brewTime.unit}
          </div>
        </div>
        <div className="rounded-xl bg-neutral-50 px-3 py-2 dark:bg-neutral-800">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Water Temp</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
            {method.waterTemp.min}-{method.waterTemp.max} {method.waterTemp.unit}
          </div>
        </div>
        <div className="rounded-xl bg-neutral-50 px-3 py-2 dark:bg-neutral-800">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Grind Size</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{method.grindSize}</div>
        </div>
        <div className="rounded-xl bg-neutral-50 px-3 py-2 dark:bg-neutral-800">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Ratio</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">{method.typicalRatio}</div>
        </div>
        <div className="rounded-xl bg-neutral-50 px-3 py-2 dark:bg-neutral-800">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Filter</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 capitalize">{method.filterType}</div>
        </div>
        <div className="rounded-xl bg-neutral-50 px-3 py-2 dark:bg-neutral-800">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">Category</div>
          <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100 capitalize">{method.category}</div>
        </div>
      </div>

      <div className="border-t border-neutral-100 pt-4 dark:border-neutral-800">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Key Research
        </h4>
        <div className="space-y-2">
          {method.scienceNotes.slice(0, 2).map((note, i) => (
            <div key={i} className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
              <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                {note.fact}
              </p>
              <p className="mt-1 text-[10px] font-medium text-neutral-400">
                {note.source} ({note.year})
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 border-t border-neutral-100 pt-4 dark:border-neutral-800">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Health Notes
        </h4>
        <div className="space-y-2">
          {method.healthNotes.map((note, i) => (
            <div key={i} className="rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800">
              <p className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
                {note.claim}
              </p>
              <p className="mt-1 text-[10px] text-neutral-500 dark:text-neutral-400">
                {note.evidence}
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-neutral-400">
                Source: {note.source}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CategoryFilter({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string | null;
  onCategoryChange: (cat: string | null) => void;
}) {
  const categories = ["chemistry", "sensory", "health", "practical"];

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
          activeCategory === null
            ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
        }`}
      >
        All
      </button>
      {categories.map((cat) => {
        const colors = categoryColors[cat];
        return (
          <button
            key={cat}
            onClick={() => onCategoryChange(activeCategory === cat ? null : cat)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              activeCategory === cat
                ? `${colors.bg} ${colors.text} ring-1 ${colors.border}`
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700"
            }`}
          >
            {categoryLabels[cat]}
          </button>
        );
      })}
    </div>
  );
}

export default function BrewingComparator() {
  const [methodA, setMethodA] = useState<BrewingMethod | null>(null);
  const [methodB, setMethodB] = useState<BrewingMethod | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const insights = useMemo(() => {
    if (!methodA || !methodB) return [];
    return generateComparison(methodA, methodB);
  }, [methodA, methodB]);

  const filteredInsights = useMemo(() => {
    if (!activeCategory) return insights;
    return insights.filter((i) => i.category === activeCategory);
  }, [insights, activeCategory]);

  const groupedInsights = useMemo(() => {
    const groups: Record<string, ComparisonInsight[]> = {};
    for (const insight of filteredInsights) {
      if (!groups[insight.category]) groups[insight.category] = [];
      groups[insight.category].push(insight);
    }
    return groups;
  }, [filteredInsights]);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(249,115,22,0.05),transparent_50%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-1.5 text-xs font-semibold text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Science-Backed Analysis
            </div>
            <h1 className="mb-3 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-5xl">
              Coffee Brewing
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Method Comparator
              </span>
            </h1>
            <p className="mx-auto max-w-xl text-base text-neutral-500 dark:text-neutral-400">
              Select two brewing methods for a detailed 1:1 comparison backed by
              peer-reviewed research, food chemistry analysis, and established
              extraction science.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {/* Selectors */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end">
          <MethodSelector
            label="Method A"
            selected={methodA}
            onSelect={setMethodA}
            disabledId={methodB?.id ?? null}
          />
          <div className="hidden items-end pb-4 sm:flex">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-bold text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
              VS
            </div>
          </div>
          <MethodSelector
            label="Method B"
            selected={methodB}
            onSelect={setMethodB}
            disabledId={methodA?.id ?? null}
          />
        </div>

        {/* Content */}
        {methodA && methodB ? (
          <div className="space-y-8">
            {/* Quick stats row */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <MethodDetailPanel method={methodA} color="blue" />
              <div className="flex flex-col items-center justify-center gap-6">
                <RadarChart methodA={methodA} methodB={methodB} />
                <div className="w-full space-y-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                  <h3 className="text-center text-xs font-semibold uppercase tracking-wider text-neutral-500">
                    Key Metrics
                  </h3>
                  <BarComparison
                    label="Body"
                    valueA={methodA.bodyLevel}
                    valueB={methodB.bodyLevel}
                  />
                  <BarComparison
                    label="Acidity"
                    valueA={methodA.acidityLevel}
                    valueB={methodB.acidityLevel}
                  />
                  <BarComparison
                    label="Clarity"
                    valueA={methodA.clarityLevel}
                    valueB={methodB.clarityLevel}
                  />
                  <BarComparison
                    label="Extraction"
                    valueA={(methodA.extractionYield.min + methodA.extractionYield.max) / 2}
                    valueB={(methodB.extractionYield.min + methodB.extractionYield.max) / 2}
                    maxVal={30}
                    unitSuffix="%"
                  />
                </div>
              </div>
              <MethodDetailPanel method={methodB} color="orange" />
            </div>

            {/* Category filter */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Filter by Dimension
              </h3>
              <CategoryFilter
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Detailed insights */}
            {Object.entries(groupedInsights).map(([category, catInsights]) => (
              <div key={category}>
                <div className="mb-4 flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${categoryColors[category].dot}`} />
                  <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
                    {categoryLabels[category]}
                  </h2>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {catInsights.map((insight) => (
                    <InsightCard
                      key={insight.dimension}
                      insight={insight}
                      methodA={methodA}
                      methodB={methodB}
                    />
                  ))}
                </div>
              </div>
            ))}

            {/* Sources footer */}
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
              <h3 className="mb-4 text-sm font-bold text-neutral-900 dark:text-neutral-100">
                References & Sources
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {[...methodA.scienceNotes, ...methodB.scienceNotes]
                  .filter(
                    (note, index, self) =>
                      self.findIndex((n) => n.source === note.source) === index
                  )
                  .sort((a, b) => b.year - a.year)
                  .map((note, i) => (
                    <div
                      key={i}
                      className="rounded-lg bg-neutral-50 px-4 py-2 text-xs text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      <span className="font-medium">{note.source}</span>{" "}
                      <span className="text-neutral-400 dark:text-neutral-500">({note.year})</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-200 bg-white/50 py-20 text-center dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="mb-6 text-6xl">☕</div>
            <h2 className="mb-2 text-xl font-bold text-neutral-900 dark:text-neutral-100">
              Select Two Methods to Compare
            </h2>
            <p className="max-w-sm text-sm text-neutral-500 dark:text-neutral-400">
              Choose a brewing method from each dropdown above to see a detailed,
              science-backed 1:1 comparison of their chemistry, flavor, health
              effects, and practical differences.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {brewingMethods.slice(0, 4).map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    if (!methodA) setMethodA(m);
                    else if (!methodB && m.id !== methodA.id) setMethodB(m);
                  }}
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-3 text-center shadow-sm transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-800 dark:hover:border-neutral-600"
                >
                  <div className="text-2xl">{m.icon}</div>
                  <div className="mt-1 text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {m.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 bg-white py-8 dark:border-neutral-800 dark:bg-neutral-900">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            All data sourced from peer-reviewed journals and established food science literature.
            <br />
            This tool is for educational purposes only and does not constitute medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
