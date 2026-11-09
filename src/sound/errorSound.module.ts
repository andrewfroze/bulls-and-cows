import { getAudioContext } from './audioContext.module';

export function playError(): void {
  const context = getAudioContext();

  void context.resume().then(() => {
    const now = context.currentTime;

    const playTone = (
      startTime: number,
      duration: number,
      startFrequency: number,
      endFrequency: number,
    ): void => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();

      oscillator.type = 'square';

      oscillator.frequency.setValueAtTime(startFrequency, startTime);
      oscillator.frequency.exponentialRampToValueAtTime(endFrequency, startTime + duration);

      gain.gain.setValueAtTime(0.0001, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.01);
      gain.gain.setValueAtTime(0.15, startTime + duration * 0.7);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      oscillator.connect(gain);
      gain.connect(context.destination);

      oscillator.start(startTime);
      oscillator.stop(startTime + duration);
    };

    playTone(now, 0.11, 220, 150);
    playTone(now + 0.13, 0.16, 150, 75);
  });
}
