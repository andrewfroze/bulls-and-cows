let audioContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
  audioContext ??= new AudioContext();
  return audioContext;
}
