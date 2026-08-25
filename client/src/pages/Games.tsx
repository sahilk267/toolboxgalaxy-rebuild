// Orbital Workbench: games route introduces the separate lightweight-games product lane.
import AppShell from "@/components/AppShell";
import { ArrowRight, Clock3, Gamepad2, Gauge, Trophy, Volume2 } from "lucide-react";
import { Link } from "wouter";

const gameImage = "/manus-storage/toolbox-galaxy-games-arcade_0b17d873.jpg";

export default function Games() {
  return <AppShell><section className="page-section games-page"><div className="page-kicker"><span>02</span><span>LIGHTWEIGHT GAMES BAY</span></div><div className="games-hero"><div><p className="mono-label text-[#ff9b54]">SHORT SESSIONS / LOCAL SCORE</p><h1 className="font-display mt-4 text-5xl font-semibold tracking-[-0.07em] md:text-7xl">Take a lap around the galaxy.</h1><p className="mt-6 max-w-xl text-lg leading-8 text-white/62">The games lane is being built as a separate, lazy-loaded layer so everyday tools stay focused and fast.</p></div><img src={gameImage} alt="Abstract arcade spacecraft gameplay artwork" /></div><div className="game-launch-card"><div className="game-icon"><Gamepad2 size={30} /></div><div className="flex-1"><div className="telemetry-strip"><span>FIRST PLAYABLE MODULE</span><span>LOCAL SCORE</span></div><h2 className="font-display mt-5 text-3xl font-semibold tracking-[-0.045em]">Orbit Dash</h2><p className="mt-3 max-w-xl text-white/62">Dodge orbital gates, collect signal fragments, and keep a single clean run alive. No login and no multiplayer server required.</p><div className="game-meta"><span><Clock3 size={15} /> 2–5 minute sessions</span><span><Gauge size={15} /> Keyboard + touch</span><span><Volume2 size={15} /> Opt-in sound FX</span><span><Trophy size={15} /> Browser high score</span></div></div><Link href="/games/orbit-dash" className="ember-button">Launch game <ArrowRight size={17} /></Link></div></section></AppShell>;
}
