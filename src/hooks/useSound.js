import { useRef, useCallback, useEffect } from 'react';

// Web Audio Synthesizer for Vrindavan Bansuri Flute, Temple Bells, Om Drone & Sweet Kirtan Melody
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
  const playBell = useCallback(() => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'sine';

    // 800Hz & 1200Hz harmonic chime
    osc1.frequency.setValueAtTime(800, now);
    osc2.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0.3, now);
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

  // 🪈 Play Single Bansuri Flute Note
  const playFluteNote = useCallback((freq, duration = 1.2, delay = 0) => {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Warm Bansuri Vibrato
    vibrato.frequency.setValueAtTime(5.5, now); // 5.5 Hz vibrato rate
    vibratoGain.gain.setValueAtTime(4, now); // Vibrato depth
    vibrato.connect(osc.frequency);

    // Smooth Envelope
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    vibrato.start(now);
    osc.start(now);
    vibrato.stop(now + duration);
    osc.stop(now + duration);
  }, [getAudioContext]);

  // 🎶 Sweet Hare Krishna Vrindavan Kirtan Melodic Loop
  // Hare Krishna Melody Scale Frequencies (Hz): E4, G4, A4, B4, D5, E5
  const startSweetKirtanSong = useCallback(() => {
    if (isKirtanPlayingRef.current) return;
    isKirtanPlayingRef.current = true;

    const notes = [
      { freq: 329.63, dur: 1.0 }, // E4 - Hare
      { freq: 392.00, dur: 1.0 }, // G4 - Krishna
      { freq: 440.00, dur: 1.2 }, // A4 - Hare
      { freq: 493.88, dur: 1.2 }, // B4 - Krishna
      { freq: 587.33, dur: 1.4 }, // D5 - Krishna
      { freq: 659.25, dur: 1.6 }, // E5 - Krishna
      { freq: 493.88, dur: 1.2 }, // B4 - Hare
      { freq: 440.00, dur: 1.4 }, // A4 - Hare
      
      { freq: 392.00, dur: 1.0 }, // G4 - Hare
      { freq: 440.00, dur: 1.0 }, // A4 - Rama
      { freq: 493.88, dur: 1.2 }, // B4 - Hare
      { freq: 587.33, dur: 1.2 }, // D5 - Rama
      { freq: 493.88, dur: 1.4 }, // B4 - Rama
      { freq: 440.00, dur: 1.6 }, // A4 - Rama
      { freq: 392.00, dur: 1.2 }, // G4 - Hare
      { freq: 329.63, dur: 1.6 }  // E4 - Hare
    ];

    let noteIdx = 0;

    const playNextNote = () => {
      if (!isKirtanPlayingRef.current) return;
      const currentNote = notes[noteIdx];
      playFluteNote(currentNote.freq, currentNote.dur);
      noteIdx = (noteIdx + 1) % notes.length;
      kirtanTimerRef.current = setTimeout(playNextNote, currentNote.dur * 850);
    };

    playNextNote();
  }, [playFluteNote]);

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

    osc1.frequency.setValueAtTime(136.1, now); // 136.1 Hz Om frequency
    osc2.frequency.setValueAtTime(272.2, now); // 272.2 Hz Octave

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
    playFluteNote,
    startSweetKirtanSong,
    stopSweetKirtanSong,
    startAmbient,
    stopAmbient,
    getAudioContext
  };
}
