// Science-backed coffee brewing method data
// Sources cited inline from peer-reviewed research and established food science literature

export interface BrewingMethod {
  id: string;
  name: string;
  icon: string;
  category: "immersion" | "percolation" | "pressure" | "hybrid";
  description: string;
  brewTime: { min: number; max: number; unit: string };
  waterTemp: { min: number; max: number; unit: string };
  grindSize: string;
  typicalRatio: string; // coffee:water
  caffeinePerServing: { min: number; max: number; unit: string }; // mg per typical serving
  tdsRange: { min: number; max: number }; // Total Dissolved Solids in %
  extractionYield: { min: number; max: number }; // percentage
  bodyLevel: number; // 1-10
  acidityLevel: number; // 1-10
  clarityLevel: number; // 1-10
  oilContent: "very low" | "low" | "moderate" | "high" | "very high";
  cafestolLevel: "negligible" | "low" | "moderate" | "high" | "very high";
  filterType: "paper" | "metal" | "cloth" | "none";
  inventedYear: number;
  origin: string;
  servingSize: number; // ml
  scienceNotes: ScienceNote[];
  healthNotes: HealthNote[];
  flavorProfile: FlavorProfile;
  environmentalImpact: EnvironmentalImpact;
}

export interface ScienceNote {
  fact: string;
  source: string;
  year: number;
}

export interface HealthNote {
  claim: string;
  evidence: string;
  source: string;
}

export interface FlavorProfile {
  sweetness: number; // 1-10
  bitterness: number; // 1-10
  acidity: number; // 1-10
  body: number; // 1-10
  complexity: number; // 1-10
}

export interface EnvironmentalImpact {
  wasteType: string;
  energyUse: "low" | "moderate" | "high";
  waterEfficiency: "low" | "moderate" | "high";
}

export interface ComparisonDimension {
  key: string;
  label: string;
  description: string;
  category: "chemistry" | "sensory" | "health" | "practical";
}

export const comparisonDimensions: ComparisonDimension[] = [
  {
    key: "extraction",
    label: "Extraction & Chemistry",
    description:
      "How compounds are extracted from coffee grounds into the brew",
    category: "chemistry",
  },
  {
    key: "sensory",
    label: "Sensory Profile",
    description: "Taste, aroma, and mouthfeel characteristics",
    category: "sensory",
  },
  {
    key: "health",
    label: "Health & Bioactives",
    description:
      "Caffeine, antioxidants, diterpenes, and other bioactive compounds",
    category: "health",
  },
  {
    key: "practical",
    label: "Practical Factors",
    description: "Time, cost, environmental impact, and ease of use",
    category: "practical",
  },
];

