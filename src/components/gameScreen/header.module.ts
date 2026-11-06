import { Settings } from '../../game';
import { createElement } from '../utils/elementFactory';
import styles from './gameScreen.module.css';

interface HeaderOptions {
  onNewGame: () => void;
  onOpenLeaderboard: () => void;
}

let timer: HTMLLabelElement;

export function renderHeader(options: HeaderOptions): HTMLElement {
  const title = createElement('h1', {
    textContent: 'BULLS & COWS',
  });

  timer = createElement('label', {
    className: styles['game-timer'],
    textContent: formatTime(0),
  });

  const newGameButton = createElement('button', {
    className: styles['new-game-button'],
    textContent: 'New Game',
    type: 'button',
  });

  const leaderboardButton = createElement('button', {
    className: styles['leaderboard-button'],
    textContent: 'Leaderboard',
    type: 'button',
  });

  newGameButton.addEventListener('click', options.onNewGame);
  leaderboardButton.addEventListener('click', options.onOpenLeaderboard);

  const controls = createElement(
    'div',
    {
      className: styles['game-header__controls'],
    },
    [timer, newGameButton, leaderboardButton],
  );

  return createElement(
    'header',
    {
      className: styles['game-screen-header'],
    },
    [title, controls],
  );
}

export function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function updateTimer(elapsedSeconds: number): void {
  timer.textContent = formatTime(elapsedSeconds);
}
