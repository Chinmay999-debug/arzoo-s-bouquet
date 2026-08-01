type Voice = {
  osc: OscillatorNode;
  drift: OscillatorNode;
};

class AmbientMusic {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private voices: Voice[] = [];
  private started = false;
  private readonly targetVolume = 0.055;

  start() {
    if (this.started) return;
    this.started = true;

    const AudioContextCtor =
      window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioContextCtor();
    this.ctx = ctx;
    if (ctx.state === "suspended") void ctx.resume();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    this.master = master;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1100;
    filter.Q.value = 0.3;
    filter.connect(master);

    // soft, slow echo instead of a real IR reverb — cheap and warm enough
    const delay = ctx.createDelay(2);
    delay.delayTime.value = 0.65;
    const feedback = ctx.createGain();
    feedback.gain.value = 0.3;
    const delayWet = ctx.createGain();
    delayWet.gain.value = 0.22;
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(delayWet);
    delayWet.connect(filter);

    // a gentle, slightly detuned major chord, breathing in volume
    const chord = [130.81, 164.81, 196.0, 261.63]; // C3 E3 G3 C4
    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = freq;

      const voiceGain = ctx.createGain();
      voiceGain.gain.value = 0.2 / chord.length;

      const breathe = ctx.createOscillator();
      breathe.frequency.value = 0.06 + i * 0.015;
      const breatheGain = ctx.createGain();
      breatheGain.gain.value = voiceGain.gain.value * 0.35;
      breathe.connect(breatheGain);
      breatheGain.connect(voiceGain.gain);
      breathe.start();

      const drift = ctx.createOscillator();
      drift.frequency.value = 0.04 + i * 0.011;
      const driftGain = ctx.createGain();
      driftGain.gain.value = 2.2;
      drift.connect(driftGain);
      driftGain.connect(osc.detune);
      drift.start();

      osc.connect(voiceGain);
      voiceGain.connect(filter);
      voiceGain.connect(delay);
      osc.start();

      this.voices.push({ osc, drift });
    });

    const now = ctx.currentTime;
    master.gain.setValueAtTime(0, now);
    master.gain.linearRampToValueAtTime(this.targetVolume, now + 3.5);
  }

  setMuted(muted: boolean) {
    if (!this.ctx || !this.master) return;
    const now = this.ctx.currentTime;
    this.master.gain.cancelScheduledValues(now);
    this.master.gain.setValueAtTime(this.master.gain.value, now);
    this.master.gain.linearRampToValueAtTime(muted ? 0 : this.targetVolume, now + 1);
  }

  isStarted() {
    return this.started;
  }
}

export const ambientMusic = new AmbientMusic();
