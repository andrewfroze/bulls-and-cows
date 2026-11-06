import { createElement } from '../../utils/elementFactory';
import type { Turn } from '../../../game';
import styles from '../gameScreen.module.css';
import bull from '../../../assets/bull.png';
import cow from '../../../assets/cow.png';

export function createAttemptRow(turn: Turn, index: number): HTMLElement {
  const number = createElement('span', {
    className: styles['attempt-number'],
    textContent: `#${index + 1}`,
  });

  const guess = createElement('span', {
    className: styles['attempt-guess'],
    textContent: turn.guess,
  });

  const bulls = createElement('div',
    {
      className: styles['attempt-bulls'],
    },
    [
      createElement('img', {
        alt: '',
        src: bull,
      }),
      createElement('span', {
        className: styles['attempt-bulls__value'],
        textContent: String(turn.result.bulls),
      }),
    ]
  );

  const cows = createElement('div',
    {
      className: styles['attempt-cows'],
    },
    [
      createElement('img', {
        alt: '',
        src: cow,
      }),
      createElement('span', {
        className: styles['attempt-cows__value'],
        textContent: String(turn.result.cows),
      }),
    ]
  );

  return createElement(
    'div',
    {
      className: styles['attempt-row'],
    },
    [number, guess, bulls, cows],
  );
}