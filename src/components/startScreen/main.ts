import { createElement } from "../utils/elementFactory";
import { BaseConfig, defaultBase } from "../../game/base";
import { Base } from "../../game/types";
import './startScreen.module.css';

const baseDropdown: HTMLSelectElement = createBaseDropdown();
const secretLengthDropdown: HTMLSelectElement = createEmptySecretLengthDropdown()
updateSelectLengthDropdownOptions(defaultBase);

export function renderMain(): HTMLElement {
  const startButton: HTMLButtonElement = createElement('button', {
    className: 'start-button',
    textContent: 'Start',
    type: 'submit',
  });

  const form = createElement(
    'form',
    {
      className: 'game-settings',
    },
    [
      baseDropdown,
      secretLengthDropdown,
      startButton,
    ],
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    startGame(form);
  });

  baseDropdown.addEventListener('change', () => {
    updateSelectLengthDropdownOptions(baseDropdown.value as Base);
  });

  return createElement(
    'main',
    {
      className: 'start-screen-main',
    },
    [form],
  );
}

function createBaseDropdown(
    base: Base = defaultBase,
): HTMLSelectElement {
  const options: HTMLOptionElement[] = Object.entries(BaseConfig).map(
    ([base, baseObject]) =>
      createElement('option',
        {
          className: 'game-settings__base-dropdown__option',
          value: base,
          textContent: baseObject.label,
        },
      ),
  );

  const baseDropdown = createElement('select',
      {
        className: 'game-settings__base-dropdown',
        name: 'base',
      },
      options,
  );

  baseDropdown.value = base;

  return baseDropdown;
}

function createEmptySecretLengthDropdown(
    base: Base = defaultBase,
): HTMLSelectElement {
  return createElement('select',
    {
      className: 'game-settings__length-dropdown',
      name: 'length',
    },
  );
}

function updateSelectLengthDropdownOptions(base: Base): void {
  const minLength = 2;
  const maxLength = 6;

  const availableMaxLength = Math.min(
    maxLength,
    BaseConfig[base].maxLength,
  );

  const options = Array.from(
    { length: availableMaxLength - minLength + 1 },
    (_, index) => {
      const length = minLength + index;

      return createElement('option',
        {
          className: 'game-settings__length-dropdown__option',
          value: String(length),
          textContent: String(length),
        },
      );
    },
  );

  secretLengthDropdown.replaceChildren(...options);

  secretLengthDropdown.disabled = options.length < 2;
}

function startGame(form: HTMLFormElement): void {
  const formData = new FormData(form);

  const base = formData.get('base') as Base;
  const secretLength = Number(formData.get('length'));

  console.log(`start game: base: ${base}, length: ${secretLength}`);
}