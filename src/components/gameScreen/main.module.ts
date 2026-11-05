import { createElement } from '../utils/elementFactory';
import { Base, BaseObject } from '../../game/types';
import styles from './gameScreen.module.css';
import { BaseConfig } from '../../game/base';
import { createDigitValidator } from '../../game/createDigitValidator';
import { isValidGuess } from '../../game/isValidGuess';

interface MainOptions {
  base: Base;
  length: number;
}

export function renderMain(options: MainOptions): HTMLElement {
  const description = createElement('p', {
    className: styles['game-description'],
    textContent: `Guess the ${options.length}-digit secret number`,
  });

  const input = createElement('input', {
    className: styles['game-input'],
    type: 'text',
    name: 'guess',
    placeholder: 'Enter your guess',
    maxLength: options.length,
    minLength: options.length,
    autocomplete: 'off',
    required: true,
  });

  const validator: (value: string) => boolean = createDigitValidator(options.base);

  input.addEventListener('input', () => {
    const chars = [...input.value.toLowerCase()];

    const invalidChars = chars.filter((char) => !validator(char));
    const uniqueChars = new Set<string>();
    const duplicateChars: string[] = [];

    chars.forEach((char) => {
      if (validator(char)) {
        if (uniqueChars.has(char)) {
          duplicateChars.push(char);
        } else {
          uniqueChars.add(char);
        }
      }
    });

    const isTooLong = chars.length > options.length;

    if (invalidChars.length > 0) {
      input.setCustomValidity(`Invalid characters: ${[...new Set(invalidChars)].join(', ')}`);
    } else if (isTooLong) {
      input.setCustomValidity(`Maximum ${options.length} digits allowed`);
    } else if (duplicateChars.length > 0) {
      input.setCustomValidity(
        `Repeated characters are not allowed: ${[...new Set(duplicateChars)].join(', ')}`,
      );
    } else {
      input.setCustomValidity('');
    }

    input.reportValidity();

    input.value = chars
      .filter((char) => validator(char))
      .filter((char, index, array) => array.indexOf(char) === index)
      .slice(0, options.length)
      .join('')
      .toUpperCase();
  });

  const checkButton = createElement('button', {
    className: styles['check-button'],
    textContent: 'Check',
    type: 'submit',
  });

  const form = createElement(
    'form',
    {
      className: styles['guess-form'],
      noValidate: true,
    },
    [input, checkButton],
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    input.setCustomValidity('');

    const guess = input.value;

    const isValid = isValidGuess(guess, options.length, options.base);

    if (!isValid) {
      input.setCustomValidity('Invalid input');
      input.reportValidity();
      return;
    } else {
      input.setCustomValidity('');
    }

    input.value = '';
    input.focus();
  });

  const baseObject: BaseObject = BaseConfig[options.base];

  return createElement(
    'main',
    {
      className: styles['game-screen-main'],
    },
    [
      description,
      createElement('label', {
        className: styles['game-info'],
        textContent: `Base: ${options.base} | Length: ${options.length}`,
      }),
      createElement('label', {
        className: styles['available-chars'],
        textContent: 'Available symbols:',
      }),
      createElement(
        'div',
        {
          className: styles['available-chars__values'],
        },
        baseObject.availableChars.map((char) => {
          const labelElement = createElement('span', {
            textContent: char.toUpperCase(),
          });

          labelElement.addEventListener('click', () => {
            appendDigit(input, char, options.length);
            input.focus();
          });
          return labelElement;
        }),
      ),
      form,
    ],
  );
}

function appendDigit(input: HTMLInputElement, char: string, length: number): void {
  const normalizedChar = char.toUpperCase();

  if (input.value.length >= length) {
    input.setCustomValidity(`Maximum ${length} digits allowed`);
    input.reportValidity();
    return;
  }

  if (input.value.toUpperCase().includes(normalizedChar)) {
    input.setCustomValidity(`Character '${normalizedChar}' is already entered`);
    input.reportValidity();
    return;
  }

  input.setCustomValidity('');
  input.value += normalizedChar;
  input.dispatchEvent(new Event('input', { bubbles: true }));
}
