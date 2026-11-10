import { start } from './app';
import './global.css';
import { playBackgroundMusic } from './sound';

start();

const startBackgroundMusic = () => {
  playBackgroundMusic();
  document.removeEventListener('click', startBackgroundMusic);
};

document.addEventListener('click', startBackgroundMusic);
