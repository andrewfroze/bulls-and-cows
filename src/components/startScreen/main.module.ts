import { createElement } from '../utils/elementFactory';
import { BaseConfig, defaultBase } from '../../game';
import { Base } from '../../game';
import styles from './startScreen.module.css';

const baseDropdown: HTMLSelectElement = createBaseDropdown();
const secretLengthDropdown: HTMLSelectElement = createEmptySecretLengthDropdown();
updateSelectLengthDropdownOptions(defaultBase);

export function renderMain(onStartGame: (base: Base, length: number) => void): HTMLElement {
  const startButton: HTMLButtonElement = createElement('button', {
    className: styles['start-button'],
    textContent: 'Start',
    type: 'submit',
  });

  const form = createElement(
    'form',
    {
      className: styles['game-settings'],
    },
    [baseDropdown, secretLengthDropdown, startButton],
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    startGame(form, onStartGame);
  });

  baseDropdown.addEventListener('change', () => {
    updateSelectLengthDropdownOptions(baseDropdown.value as Base);
  });

  return createElement(
    'main',
    {
      className: styles['start-screen-main'],
    },
    [form],
  );
}

function createBaseDropdown(base: Base = defaultBase): HTMLSelectElement {
  const options: HTMLOptionElement[] = Object.entries(BaseConfig).map(([base, baseObject]) =>
    createElement('option', {
      className: styles['game-settings__base-dropdown__option'],
      value: base,
      textContent: baseObject.label,
    }),
  );

  const baseDropdown = createElement(
    'select',
    {
      className: styles['game-settings__base-dropdown'],
      name: 'base',
    },
    options,
  );

  baseDropdown.value = base;

  return baseDropdown;
}

function createEmptySecretLengthDropdown(): HTMLSelectElement {
  return createElement('select', {
    className: styles['game-settings__length-dropdown'],
    name: 'length',
  });
}

function updateSelectLengthDropdownOptions(base: Base): void {
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

  secretLengthDropdown.replaceChildren(...options);

  secretLengthDropdown.disabled = options.length < 2;
}

function startGame(form: HTMLFormElement, onStartGame: (base: Base, length: number) => void): void {
  const formData = new FormData(form);

  const base = formData.get('base') as Base;
  const lengthElement = form.elements.namedItem('length');

  if (!(lengthElement instanceof HTMLSelectElement)) {
    throw new Error('Length select not found');
  }

  const length = Number(lengthElement.value);

  onStartGame(base, length);
}
