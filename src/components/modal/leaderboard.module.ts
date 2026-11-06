
import { createElement } from '../utils/elementFactory';
import { BaseConfig, defaultBase, defaultLength } from '../../game';
import { Base, type Settings } from '../../game';
import { getLeaderboard, type LeaderboardEntry } from '../../game/leaderboard/leaderboardStorage';
import { createModal } from './modal.module';
import styles from './leaderboardModal.module.css';

export interface LeaderboardModalOptions {
  settings?: Settings;
  onNewGame?: (settings: Settings) => void;
  onClose?: () => void;
}

const minLength = 2;
const maxLength = 6;

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

export function renderLeaderboardModal(options: LeaderboardModalOptions = {}) {
  const initialSettings = options.settings ?? {
    base: defaultBase,
    length: defaultLength,
  };

  const baseDropdown = createBaseDropdown(initialSettings.base);
  const lengthDropdown = createLengthDropdown(
    initialSettings.base,
    initialSettings.length,
  );

  const tableContainer = createElement('div', {
    className: styles['leaderboard-modal__table-container'],
  });

  const filters = createElement(
    'div',
    { className: styles['leaderboard-modal__filters'] },
    [baseDropdown, lengthDropdown],
  );

  const content = createElement(
    'div',
    { className: styles['leaderboard-modal'] },
    [filters, tableContainer],
  );

  const getSelectedSettings = (): Settings => ({
    base: baseDropdown.value as Base,
    length: Number(lengthDropdown.value),
  });

  const updateTable = (): void => {
    const entries = getLeaderboard(getSelectedSettings());

    tableContainer.replaceChildren(renderLeaderboard(entries));
  };

  baseDropdown.addEventListener('change', () => {
    updateSelectLengthDropdownOptions(
      baseDropdown.value as Base,
      lengthDropdown,
    );

    updateTable();
  });

  lengthDropdown.addEventListener('change', updateTable);

  updateTable();

  const actions = options.onNewGame
    ? [
        {
          label: 'New Game',
          variant: 'primary' as const,
          onClick: () => options.onNewGame?.(getSelectedSettings()),
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

function createBaseDropdown(base: Base): HTMLSelectElement {
  const options = Object.entries(BaseConfig).map(([value, baseObject]) =>
    createElement('option', {
      value,
      textContent: baseObject.label,
    }),
  );

  const dropdown = createElement(
    'select',
    {
      className: styles['leaderboard-modal__dropdown'],
      name: 'base',
    },
    options,
  );

  dropdown.value = base;

  return dropdown;
}

function createLengthDropdown(base: Base, length: number): HTMLSelectElement {
  const dropdown = createElement('select', {
    className: styles['leaderboard-modal__dropdown'],
    name: 'length',
  });

  updateSelectLengthDropdownOptions(base, dropdown, length);

  return dropdown;
}

function updateSelectLengthDropdownOptions(
  base: Base,
  dropdown: HTMLSelectElement,
  selectedLength?: number,
): void {
  const availableMaxLength = Math.min(
    maxLength,
    BaseConfig[base].maxLength,
  );

  const options = Array.from(
    { length: availableMaxLength - minLength + 1 },
    (_, index) => {
      const length = minLength + index;

      return createElement('option', {
        value: String(length),
        textContent: String(length),
      });
    },
  );

  dropdown.replaceChildren(...options);

  const defaultSelectedLength = Math.min(
    availableMaxLength,
    Math.max(minLength, selectedLength ?? defaultLength),
  );

  dropdown.value = String(defaultSelectedLength);

  dropdown.disabled = options.length < 2;
}

function renderLeaderboard(entries: LeaderboardEntry[]): HTMLElement {
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

  const headerRow = createElement('tr', {}, headerCells);
  const thead = createElement('thead', {}, [headerRow]);

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
