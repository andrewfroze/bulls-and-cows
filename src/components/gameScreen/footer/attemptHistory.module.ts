import { createElement } from '../../utils/elementFactory';
import type { Turn } from '../../../game';
import { createAttemptRow } from './attemptRow.module';
import styles from '../gameScreen.module.css';

export function createAttemptHistory(): HTMLElement {
  return createElement(
    'div',
    {
      className: styles['attempt-history__list'],
    },
    [
      createElement('p', {
        className: styles['attempt-history__empty'],
        textContent: 'No attempts yet. Start guessing!',
      }),
    ],
  );
}

export function updateHistory(historyList: HTMLElement, turns: Turn[]): void {
  const rows = turns.map((turn, index) => createAttemptRow(turn, index)).reverse();

  historyList.replaceChildren(...(rows.length ? rows : [createEmptyMessage()]));
}

function createEmptyMessage(): HTMLElement {
  return createElement('p', {
    className: styles['attempt-history__empty'],
    textContent: 'No attempts yet. Start guessing!',
  });
}
