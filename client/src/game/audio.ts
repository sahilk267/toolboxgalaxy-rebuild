// Orbital Workbench: shared browser-local game-audio preference; audible output still starts only from a visitor gesture.
export type SoundEvent = "start" | "fragment" | "gate" | "collision" | "toggle" | "relayCorrect" | "relayFail" | "rotate" | "puzzleSolve";

const SOUND_STORAGE_KEY = "toolboxgalaxy:game-sound";
const MUSIC_STORAGE_KEY = "toolboxgalaxy:logic-music";
const logicMusicUrl = "/manus-storage/toolbox-galaxy-logic-lab-loop_ea48028d.mp3";
const readPreference = (key: string) => typeof window !== "undefined" && window.localStorage.getItem(key) === "on";

export class OrbitAudio {
  private context: AudioContext | null = null;
  private music: HTMLAudioElement | null = null;
  private enabled = readPreference(SOUND_STORAGE_KEY);
  private musicEnabled = readPreference(MUSIC_STORAGE_KEY);

  isEnabled() { return this.enabled; }
  isMusicEnabled() { return this.musicEnabled; }

  private getContext() {
    this.context ??= new AudioContext();
    return this.context;
  }

  async setEnabled(next: boolean) {
    this.enabled = next;
    window.localStorage.setItem(SOUND_STORAGE_KEY, next ? "on" : "off");
    if (!next) { this.pauseMusic(); await this.context?.suspend(); return false; }
    const context = this.getContext();
    if (context.state === "suspended") await context.resume();
    this.play("toggle");
    return true;
  }

  async setMusicEnabled(next: boolean) {
    this.musicEnabled = next;
    window.localStorage.setItem(MUSIC_STORAGE_KEY, next ? "on" : "off");
    if (!next) { this.pauseMusic(); return false; }
    if (!this.enabled) await this.setEnabled(true);
    await this.startMusic();
    return true;
  }

  play(event: SoundEvent) {
    if (!this.enabled) return;
    if (this.musicEnabled) void this.startMusic();
    const context = this.getContext();
    const tones: Record<SoundEvent, Array<[number, number, OscillatorType, number]>> = {
      start: [[310, 0.08, "triangle", 0], [470, 0.1, "triangle", 0.09]],
      fragment: [[720, 0.09, "sine", 0], [1040, 0.08, "sine", 0.06]],
      gate: [[290, 0.045, "triangle", 0]],
      collision: [[180, 0.18, "sawtooth", 0], [110, 0.24, "sawtooth", 0.07]],
      toggle: [[540, 0.06, "sine", 0]],
      relayCorrect: [[640, 0.065, "sine", 0], [880, 0.09, "triangle", 0.055]],
      relayFail: [[210, 0.15, "sawtooth", 0], [145, 0.18, "sawtooth", 0.06]],
      rotate: [[420, 0.045, "triangle", 0], [510, 0.05, "sine", 0.03]],
      puzzleSolve: [[520, 0.07, "sine", 0], [780, 0.08, "triangle", 0.06], [1040, 0.12, "sine", 0.13]],
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

  private async startMusic() {
    if (!this.enabled || !this.musicEnabled) return;
    this.music ??= Object.assign(new Audio(logicMusicUrl), { loop: true, volume: 0.16, preload: "none" });
    try { await this.music.play(); } catch { /* The visible control remains available when a browser defers audible playback. */ }
  }

  private pauseMusic() { this.music?.pause(); }

  dispose() { this.pauseMusic(); this.music = null; void this.context?.close(); this.context = null; }
}
