import buttonSound from '../assets/button.wav';
import winSound from '../assets/win.wav';
import backgroundSound from '../assets/background.wav';
import { playBackgroundMusic } from './backgroundMelody.module';
import { playError } from './errorSound.module';

const buttonAudio: HTMLAudioElement = new Audio(buttonSound);
const winAudio: HTMLAudioElement = new Audio(winSound);
const backgroundAudio: HTMLAudioElement = new Audio(backgroundSound);
backgroundAudio.volume = 0.5;
backgroundAudio.loop = true;

export function playButton(): void {
  buttonAudio.currentTime = 0;
  buttonAudio.play();
}

export function playWin(): void {
  winAudio.currentTime = 0;
  winAudio.play();
}

export { playBackgroundMusic, playError };
