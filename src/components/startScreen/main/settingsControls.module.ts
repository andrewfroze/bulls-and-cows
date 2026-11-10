import { createElement } from '../../utils/elementFactory';
import { BaseConfig, defaultBase, defaultLength, Base, countPossibleSecrets } from '../../../game';
import styles from '../startScreen.module.css';

export interface SettingsControls {
  baseDropdownWrapper: HTMLElement;
  secretLengthDropdownWrapper: HTMLElement;
  combinationsInfo: HTMLParagraphElement;
}

export function createSettingsControls(): SettingsControls {
  const [baseDropdown, baseDropdownWrapper] = createBaseDropdown();
  const [secretLengthDropdown, secretLengthDropdownWrapper] = createSecretLengthDropdown();
  const combinationsInfo = createCombinationsInfo();

  updateSelectLengthDropdownOptions(secretLengthDropdown, defaultBase);
  updateCombinationsInfo(baseDropdown, secretLengthDropdown, combinationsInfo);

  baseDropdown.addEventListener('change', () => {
    updateSelectLengthDropdownOptions(secretLengthDropdown, baseDropdown.value as Base);
    updateCombinationsInfo(baseDropdown, secretLengthDropdown, combinationsInfo);
  });

  secretLengthDropdown.addEventListener('change', () => {
    updateCombinationsInfo(baseDropdown, secretLengthDropdown, combinationsInfo);
  });

  return {
    baseDropdownWrapper,
    secretLengthDropdownWrapper,
    combinationsInfo,
  };
}

function createBaseDropdown(base: Base = defaultBase): [HTMLSelectElement, HTMLElement] {
  const options = Object.entries(BaseConfig).map(([base, baseObject]) =>
    createElement('option', {
      value: base,
      textContent: `${baseObject.label} (${baseObject.maxLength})`,
    }),
  );

  const dropdown = createElement(
    'select',
    {
      className: styles['game-settings__base-dropdown'],
      name: 'base',
    },
    options,
  );

  dropdown.value = base;

  const dropdownWrapper = createElement(
    'div',
    {
      className: styles['game-settings__dropdown-wrapper'],
      'data-tooltip': 'Select the secret number base system',
    },
    [dropdown],
  );

  return [dropdown, dropdownWrapper];
}

function createSecretLengthDropdown(): [HTMLSelectElement, HTMLElement] {
  const dropdown = createElement('select', {
    className: styles['game-settings__length-dropdown'],
    name: 'length',
  });

  const dropdownWrapper = createElement(
    'div',
    {
      className: styles['game-settings__dropdown-wrapper'],
      'data-tooltip': 'Select the secret number length',
    },
    [dropdown],
  );

  return [dropdown, dropdownWrapper];
}

function createCombinationsInfo(): HTMLParagraphElement {
  return createElement('p', {
    className: styles['game-settings__combinations-info'],
  });
}

function updateSelectLengthDropdownOptions(dropdown: HTMLSelectElement, base: Base): void {
  const minLength = 2;
  const maxLength = 6;
  const availableMaxLength = Math.min(maxLength, BaseConfig[base].maxLength);

  const options = Array.from({ length: availableMaxLength - minLength + 1 }, (_, index) => {
    const length = minLength + index;

    return createElement('option', {
      value: String(length),
      textContent: String(length),
    });
  });

  dropdown.replaceChildren(...options);
  dropdown.value = String(Math.min(availableMaxLength, defaultLength));
  dropdown.disabled = options.length < 2;
}

function updateCombinationsInfo(
  baseDropdown: HTMLSelectElement,
  lengthDropdown: HTMLSelectElement,
  combinationsInfo: HTMLParagraphElement,
): void {
  const base = baseDropdown.value as Base;
  const length = Number(lengthDropdown.value);

  const count = countPossibleSecrets(length, base);

  combinationsInfo.textContent = `Possible combinations: ${count.toLocaleString()}`;
}