export const brewingMethods: BrewingMethod[] = [
  {
    id: "french-press",
    name: "French Press",
    icon: "🫖",
    category: "immersion",
    description:
      "Full-immersion brewing where coarse grounds steep in hot water before being separated by a metal mesh plunger. One of the simplest and oldest modern brewing methods.",
    brewTime: { min: 4, max: 5, unit: "minutes" },
    waterTemp: { min: 93, max: 96, unit: "C" },
    grindSize: "Coarse",
    typicalRatio: "1:15",
    caffeinePerServing: { min: 80, max: 135, unit: "mg" },
    tdsRange: { min: 1.15, max: 1.45 },
    extractionYield: { min: 18, max: 22 },
    bodyLevel: 8,
    acidityLevel: 4,
    clarityLevel: 3,
    oilContent: "high",
    cafestolLevel: "high",
    filterType: "metal",
    inventedYear: 1929,
    origin: "France / Italy",
    servingSize: 240,
    scienceNotes: [
      {
        fact: "Metal mesh filters allow coffee oils (diterpenes: cafestol and kahweol) to pass into the brew. Cafestol is the most potent cholesterol-raising compound in the human diet.",
        source:
          "Urgert & Katan, Annual Review of Nutrition, 1997",
        year: 1997,
      },
      {
        fact: "Immersion brewing produces lower extraction efficiency compared to percolation methods because the concentration gradient decreases as the water becomes saturated.",
        source:
          "Moroney et al., Chemical Engineering Science, 2015",
        year: 2015,
      },
      {
        fact: "French press coffee contains 6-8 mg of cafestol per cup compared to near-zero in paper-filtered coffee.",
        source:
          "Gross et al., Journal of Internal Medicine, 1997",
        year: 1997,
      },
    ],
    healthNotes: [
      {
        claim:
          "May raise LDL cholesterol by 6-8% with regular consumption (5+ cups/day)",
        evidence:
          "Cafestol in unfiltered coffee upregulates cholesterol synthesis via FXR pathway",
        source:
          "Ricketts et al., Molecular Endocrinology, 2007",
      },
      {
        claim: "Rich in antioxidants including chlorogenic acids",
        evidence:
          "Full-immersion methods extract significant polyphenols; however, some are lost to grounds sediment",
        source:
          "Niseteo et al., Food Chemistry, 2012",
      },
    ],
    flavorProfile: {
      sweetness: 4,
      bitterness: 6,
      acidity: 4,
      body: 8,
      complexity: 6,
    },
    environmentalImpact: {
      wasteType: "Compostable grounds only",
      energyUse: "low",
      waterEfficiency: "moderate",
    },
  },
  {
    id: "pour-over",
    name: "Pour Over (V60)",
    icon: "☕",
    category: "percolation",
    description:
      "Gravity-driven percolation method where hot water is poured over a bed of medium-fine grounds in a paper-lined cone. Produces a clean, nuanced cup.",
    brewTime: { min: 2.5, max: 4, unit: "minutes" },
    waterTemp: { min: 90, max: 96, unit: "C" },
    grindSize: "Medium-Fine",
    typicalRatio: "1:16",
    caffeinePerServing: { min: 80, max: 120, unit: "mg" },
    tdsRange: { min: 1.2, max: 1.45 },
    extractionYield: { min: 19, max: 23 },
    bodyLevel: 4,
    acidityLevel: 7,
    clarityLevel: 9,
    oilContent: "very low",
    cafestolLevel: "negligible",
    filterType: "paper",
    inventedYear: 1908,
    origin: "Germany (Melitta Bentz)",
    servingSize: 240,
    scienceNotes: [
      {
        fact: "Paper filters remove virtually all diterpenes (cafestol/kahweol) and most coffee oils, producing a clean cup with lower lipid content.",
        source:
          "Urgert et al., Journal of Agricultural and Food Chemistry, 1995",
        year: 1995,
      },
      {
        fact: "Percolation brewing maintains a high concentration gradient as fresh water continuously contacts grounds, leading to higher extraction efficiency than immersion methods.",
        source:
          "Moroney et al., Chemical Engineering Science, 2015",
        year: 2015,
      },
      {
        fact: "Pour rate and turbulence significantly affect extraction. A 2020 study found that controlled agitation can increase extraction yield by 1-2% without over-extraction.",
        source:
          "Cameron et al., Matter, 2020",
        year: 2020,
      },
    ],
    healthNotes: [
      {
        claim:
          "Filtered coffee associated with 15% lower all-cause mortality vs. unfiltered",
        evidence:
          "20-year Norwegian cohort study (n=508,747) found paper-filtered coffee drinkers had the lowest cardiovascular mortality",
        source:
          "Tverdal et al., European Journal of Preventive Cardiology, 2020",
      },
      {
        claim:
          "High chlorogenic acid retention supports antioxidant activity",
        evidence:
          "Paper filtration retains most water-soluble antioxidants while removing lipid-soluble compounds",
        source:
          "Niseteo et al., Food Chemistry, 2012",
      },
    ],
    flavorProfile: {
      sweetness: 6,
      bitterness: 4,
      acidity: 7,
      body: 4,
      complexity: 8,
    },
    environmentalImpact: {
      wasteType: "Compostable paper filter + grounds",
      energyUse: "low",
      waterEfficiency: "high",
    },
  },
  {
    id: "espresso",
    name: "Espresso",
    icon: "☕",
    category: "pressure",
    description:
      "High-pressure (9 bar) extraction forcing near-boiling water through a tightly packed puck of finely ground coffee. Produces a concentrated shot with crema.",
    brewTime: { min: 0.4, max: 0.5, unit: "minutes" },
    waterTemp: { min: 90, max: 96, unit: "C" },
    grindSize: "Very Fine",
    typicalRatio: "1:2",
    caffeinePerServing: { min: 63, max: 80, unit: "mg" },
    tdsRange: { min: 8, max: 12 },
    extractionYield: { min: 18, max: 22 },
    bodyLevel: 10,
    acidityLevel: 5,
    clarityLevel: 5,
    oilContent: "high",
    cafestolLevel: "moderate",
    filterType: "metal",
    inventedYear: 1884,
    origin: "Italy (Angelo Moriondo patent)",
    servingSize: 30,
    scienceNotes: [
      {
        fact: "Espresso extraction is a complex multiphase process. At 9 bar, water acts as a supercritical-like solvent, extracting compounds not accessible at atmospheric pressure.",
        source:
          "Albanese et al., Journal of Food Engineering, 2009",
        year: 2009,
      },
      {
        fact: "Despite higher TDS concentration, a single espresso shot contains less total caffeine than a cup of drip coffee due to the much smaller serving size (30 mL vs 240 mL).",
        source:
          "McCusker et al., Journal of Analytical Toxicology, 2003",
        year: 2003,
      },
      {
        fact: "Crema is an emulsion of CO2 gas, water, and coffee oils stabilized by melanoidins and proteins. It forms only under pressurized extraction.",
        source:
          "Illy & Viani, Espresso Coffee: The Science of Quality, 2005",
        year: 2005,
      },
    ],
    healthNotes: [
      {
        claim:
          "Moderate cafestol per serving due to small volume, but multiple daily shots accumulate",
        evidence:
          "Single espresso contains ~1.5 mg cafestol; 4 daily shots approximate unfiltered coffee levels",
        source:
          "Urgert & Katan, Annual Review of Nutrition, 1997",
      },
      {
        claim:
          "High concentration of bioactive melanoidins with antioxidant properties",
        evidence:
          "Maillard reaction products formed during roasting are concentrated in espresso and demonstrate free-radical scavenging",
        source:
          "Borrelli et al., Journal of Agricultural and Food Chemistry, 2002",
      },
    ],
    flavorProfile: {
      sweetness: 5,
      bitterness: 7,
      acidity: 5,
      body: 10,
      complexity: 7,
    },
    environmentalImpact: {
      wasteType: "Compostable puck",
      energyUse: "high",
      waterEfficiency: "high",
    },
  },
  {
    id: "aeropress",
    name: "AeroPress",
    icon: "🔽",
    category: "hybrid",
    description:
      "Hybrid immersion-pressure method using a plastic chamber with a paper or metal filter. Manual plunger creates ~0.35-0.7 bar of pressure. Extremely versatile.",
    brewTime: { min: 1, max: 2.5, unit: "minutes" },
    waterTemp: { min: 80, max: 96, unit: "C" },
    grindSize: "Fine to Medium",
    typicalRatio: "1:12 to 1:16",
    caffeinePerServing: { min: 50, max: 120, unit: "mg" },
    tdsRange: { min: 1.2, max: 1.6 },
    extractionYield: { min: 17, max: 23 },
    bodyLevel: 6,
    acidityLevel: 5,
    clarityLevel: 7,
    oilContent: "low",
    cafestolLevel: "negligible",
    filterType: "paper",
    inventedYear: 2005,
    origin: "USA (Alan Adler)",
    servingSize: 220,
    scienceNotes: [
      {
        fact: "The AeroPress combines immersion steeping with pressure-assisted percolation. The mild pressure (~0.35-0.7 bar) shortens brew time while achieving comparable extraction to longer methods.",
        source:
          "Gloess et al., European Food Research and Technology, 2013",
        year: 2013,
      },
      {
        fact: "Lower water temperature (recommended 80-85 C for some recipes) extracts fewer bitter compounds while retaining fruity and floral volatiles.",
        source:
          "Andueza et al., Journal of the Science of Food and Agriculture, 2003",
        year: 2003,
      },
      {
        fact: "Paper micro-filters in the AeroPress remove nearly all diterpenes and fine sediment, producing a cup chemically similar to pour-over despite the different mechanism.",
        source:
          "Fuller & Rao, Scientific Reports, 2017",
        year: 2017,
      },
    ],
    healthNotes: [
      {
        claim:
          "Very low cafestol when using paper filters, comparable to pour-over",
        evidence:
          "Paper micro-filter effectively removes >95% of diterpenes from the brew",
        source:
          "Urgert et al., J. Agric. Food Chem., 1995",
      },
      {
        claim:
          "Variable caffeine depending on recipe; inverted method and longer steep times increase extraction",
        evidence:
          "Caffeine extraction is primarily governed by contact time, temperature, and grind size",
        source:
          "Gloess et al., European Food Research and Technology, 2013",
      },
    ],
    flavorProfile: {
      sweetness: 6,
      bitterness: 4,
      acidity: 5,
      body: 6,
      complexity: 7,
    },
    environmentalImpact: {
      wasteType: "Compostable paper filter + grounds puck",
      energyUse: "low",
      waterEfficiency: "high",
    },
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    icon: "🧊",
    category: "immersion",
    description:
      "Extended immersion of coarse grounds in cold or room-temperature water for 12-24 hours. Produces a smooth, low-acid concentrate.",
    brewTime: { min: 720, max: 1440, unit: "minutes" },
    waterTemp: { min: 2, max: 22, unit: "C" },
    grindSize: "Very Coarse",
    typicalRatio: "1:8 (concentrate)",
    caffeinePerServing: { min: 100, max: 200, unit: "mg" },
    tdsRange: { min: 1.5, max: 3.5 },
    extractionYield: { min: 13, max: 18 },
    bodyLevel: 7,
    acidityLevel: 2,
    clarityLevel: 5,
    oilContent: "moderate",
    cafestolLevel: "moderate",
    filterType: "metal",
    inventedYear: 1600,
    origin: "Japan (Kyoto-style) / Netherlands",
    servingSize: 240,
    scienceNotes: [
      {
        fact: "Cold water extraction produces 67% less titratable acidity than hot brewing. Lower temperatures fail to extract many chlorogenic acid lactones responsible for perceived sourness.",
        source:
          "Fuller & Rao, Scientific Reports, 2017",
        year: 2017,
      },
      {
        fact: "Despite lower acidity, cold brew pH (4.85-5.13) is only slightly higher than hot brew (4.85-5.10). The reduced perceived acidity is due to fewer acid compounds, not necessarily higher pH.",
        source:
          "Fuller & Rao, Scientific Reports, 2017",
        year: 2017,
      },
      {
        fact: "Cold brew has lower total antioxidant activity than hot brew, likely because heat is needed to extract certain polyphenolic compounds.",
        source:
          "Fuller & Rao, Scientific Reports, 2017",
        year: 2017,
      },
    ],
    healthNotes: [
      {
        claim:
          "Lower acidity may benefit those with gastroesophageal reflux (GERD)",
        evidence:
          "Fewer acid compounds are extracted at low temperatures, potentially reducing gastric irritation",
        source:
          "Rao & Fuller, Scientific Reports, 2018",
      },
      {
        claim:
          "Higher caffeine per serving when consumed as undiluted concentrate",
        evidence:
          "Extended steep time maximizes caffeine extraction; concentrate form is 2-3x more caffeinated per mL",
        source:
          "Angeloni et al., Food Research International, 2019",
      },
    ],
    flavorProfile: {
      sweetness: 7,
      bitterness: 3,
      acidity: 2,
      body: 7,
      complexity: 4,
    },
    environmentalImpact: {
      wasteType: "Compostable grounds; no paper waste",
      energyUse: "low",
      waterEfficiency: "low",
    },
  },
  {
    id: "moka-pot",
    name: "Moka Pot",
    icon: "🫖",
    category: "pressure",
    description:
      "Stovetop pressure brewer that forces steam-pressured water (~1.5 bar) through a bed of fine grounds. Produces a strong, concentrated brew often called 'stovetop espresso'.",
    brewTime: { min: 3, max: 5, unit: "minutes" },
    waterTemp: { min: 95, max: 100, unit: "C" },
    grindSize: "Fine",
    typicalRatio: "1:7",
    caffeinePerServing: { min: 100, max: 130, unit: "mg" },
    tdsRange: { min: 3, max: 6 },
    extractionYield: { min: 19, max: 24 },
    bodyLevel: 8,
    acidityLevel: 4,
    clarityLevel: 4,
    oilContent: "high",
    cafestolLevel: "high",
    filterType: "metal",
    inventedYear: 1933,
    origin: "Italy (Alfonso Bialetti)",
    servingSize: 60,
    scienceNotes: [
      {
        fact: "Moka pot operates at approximately 1.5 bar, far below espresso's 9 bar. This lower pressure produces a different extraction profile: more bitter compounds, fewer emulsified oils, and no crema.",
        source:
          "Navarini et al., Food Chemistry, 2009",
        year: 2009,
      },
      {
        fact: "The final phase of moka brewing extracts water at near-boiling temperatures, which over-extracts bitter and astringent compounds. Removing from heat early improves cup quality.",
        source:
          "Gloess et al., European Food Research and Technology, 2013",
        year: 2013,
      },
      {
        fact: "Metal filter basket allows all oils and fine particles through, resulting in cafestol levels comparable to French press per mL of brew.",
        source:
          "Gross et al., Journal of Internal Medicine, 1997",
        year: 1997,
      },
    ],
    healthNotes: [
      {
        claim:
          "High cafestol content similar to French press due to metal filtration",
        evidence:
          "Unfiltered brewing methods consistently show elevated diterpene levels",
        source:
          "Urgert & Katan, Annual Review of Nutrition, 1997",
      },
      {
        claim:
          "Potential furan exposure from high-temperature extraction",
        evidence:
          "Furan (a possible carcinogen) forms at high temperatures; moka pot near-boiling extraction may increase levels",
        source:
          "Zoller et al., Food Additives & Contaminants, 2007",
      },
    ],
    flavorProfile: {
      sweetness: 3,
      bitterness: 8,
      acidity: 4,
      body: 8,
      complexity: 5,
    },
    environmentalImpact: {
      wasteType: "Compostable grounds only; durable aluminum/steel device",
      energyUse: "moderate",
      waterEfficiency: "high",
    },
  },
  {
    id: "turkish",
    name: "Turkish / Ibrik",
    icon: "☕",
    category: "immersion",
    description:
      "Ultra-fine grounds simmered in a small pot (cezve/ibrik) with water, often with sugar. The grounds are not filtered out - they settle in the cup.",
    brewTime: { min: 2, max: 4, unit: "minutes" },
    waterTemp: { min: 95, max: 100, unit: "C" },
    grindSize: "Extra Fine (powder)",
    typicalRatio: "1:10",
    caffeinePerServing: { min: 50, max: 65, unit: "mg" },
    tdsRange: { min: 2, max: 4 },
    extractionYield: { min: 20, max: 26 },
    bodyLevel: 9,
    acidityLevel: 3,
    clarityLevel: 1,
    oilContent: "very high",
    cafestolLevel: "very high",
    filterType: "none",
    inventedYear: 1450,
    origin: "Ottoman Empire (modern Turkey)",
    servingSize: 65,
    scienceNotes: [
      {
        fact: "Turkish coffee achieves one of the highest extraction yields of any method due to the extremely fine grind (powder-like) maximizing surface area for dissolution.",
        source:
          "Petracco, Coffee: Recent Developments (Blackwell Science), 2001",
        year: 2001,
      },
      {
        fact: "The lack of any filtration means all coffee lipids, fine particles, and suspended solids remain in the cup, producing the highest cafestol content of any common brewing method.",
        source:
          "Urgert & Katan, Annual Review of Nutrition, 1997",
        year: 1997,
      },
      {
        fact: "Near-boiling temperatures combined with very fine grounds can lead to over-extraction of bitter compounds, which is traditionally balanced by adding sugar during brewing.",
        source:
          "Illy & Viani, Espresso Coffee: The Science of Quality, 2005",
        year: 2005,
      },
    ],
    healthNotes: [
      {
        claim:
          "Highest cafestol content of all common brewing methods per serving",
        evidence:
          "Complete absence of filtration allows maximum diterpene passage into the cup",
        source:
          "Urgert & Katan, Annual Review of Nutrition, 1997",
      },
      {
        claim:
          "Rich in melanoidins and chlorogenic acids despite small serving size",
        evidence:
          "High extraction yield concentrates bioactive compounds; antioxidant density is very high per mL",
        source:
          "Borrelli et al., J. Agric. Food Chem., 2002",
      },
    ],
    flavorProfile: {
      sweetness: 3,
      bitterness: 7,
      acidity: 3,
      body: 9,
      complexity: 6,
    },
    environmentalImpact: {
      wasteType: "Grounds consumed with coffee; minimal waste",
      energyUse: "moderate",
      waterEfficiency: "high",
    },
  },
  {
    id: "siphon",
    name: "Siphon / Vacuum",
    icon: "🔬",
    category: "hybrid",
    description:
      "Theatrical brewing method using two chambers and vapor pressure. Water rises to an upper chamber for immersion brewing, then filters back down through a cloth or metal filter as it cools.",
    brewTime: { min: 3, max: 5, unit: "minutes" },
    waterTemp: { min: 90, max: 94, unit: "C" },
    grindSize: "Medium",
    typicalRatio: "1:15",
    caffeinePerServing: { min: 80, max: 120, unit: "mg" },
    tdsRange: { min: 1.2, max: 1.5 },
    extractionYield: { min: 18, max: 22 },
    bodyLevel: 5,
    acidityLevel: 6,
    clarityLevel: 7,
    oilContent: "low",
    cafestolLevel: "low",
    filterType: "cloth",
    inventedYear: 1840,
    origin: "Germany (Loeff of Berlin)",
    servingSize: 240,
    scienceNotes: [
      {
        fact: "Vacuum brewing maintains a remarkably stable extraction temperature (~92 C) because the boiling point depression in the upper chamber regulates temperature naturally.",
        source:
          "Wellinger et al., Journal of Agricultural and Food Chemistry, 2017",
        year: 2017,
      },
      {
        fact: "Cloth filters provide intermediate filtration between paper (high) and metal (low), allowing some oils through while trapping most fine particles.",
        source:
          "Gloess et al., European Food Research and Technology, 2013",
        year: 2013,
      },
      {
        fact: "The rapid cooling and vacuum draw-down can preserve volatile aromatic compounds that are often lost to evaporation in open brewing methods.",
        source:
          "Mestdagh et al., Food Chemistry, 2014",
        year: 2014,
      },
    ],
    healthNotes: [
      {
        claim:
          "Moderate oil and cafestol content depending on filter type",
        evidence:
          "Cloth filters allow partial lipid passage; paper siphon filters approach pour-over levels",
        source:
          "Urgert et al., J. Agric. Food Chem., 1995",
      },
      {
        claim:
          "Temperature stability may optimize chlorogenic acid extraction",
        evidence:
          "Consistent 92 C extraction avoids thermal degradation of heat-sensitive antioxidants",
        source:
          "Wellinger et al., J. Agric. Food Chem., 2017",
      },
    ],
    flavorProfile: {
      sweetness: 6,
      bitterness: 4,
      acidity: 6,
      body: 5,
      complexity: 8,
    },
    environmentalImpact: {
      wasteType: "Reusable cloth filter + compostable grounds",
      energyUse: "moderate",
      waterEfficiency: "moderate",
    },
  },
];

