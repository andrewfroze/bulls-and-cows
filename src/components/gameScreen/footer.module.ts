import { createElement } from '../utils/elementFactory';
import { GameAttempt } from '.';
import styles from './gameScreen.module.css';

export function renderFooter(): HTMLElement {
  const title = createElement('h2', {
    textContent: 'ATTEMPT HISTORY',
  });

  const historyList = createElement('div', {
    className: styles['attempt-history__list'],
  });

  historyList.append(
    createElement('p', {
      className: styles['attempt-history__empty'],
      textContent: 'No attempts yet. Start guessing!',
    }),
  );

  return createElement(
    'footer',
    {
      className: styles['game-screen-footer'],
    },
    [title, historyList],
  );
}

function createAttemptRow(attempt: GameAttempt, index: number): HTMLElement {
  const number = createElement('span', {
    className: styles['attempt-number'],
    textContent: `#${index}`,
  });

  const guess = createElement('span', {
    className: styles['attempt-guess'],
    textContent: attempt.guess,
  });

  const bulls = createElement('span', {
    className: styles['attempt-bulls'],
    textContent: `Bulls: ${attempt.bulls}`,
  });

  const cows = createElement('span', {
    className: styles['attempt-cows'],
    textContent: `Cows: ${attempt.cows}`,
  });

  return createElement(
    'div',
    {
      className: styles['attempt-row'],
    },
    [number, guess, bulls, cows],
  );
}
