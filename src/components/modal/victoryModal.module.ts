import { createElement } from '../utils/elementFactory';
import { createModal } from './modal.module';
import styles from './victoryModal.module.css';

export interface VictoryModalOptions {
  attempts: number;
  time: number;
  onNewGame: () => void;
  onLeaderboard: () => void;
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function renderVictoryModal(options: VictoryModalOptions) {
  const message = createElement('p', {
    className: styles['victory-modal__message'],
    textContent: 'Congratulations! You guessed the secret number!',
  });

  const attempts = createElement('p', {
    className: styles['victory-modal__stat'],
    textContent: `Attempts: ${options.attempts}`,
  });

  const time = createElement('p', {
    className: styles['victory-modal__stat'],
    textContent: `Time: ${formatTime(options.time)}`,
  });

  const stats = createElement('div', { className: styles['victory-modal__stats'] }, [
    attempts,
    time,
  ]);

  const content = createElement('div', { className: styles['victory-modal'] }, [message, stats]);

  return createModal({
    title: 'You won!',
    content,
    actions: [
      {
        label: 'Leaderboard',
        onClick: options.onLeaderboard,
      },
      {
        label: 'New Game',
        variant: 'primary',
        onClick: options.onNewGame,
      },
    ],
  });
}
