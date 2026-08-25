// Circuit Shift: DOM HUD with explicit sound consent around the standalone Babylon circuit puzzle.
import CircuitShiftCanvas from "@/components/CircuitShiftCanvas";
import { OrbitAudio, type SoundEvent } from "@/game/audio";
import type { CircuitStatus } from "@/game/circuitShift/CircuitShiftWorld";
import { ArrowLeft, CircuitBoard, RotateCcw, Trophy, Volume2, VolumeX } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";

const orbitMark = "/manus-storage/toolbox-galaxy-orbit-mark_c8160386.png";

export default function CircuitShift() {
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [moves, setMoves] = useState(0);
  const [status, setStatus] = useState<CircuitStatus>("ready");
  const [soundOn, setSoundOn] = useState(false);
  const audio = useRef(new OrbitAudio());
  useEffect(() => () => audio.current.dispose(), []);
  const toggleSound = async () => setSoundOn(await audio.current.setEnabled(!soundOn));
  const start = async () => { if (!soundOn) setSoundOn(await audio.current.setEnabled(true)); window.dispatchEvent(new KeyboardEvent("keydown", { key: " " })); };
  const instruction = status === "ready" ? "Select with arrows · Space rotates · tap tiles" : status === "solved" ? "Signal complete · press R to rebuild the board" : "Rotate tiles until the lime route reaches the output";
  return <section className="orbit-dash-page circuit-shift-page">
    <CircuitShiftCanvas callbacks={{ onScore: (next, high) => { setScore(next); setBest(high); }, onStatus: setStatus, onMoves: setMoves, onSound: (event: SoundEvent) => audio.current.play(event) }} />
    <div className="game-hud">
      <div className="game-hud__top">
        <Link href="/games" className="game-back"><ArrowLeft size={16} /> Games bay</Link>
        <div className="game-brand game-brand--circuit"><img src={orbitMark} alt="" /><span><b>Toolbox Galaxy</b><small>Games Bay / Module 03</small></span><i><CircuitBoard size={13} /> Circuit Shift</i></div>
        <div className="game-hud__actions"><button onClick={toggleSound} className={`sound-toggle ${soundOn ? "sound-toggle--on" : ""}`} aria-pressed={soundOn} aria-label={soundOn ? "Turn sound off" : "Turn sound on"}>{soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />} SOUND {soundOn ? "ON" : "OFF"}</button><div className="game-score"><span>MOVES</span><strong>{moves.toString().padStart(2, "0")}</strong></div><div className="game-score"><span>SCORE</span><strong>{score.toString().padStart(3, "0")}</strong></div></div>
      </div>
      <div className="game-hud__bottom"><div className="game-instruction"><RotateCcw size={15} /><span>{instruction}</span></div><div className="best-score"><Trophy size={15} /><span>BEST {best.toString().padStart(3, "0")}</span></div></div>
      {status !== "playing" && <div className="game-overlay"><p className="mono-label text-[#c7f36b]">{status === "solved" ? "OUTPUT CONNECTED" : "ARCADE MODULE 03"}</p><h1 className="font-display">{status === "solved" ? "Signal received." : "Close the circuit."}</h1><p>{status === "solved" ? `Solved in ${moves} moves. Reset the board to chase a cleaner route.` : "Rotate relay tiles to power a continuous lime path from input to output."}</p><button onClick={start} className="signal-button">{status === "solved" ? "Reset board with sound" : "Start board with sound"}</button></div>}
    </div>
  </section>;
}