export function getMethodById(id: string): BrewingMethod | undefined {
  return brewingMethods.find((m) => m.id === id);
}

export function generateComparison(
  methodA: BrewingMethod,
  methodB: BrewingMethod
): ComparisonInsight[] {
  const insights: ComparisonInsight[] = [];

  // Extraction comparison
  const extractionDiff =
    (methodA.extractionYield.max + methodA.extractionYield.min) / 2 -
    (methodB.extractionYield.max + methodB.extractionYield.min) / 2;
  insights.push({
    dimension: "Extraction Yield",
    category: "chemistry",
    methodAValue: `${methodA.extractionYield.min}-${methodA.extractionYield.max}%`,
    methodBValue: `${methodB.extractionYield.min}-${methodB.extractionYield.max}%`,
    explanation:
      Math.abs(extractionDiff) < 1
        ? `Both methods achieve similar extraction yields. The SCA recommends 18-22% as the ideal range.`
        : `${extractionDiff > 0 ? methodA.name : methodB.name} achieves higher extraction, meaning more soluble compounds dissolve into the brew. This affects flavor intensity and complexity.`,
    winner: Math.abs(extractionDiff) < 1 ? "tie" : extractionDiff > 0 ? "A" : "B",
    significance: Math.abs(extractionDiff) < 1 ? "low" : Math.abs(extractionDiff) < 3 ? "moderate" : "high",
  });

  // TDS comparison
  const tdsAvgA = (methodA.tdsRange.min + methodA.tdsRange.max) / 2;
  const tdsAvgB = (methodB.tdsRange.min + methodB.tdsRange.max) / 2;
  const tdsDiff = tdsAvgA - tdsAvgB;
  insights.push({
    dimension: "Total Dissolved Solids (Strength)",
    category: "chemistry",
    methodAValue: `${methodA.tdsRange.min}-${methodA.tdsRange.max}%`,
    methodBValue: `${methodB.tdsRange.min}-${methodB.tdsRange.max}%`,
    explanation: `TDS measures brew strength. ${Math.abs(tdsDiff) < 0.5 ? "Both methods produce similar strength." : `${tdsDiff > 0 ? methodA.name : methodB.name} produces a more concentrated brew.`} The SCA gold cup standard targets 1.15-1.35% for drip coffee.`,
    winner: Math.abs(tdsDiff) < 0.5 ? "tie" : tdsDiff > 0 ? "A" : "B",
    significance: Math.abs(tdsDiff) < 0.5 ? "low" : Math.abs(tdsDiff) < 2 ? "moderate" : "high",
  });

  // Cafestol / cholesterol
  const cafestolOrder = ["negligible", "low", "moderate", "high", "very high"];
  const cafA = cafestolOrder.indexOf(methodA.cafestolLevel);
  const cafB = cafestolOrder.indexOf(methodB.cafestolLevel);
  const cafDiff = cafA - cafB;
  insights.push({
    dimension: "Cafestol (Cholesterol Impact)",
    category: "health",
    methodAValue: methodA.cafestolLevel,
    methodBValue: methodB.cafestolLevel,
    explanation:
      cafDiff === 0
        ? "Both methods have similar cafestol levels. Cafestol is a diterpene that can raise LDL cholesterol (Urgert & Katan, 1997)."
        : `${cafDiff > 0 ? methodA.name : methodB.name} has higher cafestol levels. Paper filtration removes ~95% of cafestol. ${cafDiff > 0 ? methodB.name : methodA.name}'s ${cafDiff > 0 ? methodB.filterType : methodA.filterType} filter provides better removal.`,
    winner: cafDiff === 0 ? "tie" : cafDiff < 0 ? "A" : "B",
    significance: Math.abs(cafDiff) <= 1 ? "low" : Math.abs(cafDiff) <= 2 ? "moderate" : "high",
  });

  // Caffeine
  const caffAvgA = (methodA.caffeinePerServing.min + methodA.caffeinePerServing.max) / 2;
  const caffAvgB = (methodB.caffeinePerServing.min + methodB.caffeinePerServing.max) / 2;
  insights.push({
    dimension: "Caffeine per Serving",
    category: "health",
    methodAValue: `${methodA.caffeinePerServing.min}-${methodA.caffeinePerServing.max} mg / ${methodA.servingSize} mL`,
    methodBValue: `${methodB.caffeinePerServing.min}-${methodB.caffeinePerServing.max} mg / ${methodB.servingSize} mL`,
    explanation: `Per typical serving, ${caffAvgA > caffAvgB ? methodA.name : methodB.name} delivers more caffeine. Note: serving sizes differ (${methodA.servingSize} mL vs ${methodB.servingSize} mL). Caffeine extraction depends on temperature, time, and grind size (McCusker et al., 2003).`,
    winner: Math.abs(caffAvgA - caffAvgB) < 10 ? "tie" : caffAvgA > caffAvgB ? "A" : "B",
    significance: Math.abs(caffAvgA - caffAvgB) < 10 ? "low" : "moderate",
  });

  // Acidity
  const acidDiff = methodA.acidityLevel - methodB.acidityLevel;
  insights.push({
    dimension: "Perceived Acidity",
    category: "sensory",
    methodAValue: `${methodA.acidityLevel}/10`,
    methodBValue: `${methodB.acidityLevel}/10`,
    explanation:
      Math.abs(acidDiff) <= 1
        ? "Both methods produce similar perceived acidity."
        : `${acidDiff > 0 ? methodA.name : methodB.name} produces higher perceived acidity. Higher extraction temperatures and percolation methods tend to extract more acidic compounds (chlorogenic acid lactones). Cold brew has ~67% less titratable acidity than hot methods (Fuller & Rao, 2017).`,
    winner: "tie",
    significance: Math.abs(acidDiff) <= 1 ? "low" : "moderate",
  });

  // Body
  const bodyDiff = methodA.bodyLevel - methodB.bodyLevel;
  insights.push({
    dimension: "Body & Mouthfeel",
    category: "sensory",
    methodAValue: `${methodA.bodyLevel}/10`,
    methodBValue: `${methodB.bodyLevel}/10`,
    explanation:
      Math.abs(bodyDiff) <= 1
        ? "Both methods produce similar body/mouthfeel."
        : `${bodyDiff > 0 ? methodA.name : methodB.name} produces a heavier body. Body is primarily determined by dissolved solids, suspended particles, and emulsified oils. Metal/no filtration retains more oils and fines, increasing perceived body.`,
    winner: "tie",
    significance: Math.abs(bodyDiff) <= 1 ? "low" : "moderate",
  });

  // Clarity
  const clarityDiff = methodA.clarityLevel - methodB.clarityLevel;
  insights.push({
    dimension: "Cup Clarity",
    category: "sensory",
    methodAValue: `${methodA.clarityLevel}/10`,
    methodBValue: `${methodB.clarityLevel}/10`,
    explanation:
      Math.abs(clarityDiff) <= 1
        ? "Both methods produce similar cup clarity."
        : `${clarityDiff > 0 ? methodA.name : methodB.name} produces a cleaner, more transparent cup. Paper filters remove oils and fine particles, increasing clarity. Metal filters and unfiltered methods allow more sediment through.`,
    winner: "tie",
    significance: Math.abs(clarityDiff) <= 1 ? "low" : "moderate",
  });

  // Environmental
  const energyOrder = ["low", "moderate", "high"];
  const eA = energyOrder.indexOf(methodA.environmentalImpact.energyUse);
  const eB = energyOrder.indexOf(methodB.environmentalImpact.energyUse);
  insights.push({
    dimension: "Environmental Impact",
    category: "practical",
    methodAValue: `Energy: ${methodA.environmentalImpact.energyUse} | ${methodA.environmentalImpact.wasteType}`,
    methodBValue: `Energy: ${methodB.environmentalImpact.energyUse} | ${methodB.environmentalImpact.wasteType}`,
    explanation: `${eA === eB ? "Similar energy usage." : `${eA < eB ? methodA.name : methodB.name} uses less energy.`} Waste profiles differ: ${methodA.name} produces ${methodA.environmentalImpact.wasteType.toLowerCase()}, while ${methodB.name} produces ${methodB.environmentalImpact.wasteType.toLowerCase()}.`,
    winner: eA === eB ? "tie" : eA < eB ? "A" : "B",
    significance: Math.abs(eA - eB) <= 0 ? "low" : "moderate",
  });

  // Brew time
  const timeAvgA = (methodA.brewTime.min + methodA.brewTime.max) / 2;
  const timeAvgB = (methodB.brewTime.min + methodB.brewTime.max) / 2;
  insights.push({
    dimension: "Brew Time",
    category: "practical",
    methodAValue: `${methodA.brewTime.min}-${methodA.brewTime.max} ${methodA.brewTime.unit}`,
    methodBValue: `${methodB.brewTime.min}-${methodB.brewTime.max} ${methodB.brewTime.unit}`,
    explanation: `${Math.abs(timeAvgA - timeAvgB) < 1 ? "Similar brew times." : `${timeAvgA < timeAvgB ? methodA.name : methodB.name} brews faster.`} Longer contact time generally increases extraction but risks over-extraction of bitter compounds.`,
    winner: Math.abs(timeAvgA - timeAvgB) < 1 ? "tie" : timeAvgA < timeAvgB ? "A" : "B",
    significance: Math.abs(timeAvgA - timeAvgB) < 1 ? "low" : Math.abs(timeAvgA - timeAvgB) < 5 ? "moderate" : "high",
  });

  return insights;
}

export interface ComparisonInsight {
  dimension: string;
  category: "chemistry" | "sensory" | "health" | "practical";
  methodAValue: string;
  methodBValue: string;
  explanation: string;
  winner: "A" | "B" | "tie";
  significance: "low" | "moderate" | "high";
}
