// Orbit Dash / Orbital Workbench: full-screen game page with a DOM telemetry HUD over a Babylon canvas.
import GameCanvas from "@/components/GameCanvas";
import { OrbitAudio, type SoundEvent } from "@/game/audio";
import { ArrowLeft, RotateCcw, Trophy, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

export default function OrbitDash() {
  const [score, setScore] = useState(0); const [best, setBest] = useState(0); const [status, setStatus] = useState<"ready" | "playing" | "over">("ready"); const [soundOn, setSoundOn] = useState(false); const audio = useRef(new OrbitAudio());
  useEffect(() => () => audio.current.dispose(), []);
  const toggleSound = async () => setSoundOn(await audio.current.setEnabled(!soundOn));
  const beginRun = async () => { if (!soundOn) setSoundOn(await audio.current.setEnabled(true)); window.dispatchEvent(new KeyboardEvent("keydown", { key: " " })); };
  const instruction = status === "ready" ? "Use ↑ ↓ or W S · move pointer to fly" : status === "over" ? "Signal lost · press Space or R to restart" : "Collect fragments · clear the gates";
  return <section className="orbit-dash-page"><GameCanvas callbacks={{ onScore: (nextScore, nextBest) => { setScore(nextScore); setBest(nextBest); }, onStatus: setStatus, onSound: (event: SoundEvent) => audio.current.play(event) }} /><div className="game-hud"><div className="game-hud__top"><Link href="/games" className="game-back"><ArrowLeft size={16} /> Games bay</Link><div className="game-brand"><span className="status-dot" /> ORBIT DASH</div><div className="game-hud__actions"><button onClick={toggleSound} className={`sound-toggle ${soundOn ? "sound-toggle--on" : ""}`} aria-pressed={soundOn} aria-label={soundOn ? "Turn sound off" : "Turn sound on"}>{soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />} SOUND {soundOn ? "ON" : "OFF"}</button><div className="game-score"><span>SCORE</span><strong>{score.toString().padStart(2, "0")}</strong></div></div></div><div className="game-hud__bottom"><div className="game-instruction"><RotateCcw size={15} /><span>{instruction}</span></div><div className="best-score"><Trophy size={15} /><span>BEST {best.toString().padStart(2, "0")}</span></div></div>{status !== "playing" && <div className="game-overlay"><p className="mono-label text-[#c7f36b]">{status === "over" ? "RUN COMPLETE" : "ARCADE MODULE 01"}</p><h1 className="font-display">{status === "over" ? "Reconnect the signal." : "Thread the orbit."}</h1><p>{status === "over" ? `You locked in ${score} signal points.` : "Pass through the gates, pull in signal fragments, and keep the lane clear."}</p><button onClick={beginRun} className="signal-button">{status === "over" ? "Run again with sound" : "Start run with sound"}</button></div>}</div></section>;
}
