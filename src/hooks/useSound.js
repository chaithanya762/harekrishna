import { useRef, useCallback, useEffect } from 'react';

// Web Audio Synthesizer for Authentic ISKCON Kirtan Tune, Temple Bells & Om Drone
export function useSound() {
  const audioCtxRef = useRef(null);
  const ambientOscRef = useRef(null);
  const ambientGainRef = useRef(null);
  const kirtanTimerRef = useRef(null);
  const isKirtanPlayingRef = useRef(false);

  // Lazy AudioContext Initialization
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

  // 🔔 Temple Bell Chime
  const playBell = useCallback((vol = 0.3) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    osc1.frequency.setValueAtTime(800, now);
    osc2.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.2);
    osc2.stop(now + 1.2);
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

  // 🎵 Harmonium & Kirtan Note Synthesizer
  const playKirtanNote = useCallback((freq, duration = 1.2, delay = 0) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const harmoniumOsc = ctx.createOscillator();
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = 'sine';
    harmoniumOsc.type = 'triangle';

    osc.frequency.setValueAtTime(freq, now);
    harmoniumOsc.frequency.setValueAtTime(freq * 0.5, now);

    vibrato.frequency.setValueAtTime(5.2, now);
    vibratoGain.gain.setValueAtTime(3.5, now);
    vibrato.connect(osc.frequency);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.16, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    harmoniumOsc.connect(gain);
    gain.connect(ctx.destination);

    vibrato.start(now);
    osc.start(now);
    harmoniumOsc.start(now);
    vibrato.stop(now + duration);
    osc.stop(now + duration);
    harmoniumOsc.stop(now + duration);
  }, [getAudioContext]);

  // 🎵 Authentic ISKCON Srila Prabhupada Classic Hare Krishna Melody
  const startSweetKirtanSong = useCallback(() => {
    if (isKirtanPlayingRef.current) return;
    isKirtanPlayingRef.current = true;

    // Classic 16-word ISKCON Melody Note Frequencies (Hz)
    const iskconMelody = [
      // Line 1: Hare Krishna Hare Krishna
      { freq: 392.00, dur: 1.1 }, // G4 - Ha-
      { freq: 440.00, dur: 1.1 }, // A4 - re
      { freq: 493.88, dur: 1.3 }, // B4 - Krish-
      { freq: 587.33, dur: 1.3 }, // D5 - na
      { freq: 493.88, dur: 1.2 }, // B4 - Ha-
      { freq: 440.00, dur: 1.2 }, // A4 - re
      { freq: 392.00, dur: 1.5 }, // G4 - Krish-na

      // Line 2: Krishna Krishna Hare Hare
      { freq: 329.63, dur: 1.1 }, // E4 - Krish-
      { freq: 392.00, dur: 1.1 }, // G4 - na
      { freq: 440.00, dur: 1.3 }, // A4 - Krish-
      { freq: 493.88, dur: 1.3 }, // B4 - na
      { freq: 440.00, dur: 1.2 }, // A4 - Ha-
      { freq: 392.00, dur: 1.2 }, // G4 - re
      { freq: 329.63, dur: 1.6 }, // E4 - Ha-re

      // Line 3: Hare Rama Hare Rama
      { freq: 493.88, dur: 1.1 }, // B4 - Ha-
      { freq: 587.33, dur: 1.1 }, // D5 - re
      { freq: 659.25, dur: 1.3 }, // E5 - Ra-
      { freq: 587.33, dur: 1.3 }, // D5 - ma
      { freq: 493.88, dur: 1.2 }, // B4 - Ha-
      { freq: 440.00, dur: 1.2 }, // A4 - re
      { freq: 392.00, dur: 1.5 }, // G4 - Ra-ma

      // Line 4: Rama Rama Hare Hare
      { freq: 440.00, dur: 1.1 }, // A4 - Ra-
      { freq: 493.88, dur: 1.1 }, // B4 - ma
      { freq: 440.00, dur: 1.3 }, // A4 - Ra-
      { freq: 392.00, dur: 1.3 }, // G4 - ma
      { freq: 329.63, dur: 1.2 }, // E4 - Ha-
      { freq: 293.66, dur: 1.2 }, // D4 - re
      { freq: 329.63, dur: 1.8 }  // E4 - Ha-re
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!isKirtanPlayingRef.current) return;
      const currentNote = iskconMelody[noteIdx];
      playKirtanNote(currentNote.freq, currentNote.dur);
      noteIdx = (noteIdx + 1) % iskconMelody.length;
      kirtanTimerRef.current = setTimeout(playNextNote, currentNote.dur * 880);
    };

    playNextNote();
  }, [playKirtanNote]);

  const stopSweetKirtanSong = useCallback(() => {
    isKirtanPlayingRef.current = false;
    if (kirtanTimerRef.current) {
      clearTimeout(kirtanTimerRef.current);
      kirtanTimerRef.current = null;
    }
  }, []);

  // 🕉️ Ambient Om Drone
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
    gain.gain.linearRampToValueAtTime(0.06, now + 2);

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
      stopSweetKirtanSong();
      stopAmbient();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [stopSweetKirtanSong, stopAmbient]);

  return {
    playBell,
    playTap,
    playKirtanNote,
    startSweetKirtanSong,
    stopSweetKirtanSong,
    startAmbient,
    stopAmbient,
    getAudioContext
  };
}
