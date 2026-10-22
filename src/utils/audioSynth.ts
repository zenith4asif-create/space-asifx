/**
 * Web Audio API Generative Cosmic Ambience Synthesizer
 * Generates an atmospheric deep space drone with resonant filters and subtle harmonic overtones.
 * 100% client-side, zero external files, no CORS issues.
 */

class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (!this.ctx || !this.masterGain) return;
    this.stop(); // Clear any previous voices

    const now = this.ctx.currentTime;

    // Sub-bass fundamental drone (54.5 Hz - A1 note)
    const sub = this.ctx.createOscillator();
    sub.type = 'sine';
    sub.frequency.setValueAtTime(54.5, now);

    // Warm fifth harmonic (81.75 Hz - E2)
    const fifth = this.ctx.createOscillator();
    fifth.type = 'triangle';
    fifth.frequency.setValueAtTime(81.75, now);

    // Cosmic shimmer (163.5 Hz - E3) with subtle detune
    const shimmer = this.ctx.createOscillator();
    shimmer.type = 'sine';
    shimmer.frequency.setValueAtTime(163.5, now);
    shimmer.detune.setValueAtTime(4, now);

    // Filter
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(280, now);
    this.filterNode.Q.setValueAtTime(2.5, now);

    // Low Frequency Oscillator for subtle breathing swell
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, now); // 12-second cycle
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, now);
    lfo.connect(lfoGain);
    lfoGain.connect(this.filterNode.frequency);
    lfo.start(now);
    this.oscillators.push(lfo);

    // Connect voices through filter to master
    const voiceGain = this.ctx.createGain();
    voiceGain.gain.setValueAtTime(0.35, now);

    sub.connect(this.filterNode);
    fifth.connect(this.filterNode);
    shimmer.connect(this.filterNode);
    this.filterNode.connect(voiceGain);
    voiceGain.connect(this.masterGain);

    sub.start(now);
    fifth.start(now);
    shimmer.start(now);
    this.oscillators.push(sub, fifth, shimmer);

    // Gentle fade in over 2.5s
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(0.001, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.4, now + 2.5);

    this.isPlaying = true;
  }

  public stop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    this.masterGain.gain.cancelScheduledValues(now);
    this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    setTimeout(() => {
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // already stopped
        }
      });
      this.oscillators = [];
      if (this.noiseNode) {
        try {
          this.noiseNode.stop();
          this.noiseNode.disconnect();
        } catch {
          // ignore
        }
        this.noiseNode = null;
      }
      this.isPlaying = false;
    }, 1300);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public getFrequencyData(array: Uint8Array<ArrayBuffer>): void {
    if (this.analyser && this.isPlaying) {
      this.analyser.getByteFrequencyData(array);
    } else {
      array.fill(0);
    }
  }
}

export const cosmicAudio = new CosmicAudioEngine();
