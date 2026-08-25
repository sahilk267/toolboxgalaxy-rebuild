// Orbit Dash: compact synthesized effects; audio is never started until the player explicitly enables it.
export type SoundEvent = "start" | "fragment" | "gate" | "collision" | "toggle";

export class OrbitAudio {
  private context: AudioContext | null = null;
  private enabled = false;

  private getContext() {
    this.context ??= new AudioContext();
    return this.context;
  }

  async setEnabled(next: boolean) {
    this.enabled = next;
    if (!next) { await this.context?.suspend(); return false; }
    const context = this.getContext();
    if (context.state === "suspended") await context.resume();
    this.play("toggle");
    return true;
  }

  play(event: SoundEvent) {
    if (!this.enabled) return;
    const context = this.getContext();
    const tones: Record<SoundEvent, Array<[number, number, OscillatorType, number]>> = {
      start: [[310, 0.08, "triangle", 0], [470, 0.1, "triangle", 0.09]],
      fragment: [[720, 0.09, "sine", 0], [1040, 0.08, "sine", 0.06]],
      gate: [[290, 0.045, "triangle", 0]],
      collision: [[180, 0.18, "sawtooth", 0], [110, 0.24, "sawtooth", 0.07]],
      toggle: [[540, 0.06, "sine", 0]],
    };
    tones[event].forEach(([frequency, duration, type, delay]) => this.tone(context, frequency, duration, type, delay));
  }

  private tone(context: AudioContext, frequency: number, duration: number, type: OscillatorType, delay: number) {
    const now = context.currentTime + delay;
    const oscillator = context.createOscillator(); const gain = context.createGain();
    oscillator.type = type; oscillator.frequency.setValueAtTime(frequency, now);
    gain.gain.setValueAtTime(0.0001, now); gain.gain.exponentialRampToValueAtTime(0.11, now + 0.012); gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain); gain.connect(context.destination); oscillator.start(now); oscillator.stop(now + duration + 0.02);
  }

  dispose() { void this.context?.close(); this.context = null; }
}
