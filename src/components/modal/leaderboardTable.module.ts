import { createElement } from '../utils/elementFactory';
import type { LeaderboardEntry } from '../../game/leaderboard/leaderboardStorage';
import styles from './leaderboardModal.module.css';

export function renderLeaderboard(entries: LeaderboardEntry[]): HTMLElement {
  if (!entries.length) {
    return createElement('p', {
      className: styles['leaderboard-modal__empty'],
      textContent: 'No records yet. Be the first!',
    });
  }

  const headers = ['#', 'Attempts', 'Time'];

  const headerCells = headers.map((label) =>
    createElement('th', {
      scope: 'col',
      textContent: label,
    }),
  );

  const thead = createElement('thead', {}, [
    createElement('tr', {}, headerCells),
  ]);

  const rows = entries.map((entry, index) => {
    const values = [
      String(index + 1),
      String(entry.attempts),
      formatTime(entry.time),
    ];

    const cells = values.map((value) =>
      createElement('td', {
        textContent: value,
      }),
    );

    return createElement('tr', {}, cells);
  });

  const tbody = createElement('tbody', {}, rows);

  return createElement(
    'table',
    { className: styles['leaderboard-modal__table'] },
    [thead, tbody],
  );
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}