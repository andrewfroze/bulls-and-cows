import { start } from './app';
import './global.css';
import { playBackgroundMusic, playButton } from './sound';

start();

document.addEventListener('click', (event: MouseEvent) => {
  const target = event.target;

  if (
    target instanceof Element &&
    target.closest('button:not(:disabled), select:not(:disabled), option:not(:disabled)')
  ) {
    playButton();
  }
});

const startBackgroundMusic = () => {
  playBackgroundMusic();
  document.removeEventListener('click', startBackgroundMusic);
};

document.addEventListener('click', startBackgroundMusic);
