import { useRef, useCallback, useEffect } from 'react';

export function useSound() {
  const audioContextRef = useRef(null);
  const ambientOscillatorRef = useRef(null);
  const ambientGainRef = useRef(null);

  const initAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  // Vrindavan Bansuri Flute Synthesis
  const playFlute = useCallback((volume = 0.35) => {
    initAudioContext();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const t = ctx.currentTime;
    
    // Vrindavan raga scale notes (D5, F#5, A5, B5, D6)
    const notes = [587.33, 739.99, 880.00, 987.77, 1174.66];
    const freq = notes[Math.floor(Math.random() * notes.length)];

    const osc = ctx.createOscillator();
    const subOsc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, t);

    // Warm undertone
    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(freq / 2, t);

    // Expressive Vibrato (Flute feel)
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 5.5; // Hz
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 6;
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    lfo.start(t);
    lfo.stop(t + 1.8);

    // Soft Breath Envelope
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(volume, t + 0.12);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.4, t + 0.8);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 1.8);

    osc.connect(gainNode);
    subOsc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(t);
    subOsc.start(t);
    osc.stop(t + 1.8);
    subOsc.stop(t + 1.8);
  }, [initAudioContext]);

  // Temple Bell Sound
  const playBell = useCallback((volume = 0.3) => {
    initAudioContext();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(800, t);
    
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 6;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfo.start(t);
    lfo.stop(t + 2);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1200, t);

    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(volume, t + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(volume * 0.1, t + 0.3);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 2);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 2);
    osc2.stop(t + 2);
  }, [initAudioContext]);

  // Tap Feedback
  const playTap = useCallback((volume = 0.1) => {
    initAudioContext();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    const t = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, t);

    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(volume, t + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(t);
    osc.stop(t + 0.05);
  }, [initAudioContext]);

  // Continuous Om & Tanpura Drone
  const startAmbient = useCallback((volume = 0.2) => {
    initAudioContext();
    const ctx = audioContextRef.current;
    if (!ctx) return;

    if (ambientOscillatorRef.current) return;

    const t = ctx.currentTime;
    
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, t);
    masterGain.gain.linearRampToValueAtTime(volume, t + 2);
    masterGain.connect(ctx.destination);
    ambientGainRef.current = masterGain;

    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 136.1; // Om fundamental
    const gain1 = ctx.createGain();
    gain1.gain.value = 0.06;
    osc1.connect(gain1);
    gain1.connect(masterGain);

    const osc2 = ctx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 272.2; // Octave
    const gain2 = ctx.createGain();
    gain2.gain.value = 0.03;
    osc2.connect(gain2);
    gain2.connect(masterGain);

    osc1.start(t);
    osc2.start(t);

    ambientOscillatorRef.current = { osc1, osc2 };
  }, [initAudioContext]);

  const stopAmbient = useCallback(() => {
    const ctx = audioContextRef.current;
    if (!ctx || !ambientGainRef.current || !ambientOscillatorRef.current) return;

    const t = ctx.currentTime;
    ambientGainRef.current.gain.setValueAtTime(ambientGainRef.current.gain.value, t);
    ambientGainRef.current.gain.linearRampToValueAtTime(0, t + 1);

    const oscs = ambientOscillatorRef.current;
    setTimeout(() => {
      if (oscs.osc1) oscs.osc1.stop();
      if (oscs.osc2) oscs.osc2.stop();
      ambientOscillatorRef.current = null;
    }, 1000);
  }, []);

  const setAmbientVolume = useCallback((volume) => {
    if (ambientGainRef.current && audioContextRef.current) {
      const t = audioContextRef.current.currentTime;
      ambientGainRef.current.gain.linearRampToValueAtTime(volume, t + 0.1);
    }
  }, []);

  const cleanup = useCallback(() => {
    if (audioContextRef.current) {
      if (ambientOscillatorRef.current) {
        ambientOscillatorRef.current.osc1.stop();
        ambientOscillatorRef.current.osc2.stop();
      }
      audioContextRef.current.close();
      audioContextRef.current = null;
      ambientOscillatorRef.current = null;
      ambientGainRef.current = null;
    }
  }, []);

  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  return { playFlute, playBell, playTap, startAmbient, stopAmbient, setAmbientVolume, cleanup, audioContextRef };
}
