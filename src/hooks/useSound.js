import { useRef, useCallback, useEffect } from 'react';

// Web Audio Synthesizer for Om Meditation Drone & Authentic Brass Temple Bell Chime
export function useSound() {
  const audioCtxRef = useRef(null);
  const ambientOscRef = useRef(null);
  const ambientGainRef = useRef(null);

  // Lazy AudioContext Initialization & Auto-Resume
  const getAudioContext = useCallback(() => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // 🔔 Authentic Brass Temple Bell Chime (Rich 3-harmonic resonance)
  const playBell = useCallback((vol = 0.5) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator(); // Fundamental tone (G5: 784Hz)
    const osc2 = ctx.createOscillator(); // Fifth harmonic (D6: 1175Hz)
    const osc3 = ctx.createOscillator(); // Octave harmonic (G6: 1568Hz)
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc3.type = 'sine';

    osc1.frequency.setValueAtTime(784, now);
    osc2.frequency.setValueAtTime(1174.66, now);
    osc3.frequency.setValueAtTime(1567.98, now);

    // Warm bell strike envelope
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

    osc1.connect(gain);
    osc2.connect(gain);
    osc3.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc3.start(now);
    osc1.stop(now + 1.8);
    osc2.stop(now + 1.8);
    osc3.stop(now + 1.8);
  }, [getAudioContext]);

  // 🔘 Tap / Bead Click Sound
  const playTap = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.06);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }, [getAudioContext]);

  // 🕉️ Pure Sacred Om Drone (136.1 Hz Cosmic Frequency)
  const startAmbient = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx || ambientOscRef.current) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(136.1, now);
    osc2.frequency.setValueAtTime(272.2, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.07, now + 2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);

    ambientOscRef.current = { osc1, osc2 };
    ambientGainRef.current = gain;
  }, [getAudioContext]);

  const stopAmbient = useCallback(() => {
    if (!ambientGainRef.current || !audioCtxRef.current) return;

    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;

    ambientGainRef.current.gain.linearRampToValueAtTime(0.001, now + 1);
    setTimeout(() => {
      if (ambientOscRef.current) {
        ambientOscRef.current.osc1.stop();
        ambientOscRef.current.osc2.stop();
        ambientOscRef.current = null;
        ambientGainRef.current = null;
      }
    }, 1000);
  }, []);

  useEffect(() => {
    return () => {
      stopAmbient();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [stopAmbient]);

  return {
    playBell,
    playTap,
    startAmbient,
    stopAmbient,
    getAudioContext
  };
}
