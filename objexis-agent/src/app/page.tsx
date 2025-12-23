import Link from "next/link";
import styles from "./page.module.css";
import {
  ArrowUpRight,
  Hexagon,
  Sparkles,
  ShieldCheck,
  Orbit,
  Layers3,
  Compass,
  Scan,
  Ruler,
  Rocket,
} from "lucide-react";
import { AgentPanel } from "@/components/AgentPanel";

const heroStats = [
  {
    value: "14",
    label: "Universe Collections",
    detail: "Serialized lineups staged across future automotive worlds.",
  },
  {
    value: "120+",
    label: "Original Vehicle IPs",
    detail: "Every silhouette is authored from the ground up.",
  },
  {
    value: "3D Print",
    label: "Optimized Engineering",
    detail: "Wall thickness, modular splits, and tolerances built in.",
  },
  {
    value: "4.8M",
    label: "Voxel Fidelity",
    detail: "High-resolution surfacing for premium resin output.",
  },
];

const designPillars = [
  {
    title: "Silhouette Storytelling",
    copy:
      "Architecture-inspired forms with floating cabins, negative space windows, and kinetic light blades.",
    highlights: [
      "Tailored luxury proportions with sculpted aero layers.",
      "Ribboned light veils communicating propulsion states.",
      "Bold wheel architecture that anchors the posture.",
    ],
    Icon: Hexagon,
  },
  {
    title: "Print-Ready Precision",
    copy:
      "Each body is engineered for resin and FDM workflows with keyed assemblies and durable wall strategy.",
    highlights: [
      "Interlocking modules with hidden mechanical fasteners.",
      "Support-aware channeling for clean print orientation.",
      "Wheel systems tuned for snap-fit or magnetized hubs.",
    ],
    Icon: ShieldCheck,
  },
  {
    title: "Narrative Cohesion",
    copy:
      "Vehicles occupy a coherent Objexis universe, complete with lore, environments, and cultural rituals.",
    highlights: [
      "Collection-specific lighting languages to signal allegiance.",
      "Interior sculpting expresses the cultural ceremony.",
      "Worldbuilding decks for packaging, campaigns, and media.",
    ],
    Icon: Orbit,
  },
];

const processStages = [
  {
    step: "Phase 01",
    title: "Vision Mapping",
    description:
      "Translate narrative seeds into silhouette direction, posture guidelines, and material palettes.",
    deliverables: ["Universe manifesto", "Silhouette board", "Hero proportion sketches"],
  },
  {
    step: "Phase 02",
    title: "Digital Sculpting",
    description:
      "Create high-detail surface language, modular splits, and lighting channels inside 3D CAD pipelines.",
    deliverables: ["Parametric body kit", "Wheel + chassis system", "Light choreography map"],
  },
  {
    step: "Phase 03",
    title: "Print Validation",
    description:
      "Resolve tolerances, produce supports, and test prints to guarantee collector-grade finish and assembly.",
    deliverables: ["Print-ready meshes", "Assembly documentation", "Finishing & paint recipes"],
  },
  {
    step: "Phase 04",
    title: "Launch Narrative",
    description:
      "Build storylines, campaign imagery, and collector collateral to introduce the vehicle universe.",
    deliverables: ["Lore-driven copy decks", "Art-direction guides", "Collector packaging cues"],
  },
];

const collectionHighlights = [
  {
    name: "NovaLux Halo GT",
    tone: "Liquid metal surfacing with crystalline aero blades and cascading photon veils.",
    focus: "Built for orbital grand touring circuits with adaptive glider fins.",
    palette: "Lustre graphite, solar gold, and prismatic ice.",
  },
  {
    name: "Luminae Rift Racer",
    tone: "Split-level chassis with levitating wheel halos and neon-plasma motion signatures.",
    focus: "Optimized for nocturnal street leagues under hovering architectural skylines.",
    palette: "Deep amethyst, photon violet, apex cyan.",
  },
  {
    name: "Heliosyne Terra Scout",
    tone: "All-terrain aero petals with micro-articulated suspension pods and shielded cockpit.",
    focus: "Explores aurora deserts and off-world colonies with deployable sensor lattices.",
    palette: "Aurora ember, satin sandstone, dusk teal.",
  },
];

