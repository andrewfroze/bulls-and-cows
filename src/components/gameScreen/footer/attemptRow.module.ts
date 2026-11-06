import { createElement } from '../../utils/elementFactory';
import type { Turn } from '../../../game';
import styles from '../gameScreen.module.css';

export function createAttemptRow(turn: Turn, index: number): HTMLElement {
  const number = createElement('span', {
    className: styles['attempt-number'],
    textContent: `#${index + 1}`,
  });

  const guess = createElement('span', {
    className: styles['attempt-guess'],
    textContent: turn.guess,
  });

  const bulls = createElement('span', {
    className: styles['attempt-bulls'],
    textContent: `Bulls: ${turn.result.bulls}`,
  });

  const cows = createElement('span', {
    className: styles['attempt-cows'],
    textContent: `Cows: ${turn.result.cows}`,
  });

  return createElement(
    'div',
    {
      className: styles['attempt-row'],
    },
    [number, guess, bulls, cows],
  );
}