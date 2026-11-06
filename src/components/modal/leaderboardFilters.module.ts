import { createElement } from '../utils/elementFactory';
import { BaseConfig, defaultLength, Base } from '../../game';
import styles from './leaderboardModal.module.css';

const minLength = 2;
const maxLength = 6;

export interface LeaderboardFilters {
  baseDropdown: HTMLSelectElement;
  lengthDropdown: HTMLSelectElement;
}

export function createLeaderboardFilters(base: Base, length: number): LeaderboardFilters {
  const baseDropdown = createBaseDropdown(base);
  const lengthDropdown = createLengthDropdown(base, length);

  baseDropdown.addEventListener('change', () => {
    updateLengthDropdownOptions(baseDropdown.value as Base, lengthDropdown);
  });

  return {
    baseDropdown,
    lengthDropdown,
  };
}

export function getSelectedSettings(filters: LeaderboardFilters): { base: Base; length: number } {
  return {
    base: filters.baseDropdown.value as Base,
    length: Number(filters.lengthDropdown.value),
  };
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

  updateLengthDropdownOptions(base, dropdown, length);

  return dropdown;
}

function updateLengthDropdownOptions(
  base: Base,
  dropdown: HTMLSelectElement,
  selectedLength: number = defaultLength,
): void {
  const availableMaxLength = Math.min(maxLength, BaseConfig[base].maxLength);

  const options = Array.from({ length: availableMaxLength - minLength + 1 }, (_, index) => {
    const length = minLength + index;

    return createElement('option', {
      value: String(length),
      textContent: String(length),
    });
  });

  dropdown.replaceChildren(...options);

  const normalizedLength = Math.min(availableMaxLength, Math.max(minLength, selectedLength));

  dropdown.value = String(normalizedLength);
  dropdown.disabled = options.length < 2;
}
