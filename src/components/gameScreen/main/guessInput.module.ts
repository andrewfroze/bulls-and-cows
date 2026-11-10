import { createElement } from '../../utils/elementFactory';
import { createDigitValidator, isValidGuess, type Base } from '../../../game';
import styles from '../gameScreen.module.css';
import { playError } from '../../../sound';

interface GuessInputOptions {
  base: Base;
  length: number;
  isHasDuplicates: (guess: string) => boolean;
  onSubmitGuess: (guess: string) => void;
}

export function createGuessForm(options: GuessInputOptions): HTMLFormElement {
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

  const validator = createDigitValidator(options.base);

  input.addEventListener('input', () => {
    validateInput(input, validator, options.length);
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

    if (!isValidGuess(guess, options.length, options.base)) {
      input.setCustomValidity('Invalid input');
      input.reportValidity();
      playError();
      return;
    }

    if (options.isHasDuplicates(guess)) {
      input.setCustomValidity('Already tried');
      input.reportValidity();
      playError();
      return;
    }

    options.onSubmitGuess(guess);

    input.value = '';
    input.focus();
  });

  return form;
}

function validateInput(
  input: HTMLInputElement,
  validator: (value: string) => boolean,
  length: number,
): void {
  const chars = [...input.value.toLowerCase()];

  const invalidChars = chars.filter((char) => !validator(char));
  const uniqueChars = new Set<string>();
  const duplicateChars: string[] = [];

  chars.forEach((char) => {
    if (!validator(char)) return;

    if (uniqueChars.has(char)) {
      duplicateChars.push(char);
    } else {
      uniqueChars.add(char);
    }
  });

  if (invalidChars.length > 0) {
    input.setCustomValidity(`Invalid characters: ${[...new Set(invalidChars)].join(', ')}`);
  } else if (chars.length > length) {
    input.setCustomValidity(`Maximum ${length} digits allowed`);
  } else if (duplicateChars.length > 0) {
    input.setCustomValidity(
      `Repeated characters are not allowed: ${[...new Set(duplicateChars)].join(', ')}`,
    );
  } else {
    input.setCustomValidity('');
  }

  input.reportValidity();

  input.value = chars
    .filter(validator)
    .filter((char, index, array) => array.indexOf(char) === index)
    .slice(0, length)
    .join('')
    .toUpperCase();
}
