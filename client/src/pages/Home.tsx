// Orbital Workbench: asymmetric overview route for reliable tools and lightweight games.
import AppShell from "@/components/AppShell";
import SectionHeading from "@/components/SectionHeading";
import ToolCard from "@/components/ToolCard";
import { tools } from "@/data/toolRegistry";
import { ArrowRight, CheckCircle2, Gamepad2, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { Link } from "wouter";

const heroImage = "/manus-storage/toolbox-galaxy-hero-orbital-workbench_a8f00bb7.jpg";
const toolsImage = "/manus-storage/toolbox-galaxy-tools-station_9cc02c77.jpg";
const gamesImage = "/manus-storage/toolbox-galaxy-games-arcade_0b17d873.jpg";

export default function Home() {
  return <AppShell>
    <section className="hero-section">
      <div className="hero-copy">
        <div className="page-kicker"><span>00</span><span>YOUR BROWSER WORKBENCH</span></div>
        <h1 className="font-display mt-9 max-w-3xl text-5xl font-semibold leading-[0.93] tracking-[-0.075em] text-[#f4f2ea] sm:text-6xl lg:text-8xl">Make the small thing <em>easy.</em></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">Verified browser tools for the work in front of you, plus a quick game when your brain needs to clear the board.</p>
        <div className="mt-10 flex flex-wrap gap-3"><Link href="/tools" className="signal-button">Open verified tools <ArrowRight size={17} /></Link><Link href="/games" className="quiet-button">Explore games <Gamepad2 size={17} /></Link></div>
        <div className="hero-trust"><span><CheckCircle2 size={15} /> Local-first modules</span><span><ShieldCheck size={15} /> No legacy endpoints</span></div>
      </div>
      <div className="hero-visual"><img src={heroImage} alt="An orbital digital workbench with tools and game elements" /><div className="hero-caption"><span className="status-dot" /><span>Signal received · version 01</span></div></div>
    </section>

    <section className="page-section module-section">
      <SectionHeading eyebrow="TOOLS / READY NOW" title="A smaller set, built to hold up." copy="No mystery status. These first modules run entirely in your browser and are being rebuilt with consistent validation, accessibility, and clear privacy signals." />
      <div className="tool-grid tool-grid--featured">{tools.slice(0, 4).map((tool) => <ToolCard key={tool.slug} tool={tool} compact />)}</div>
      <Link href="/tools" className="inline-rail-link">See all verified modules <ArrowRight size={16} /></Link>
    </section>

    <section className="page-section story-split">
      <div className="story-image"><img src={toolsImage} alt="A graphic workstation of calculation and developer tool objects" /></div>
      <div className="story-copy"><p className="mono-label text-[#c7f36b]">THE REBUILD RULE</p><h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.055em] md:text-5xl">If it isn’t verified, it isn’t in the launch bay.</h2><p>Every tool is local-first wherever possible. That keeps the Hostinger deployment lighter, avoids broken inherited endpoints, and makes the expected behavior easier to test.</p><div className="story-list"><span><Wrench size={17} /> Typed tool registry</span><span><ShieldCheck size={17} /> Explicit privacy behavior</span><span><Sparkles size={17} /> Consistent interaction patterns</span></div></div>
    </section>

    <section className="page-section game-callout">
      <div className="game-art"><img src={gamesImage} alt="An abstract arcade spacecraft navigating orbit gates" /></div>
      <div className="game-copy"><p className="mono-label text-[#ff9b54]">GAMES / READY NOW</p><h2 className="font-display mt-4 text-4xl font-semibold tracking-[-0.055em] md:text-5xl">A useful pause is part of the workbench.</h2><p>Games are intentionally separate from tools: lightweight, lazy-loaded, and designed for short browser breaks. Orbit Dash, Signal Switch, and Circuit Shift keep scores in the browser and sound under your control.</p><Link href="/games" className="ember-button">Enter games bay <ArrowRight size={17} /></Link></div>
    </section>
  </AppShell>;
}
