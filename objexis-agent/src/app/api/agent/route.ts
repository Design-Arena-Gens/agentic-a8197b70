import { NextResponse } from "next/server";

type Role = "user" | "assistant";

type HistoryTurn = {
  role: Role;
  content: string;
};

type KnowledgeEntry = {
  title: string;
  excerpt: string;
  keywords: string[];
  pillars: string[];
  tone: string;
};

const knowledgeBase: KnowledgeEntry[] = [
  {
    title: "Objexis Design DNA",
    excerpt:
      "Iconic silhouettes with architectural surfacing, floating cabins, and jewel-like lighting signatures.",
    keywords: [
      "design language",
      "silhouette",
      "signature",
      "lighting",
      "surfacing",
      "form",
      "floating cabin",
    ],
    pillars: [
      "Balance luxury-inspired proportions with future-tech expression.",
      "Celebrate negative space with suspended cabins and layered aero planes.",
      "Integrate theatrical lighting channels that double as narrative cues.",
    ],
    tone: "Sculptural precision meets cinematic futurism.",
  },
  {
    title: "Print-Ready Engineering",
    excerpt:
      "Durable wall thicknesses, modular assemblies, and tolerances optimized for resin and FDM workflows.",
    keywords: [
      "3d print",
      "print",
      "manufacturing",
      "tolerances",
      "support",
      "assembly",
      "durability",
      "material",
    ],
    pillars: [
      "Maintain a 1.3-1.8 mm wall thickness baseline for exteriors.",
      "Split bodies into interlocking quadrants with keyed sockets for seamless bonding.",
      "Design wheel wells and lighting channels to print without additional supports when oriented correctly.",
    ],
    tone: "Engineering quiet luxury into dependable, repeatable prints.",
  },
  {
    title: "Collection Worldbuilding",
    excerpt:
      "Every lineup lives inside a cohesive fiction: orbital grand tours, luminescent street leagues, or desert aurora rallies.",
    keywords: [
      "collection",
      "universe",
      "lore",
      "story",
      "narrative",
      "world",
      "campaign",
      "brand",
    ],
    pillars: [
      "Define atmospheric environments, from mirror-glass megacities to abyssal docking bays.",
      "Develop signature energy sources and propulsion cues expressed through lighting and surface transitions.",
      "Tie wheel architecture and interior geometry to a cultural ritual or narrative moment.",
    ],
    tone: "Emotionally rich, serialized storytelling for collectors.",
  },
  {
    title: "Signature Collections",
    excerpt:
      "NovaLux hyper GTs, Luminae nocturnal racers, and Heliosyne off-world exploration fleet set the creative benchmarks.",
    keywords: [
      "novalux",
      "luminae",
      "heliosyne",
      "collection",
      "line",
      "series",
      "skyluxe",
      "atlas",
    ],
    pillars: [
      "NovaLux: liquid metal surfacing with kinetic crystal lighting veils.",
      "Luminae: split-level chassis with levitating wheel halos for aggressive street silhouettes.",
      "Heliosyne: adaptive geometry with deployable aero petals for multi-terrain missions.",
    ],
    tone: "A repertoire of tomorrow's icons, each with distinct posture.",
  },
];

const creativeAdjectives = [
  "liquid-laminar",
  "holographic",
  "architectural",
  "kinetic",
  "halo-bent",
  "plasma-cooled",
  "aerostatic",
];

const vehicleArchetypes = [
  "hyper grand tourer",
  "urban glider",
  "dynastic racer",
  "gravity-skimming cruiser",
  "collector-grade halo car",
  "modular scout rover",
  "aerofoil roadster",
];

const collectionEnvironments = [
  "suspended expressways above bioluminescent oceans",
  "orbital night markets orbiting a twin-moon colony",
  "mirror dunes charged with aurora storms",
  "subterranean skylight caverns filled with reflective fog",
  "vertical racing spires slicing through megacity skylines",
];

const printRecommendations = [
  "Orient the chassis at a 35° angle to preserve leading-edge fidelity without sacrificial supports.",
  "Use a two-part snap tab beneath the cockpit to lock the upper shell without adhesives.",
  "Hollow the interior down to 1.2 mm walls with relief escape valves hidden behind the diffuser.",
  "Embed channels for 1.5 mm fiber optic strands to deliver dramatic lighting after assembly.",
];

const storyBeats = [
  "Each vehicle carries an onboard archive crystal that records pivotal races for future generations.",
  "The propulsion core is tuned to the culture's ceremonial frequencies, creating a resonant glow.",
  "Modular aero petals deploy in response to the city's evolving microclimates.",
  "Wheel halos act as diplomatic signatures, glowing differently when entering allied or rival territories.",
  "Cockpit interiors double as gallery spaces for collectible memory artifacts.",
];

