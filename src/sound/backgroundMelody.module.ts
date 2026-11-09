import { getAudioContext } from './audioContext.module';

const BPM = 112;
const BEAT = 60 / BPM;
const STEP = BEAT / 4;

const melody: (number | null)[][] = [
  [
    440,
    null,
    523.25,
    659.25,
    null,
    523.25,
    440,
    null,
    392,
    null,
    440,
    523.25,
    null,
    659.25,
    587.33,
    null,
  ],
  [
    349.23,
    null,
    440,
    523.25,
    null,
    440,
    349.23,
    null,
    392,
    null,
    440,
    523.25,
    null,
    587.33,
    523.25,
    null,
  ],
  [
    523.25,
    null,
    659.25,
    783.99,
    null,
    659.25,
    523.25,
    null,
    440,
    null,
    523.25,
    659.25,
    null,
    783.99,
    659.25,
    null,
  ],
  [
    392,
    null,
    493.88,
    587.33,
    null,
    493.88,
    392,
    null,
    349.23,
    null,
    392,
    493.88,
    null,
    587.33,
    493.88,
    null,
  ],
];

const chords = [
  [220, 261.63, 329.63], // Am
  [174.61, 220, 261.63], // F
  [130.81, 164.81, 196], // C
  [196, 246.94, 293.66], // G
];

const arpPattern = [0, 1, 2, 1, 0, 1, 2, 1, 0, 2, 1, 2, 0, 1, 2, 1];

const bassPattern = [0, null, 0, null, 0, null, 2, null, 0, null, 0, null, 2, null, 1, null];

let musicTimer: ReturnType<typeof setInterval> | null = null;
let musicStep = 0;
let nextNoteTime = 0;

function playTone(
  context: AudioContext,
  frequency: number,
  startTime: number,
  duration: number,
  volume: number,
  type: OscillatorType = 'square',
): void {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.linearRampToValueAtTime(volume, startTime + 0.01);
  gain.gain.setValueAtTime(volume, startTime + duration * 0.75);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

function playKick(context: AudioContext, time: number): void {
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(130, time);
  oscillator.frequency.exponentialRampToValueAtTime(35, time + 0.13);

  gain.gain.setValueAtTime(0.25, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

  oscillator.connect(gain);
  gain.connect(context.destination);

  oscillator.start(time);
  oscillator.stop(time + 0.16);
}

function playNoise(context: AudioContext, time: number, duration: number, volume: number): void {
  const bufferSize = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
  const data = buffer.getChannelData(0);

  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();

  source.buffer = buffer;

  filter.type = 'highpass';
  filter.frequency.value = 5000;

  gain.gain.setValueAtTime(volume, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  source.connect(filter);
  filter.connect(gain);
  gain.connect(context.destination);

  source.start(time);
  source.stop(time + duration);
}

function scheduleStep(context: AudioContext): void {
  const bar = Math.floor(musicStep / 16) % 4;
  const step = musicStep % 16;
  const time = nextNoteTime;

  const note = melody[bar][step];

  if (note !== null) {
    playTone(context, note, time, STEP * 1.7, 0.055, 'square');
  }

  const chord = chords[bar];
  const arpNote = chord[arpPattern[step]];

  playTone(context, arpNote * 2, time, STEP * 0.8, 0.018, 'triangle');

  const bassNote = bassPattern[step];

  if (bassNote !== null) {
    playTone(context, chord[bassNote] / 2, time, BEAT * 0.85, 0.11, 'triangle');
  }

  if (step % 4 === 0) {
    playKick(context, time);
  }

  if (step === 4 || step === 12) {
    playNoise(context, time, 0.12, 0.045);
  }

  if (step % 2 === 0) {
    playNoise(context, time, 0.035, 0.012);
  }

  nextNoteTime += STEP;
  musicStep++;
}

export function playBackgroundMusic(): void {
  if (musicTimer !== null) return;

  const context = getAudioContext();

  void context.resume().then(() => {
    if (musicTimer !== null) return;

    musicStep = 0;
    nextNoteTime = context.currentTime + 0.05;

    musicTimer = setInterval(() => {
      while (nextNoteTime < context.currentTime + 0.1) {
        scheduleStep(context);
      }
    }, 25);
  });
}

export function stopBackgroundMusic(): void {
  if (musicTimer !== null) {
    clearInterval(musicTimer);
    musicTimer = null;
  }
}
