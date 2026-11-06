import { createElement } from '../utils/elementFactory';
import { Base, defaultBase, defaultLength, type Settings } from '../../game';
import { getLeaderboard } from '../../game/leaderboard/leaderboardStorage';
import { createModal } from './modal.module';
import { createLeaderboardFilters, getSelectedSettings } from './leaderboardFilters.module';
import { renderLeaderboard } from './leaderboardTable.module';
import styles from './leaderboardModal.module.css';

export interface LeaderboardModalOptions {
  settings?: Settings;
  onNewGame?: (settings: Settings) => void;
  onClose?: () => void;
}

export function renderLeaderboardModal(options: LeaderboardModalOptions = {}) {
  const initialSettings = options.settings ?? {
    base: defaultBase,
    length: defaultLength,
  };

  const filters = createLeaderboardFilters(
    initialSettings.base,
    initialSettings.length,
  );

  const tableContainer = createElement('div', {
    className: styles['leaderboard-modal__table-container'],
  });

  const content = createElement(
    'div',
    { className: styles['leaderboard-modal'] },
    [
      createElement(
        'div',
        { className: styles['leaderboard-modal__filters'] },
        [filters.baseDropdown, filters.lengthDropdown],
      ),
      tableContainer,
    ],
  );

  const updateTable = (): void => {
    const entries = getLeaderboard(getSelectedSettings(filters));

    tableContainer.replaceChildren(renderLeaderboard(entries));
  };

  filters.baseDropdown.addEventListener('change', updateTable);
  filters.lengthDropdown.addEventListener('change', updateTable);

  updateTable();

  const actions = options.onNewGame
    ? [
        {
          label: 'New Game',
          variant: 'primary' as const,
          onClick: () => options.onNewGame?.(getSelectedSettings(filters)),
        },
        {
          label: 'Close',
          onClick: () => {},
        },
      ]
    : [
        {
          label: 'Close',
          onClick: () => {},
        },
      ];

  return createModal({
    title: 'Leaderboard',
    content,
    actions,
    onClose: options.onClose,
  });
}