function normalize(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreEntry(message: string, entry: KnowledgeEntry) {
  const normalizedMessage = normalize(message);
  let score = 0;
  for (const keyword of entry.keywords) {
    if (normalizedMessage.includes(keyword)) {
      score += 3;
    }
  }

  const titleTokens = entry.title.toLowerCase().split(" ");
  titleTokens.forEach((token) => {
    if (normalizedMessage.includes(token)) {
      score += 0.5;
    }
  });

  return score;
}

function pick<T>(list: T[], amount = 1): T[] {
  const copy = [...list];
  const picks: T[] = [];
  while (copy.length && picks.length < amount) {
    const index = Math.floor(Math.random() * copy.length);
    picks.push(copy.splice(index, 1)[0]);
  }
  return picks;
}

function buildConceptResponse(
  prompt: string,
  matched: KnowledgeEntry[],
  history: HistoryTurn[],
) {
  const adjectives = pick(creativeAdjectives, 2).join(" & ");
  const archetype = pick(vehicleArchetypes, 1)[0];
  const environment = pick(collectionEnvironments, 1)[0];
  const narrativeBeat = pick(storyBeats, 1)[0];
  const printNotes = pick(printRecommendations, 2);

  const dna = matched.find((entry) => entry.title === "Objexis Design DNA") ?? matched[0];
  const contextTail = history
    .slice(-2)
    .map((turn) => `${turn.role === "user" ? "You" : "Agent"}: ${turn.content}`)
    .join(" • ");

  const header = `### Concept: ${adjectives} ${archetype}`;
  const synopsis = `Inspired by ${dna?.tone ?? "our design language"}, this response evolves your prompt into a collectible-ready vision. The vehicle is choreographed for ${environment}.`;

  const exterior = [
    "Exterior Sculpting",
    `A flowing triple-tier silhouette with ${adjectives} surfacing. Layered aero planes float off the main fuselage creating negative space windows that channel light directly into the cabin.`,
  ];

  const lighting = [
    "Signature Lighting",
    `Ribboned photon veins trace along the beltline, shifting hues to signal propulsion states. Leading-edge blades frame the wheels, echoing ${narrativeBeat.toLowerCase()}.`,
  ];

  const interior = [
    "Interior & Experience",
    "A suspended capsule cockpit wrapped in translucent shielding panels. Seat shells pivot outward for display-mode staging, while embedded memory shards narrate the vehicle's origin story.",
  ];

  const printing = ["3D Print Strategy", `- ${printNotes.join("\n- ")}`];

  const dnaList = dna?.pillars
    .map((pillar) => `- ${pillar}`)
    .join("\n")
    .trim();

  const sections = [
    header,
    synopsis,
    `**Design DNA Anchors**\n${dnaList}`,
    `**${exterior[0]}**\n${exterior[1]}`,
    `**${lighting[0]}**\n${lighting[1]}`,
    `**${interior[0]}**\n${interior[1]}`,
    `**${printing[0]}**\n${printing[1]}`,
  ];

  if (contextTail) {
    sections.push(`**Conversation Context**\n${contextTail}`);
  }

  return sections.join("\n\n");
}

function buildStrategyResponse(prompt: string, matched: KnowledgeEntry[]) {
  const engineering = matched.find((entry) => entry.title === "Print-Ready Engineering");
  const storytelling = matched.find((entry) => entry.title === "Collection Worldbuilding");
  const dna = matched.find((entry) => entry.title === "Objexis Design DNA");

  const lines: string[] = [];
  if (engineering) {
    lines.push(`**Print Engineering Priorities**\n${engineering.pillars.map((item) => `- ${item}`).join("\n")}`);
  }
  if (storytelling) {
    lines.push(
      `**Worldbuilding Hooks**\n${storytelling.pillars
        .slice(0, 2)
        .map((item) => `- ${item}`)
        .join("\n")}`,
    );
  }
  if (dna) {
    lines.push(`**Design Consistency**\n- ${dna.tone}\n- ${dna.pillars[0]}`);
  }
  lines.push(
    "**Next Actions**\n- Prepare greybox volumes in CAD with modular separation lines.\n- Prototype lighting channels using translucent resin inserts.\n- Draft a narrative capsule summarising the vehicle's universe placement.",
  );
  return lines.join("\n\n");
}

function buildDefaultResponse(prompt: string, matched: KnowledgeEntry[]) {
  const dna = matched.slice(0, 2).map((entry) => `- ${entry.title}: ${entry.excerpt}`);
  return [
    "Objexis approaches every toy vehicle as an original collectible fused with futurist engineering.",
    "Here's how we can move your idea forward:",
    dna.join("\n"),
    "**How to collaborate with the agent**\n- Ask for a concept pitch with desired themes or materials.\n- Request a print feasibility breakdown for resin or FDM workflows.\n- Explore worldbuilding to connect vehicles into a unified universe.",
  ].join("\n\n");
}

function determineMode(prompt: string) {
  const normalized = normalize(prompt);
  const conceptKeywords = ["design", "concept", "vehicle", "car", "create", "invent", "hypercar", "sketch"];
  const strategyKeywords = ["print", "manufacture", "workflow", "strategy", "process", "pipeline", "plan"];

  if (conceptKeywords.some((word) => normalized.includes(word))) {
    return "concept";
  }

  if (strategyKeywords.some((word) => normalized.includes(word))) {
    return "strategy";
  }

  return "default";
}

export async function POST(request: Request) {
  try {
    const { message, history = [] }: { message?: string; history?: HistoryTurn[] } = await request.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const matchedEntries = knowledgeBase
      .map((entry) => ({ entry, score: scoreEntry(message, entry) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.entry);

    const fallbackEntries = matchedEntries.length ? matchedEntries : knowledgeBase.slice(0, 2);
    const mode = determineMode(message);

    let reply: string;
    if (mode === "concept") {
      reply = buildConceptResponse(message, fallbackEntries, history);
    } else if (mode === "strategy") {
      reply = buildStrategyResponse(message, fallbackEntries);
    } else {
      reply = buildDefaultResponse(message, fallbackEntries);
    }

    const sources = fallbackEntries.slice(0, 3).map((entry) => ({
      title: entry.title,
      excerpt: entry.excerpt,
    }));

    return NextResponse.json({ reply, sources });
  } catch (error) {
    console.error("Agent route error", error);
    return NextResponse.json({ error: "Agent is currently unavailable." }, { status: 500 });
  }
}
