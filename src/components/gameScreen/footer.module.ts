import { createElement } from '../utils/elementFactory';
import styles from './gameScreen.module.css';
import { Turn } from '../../game';

let historyList: HTMLElement;

export function renderFooter(): HTMLElement {
  const title = createElement('h2', {
    textContent: 'ATTEMPT HISTORY',
  });

  historyList = createElement('div', {
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

function createAttemptRow(turn: Turn, index: number): HTMLElement {
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

export function updateHistory(turns: Turn[]): void {
  historyList.replaceChildren(
    ...turns.map((turn, index) => createAttemptRow(turn, index)).reverse()
  );
}