const serviceHighlights = [
  {
    title: "Collection Blueprinting",
    description:
      "Curate multi-vehicle lineups with shared design DNA, production-ready CAD, and serialized story arcs.",
    Icon: Layers3,
  },
  {
    title: "3D Print Systems R&D",
    description:
      "Engineer modular chassis, wheel hubs, and lighting channels tailored to resin, SLS, and FDM workflows.",
    Icon: Ruler,
  },
  {
    title: "Narrative & Campaign",
    description:
      "Deliver immersive campaign decks, launch narratives, and packaging experiences for premium collectibles.",
    Icon: Compass,
  },
];

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroBadge}>Objexis Toy Inc.</span>
          <h1>Original toy vehicles engineered for tomorrow&apos;s collectors.</h1>
          <p>
            We fuse automotive artistry, industrial design precision, and cinematic storytelling to craft
            luxury-inspired miniature vehicles ready for premium 3D printing. Every silhouette is an
            original Objexis IP with built-in narrative gravity.
          </p>
          <div className={styles.ctaRow}>
            <Link href="#agent" className={styles.primaryCta}>
              Launch the AI Agent
              <Sparkles width={16} height={16} />
            </Link>
            <Link href="#collections" className={styles.secondaryCta}>
              Explore Collections
              <ArrowUpRight width={16} height={16} />
            </Link>
          </div>
          <div className={styles.stats}>
            {heroStats.map((stat) => (
              <div key={stat.label} className={styles.statCard}>
                <span>{stat.value}</span>
                <h4>{stat.label}</h4>
                <p>{stat.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.heroVisualizer}>
          <div className={styles.vehicleAura}>
            <div className={styles.vehicleShell}>
              <div className={styles.vehicleCore} />
              <div className={styles.vehicleFin} />
              <div className={styles.vehicleLights} />
            </div>
            <div className={styles.vehicleOrbit}>
              <span />
              <span />
            </div>
          </div>
          <div className={styles.heroTagline}>
            <Rocket width={16} height={16} />
            Original Toy Vehicles for the Future
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Design Language</span>
            <h2>Collectible vehicles with uncompromising futurist DNA.</h2>
            <p>
              Objexis creates premium-grade toy automobiles with sculptural sophistication, engineered
              durability, and theatrical lighting experiences. Our design language is cohesive across
              the universe while allowing bold variations per collection.
            </p>
          </div>
          <div className={styles.pillarGrid}>
            {designPillars.map((pillar) => (
              <article key={pillar.title} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>
                  <pillar.Icon width={18} height={18} />
                </div>
                <h3>{pillar.title}</h3>
                <p>{pillar.copy}</p>
                <ul>
                  {pillar.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.processSection}`} id="process">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Studio Process</span>
            <h2>From speculative spark to print-ready iconography.</h2>
            <p>
              Our hybrid methodology balances worldbuilding, industrial design, and engineering. Each
              phase keeps the vehicle functionally printable while preserving narrative magnetism.
            </p>
          </div>
          <div className={styles.processTrack}>
            {processStages.map((stage) => (
              <article key={stage.title} className={styles.processCard}>
                <header>
                  <span>{stage.step}</span>
                  <h3>{stage.title}</h3>
                </header>
                <p>{stage.description}</p>
                <div>
                  <h4>Key Deliverables</h4>
                  <ul>
                    {stage.deliverables.map((deliverable) => (
                      <li key={deliverable}>{deliverable}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.section} id="collections">
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Signature Collections</span>
            <h2>A cohesive future automotive universe.</h2>
            <p>
              Each Objexis collection expands the brand lore with distinct environments, propulsion
              philosophies, and cultural rituals. Together they form a premium-grade ecosystem for
              collectors and storytellers.
            </p>
          </div>
          <div className={styles.collectionGrid}>
            {collectionHighlights.map((collection) => (
              <article key={collection.name} className={styles.collectionCard}>
                <header>
                  <h3>{collection.name}</h3>
                  <span>{collection.palette}</span>
                </header>
                <p>{collection.tone}</p>
                <footer>
                  <Scan width={16} height={16} />
                  {collection.focus}
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.servicesSection}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>What We Deliver</span>
            <h2>Integrated creative + fabrication support.</h2>
            <p>
              Objexis partners with visionary brands and collectors to originate vehicle IP, complete
              production toolkits, and immersive launch experiences.
            </p>
          </div>
          <div className={styles.servicesGrid}>
            {serviceHighlights.map((service) => (
              <article key={service.title} className={styles.serviceCard}>
                <div className={styles.serviceIcon}>
                  <service.Icon width={18} height={18} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.agentSection}`}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionBadge}>Interactive Intelligence</span>
            <h2>Collaborate with the Objexis AI design agent.</h2>
            <p>
              The agent synthesizes our design doctrine, collection lore, and print engineering playbooks
              to help you ideate faster. Explore new silhouettes, technical briefs, or launch narratives
              in seconds.
            </p>
          </div>
          <div className={styles.agentGrid}>
            <AgentPanel />
            <div className={styles.agentGuidance}>
              <h3>What the agent accelerates</h3>
              <ul>
                <li>
                  <Sparkles width={16} height={16} />
                  <span>Concept pitches for original Objexis-grade vehicle silhouettes.</span>
                </li>
                <li>
                  <Ruler width={16} height={16} />
                  <span>3D printing strategies with wall, support, and assembly guidance.</span>
                </li>
                <li>
                  <Orbit width={16} height={16} />
                  <span>Worldbuilding threads for serialized collections and story arcs.</span>
                </li>
                <li>
                  <Layers3 width={16} height={16} />
                  <span>Modular collection planning mapped to Objexis design DNA.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div>
          <span>Objexis Toy Inc.</span>
          <p>Original Toy Vehicles for the Future.</p>
        </div>
        <div className={styles.footerActions}>
          <Link href="#agent">
            Engage the agent
            <ArrowUpRight width={14} height={14} />
          </Link>
          <Link href="#process">
            View process
            <ArrowUpRight width={14} height={14} />
          </Link>
        </div>
      </footer>
    </div>
  );
}
