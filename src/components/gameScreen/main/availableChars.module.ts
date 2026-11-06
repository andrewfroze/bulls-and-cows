import { createElement } from '../../utils/elementFactory';
import { BaseConfig, type Base } from '../../../game';
import styles from '../gameScreen.module.css';

export function createAvailableChars(
  base: Base,
  input: HTMLInputElement,
  length: number,
): HTMLDivElement {
  const buttons = BaseConfig[base].availableChars.map((char) => {
    const button = createElement('button', {
      className: styles['available-chars__button'],
      textContent: char.toUpperCase(),
      type: 'button',
    });

    button.addEventListener('click', () => {
      appendDigit(input, char, length);
      input.focus();
    });

    return button;
  });

  return createElement(
    'div',
    {
      className: styles['available-chars__values'],
    },
    buttons,
  );
}

function appendDigit(input: HTMLInputElement, char: string, length: number): void {
  const normalizedChar = char.toUpperCase();

  if (input.value.length >= length) {
    input.setCustomValidity(`Maximum ${length} digits allowed`);
    input.reportValidity();
    return;
  }

  if (input.value.includes(normalizedChar)) {
    input.setCustomValidity(`Character '${normalizedChar}' is already entered`);
    input.reportValidity();
    return;
  }

  input.setCustomValidity('');
  input.value += normalizedChar;

  input.dispatchEvent(new Event('input', { bubbles: true }));
}
