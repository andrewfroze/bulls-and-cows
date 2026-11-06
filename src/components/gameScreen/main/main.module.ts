import { createElement } from '../../utils/elementFactory';
import type { Base } from '../../../game';
import { createGuessForm } from './guessInput.module';
import { createAvailableChars } from './availableChars.module';
import styles from '../gameScreen.module.css';

export interface MainOptions {
  base: Base;
  length: number;
  isHasDuplicates: (guess: string) => boolean;
  onSubmitGuess: (guess: string) => void;
}

export function renderMain(options: MainOptions): HTMLElement {
  const description = createElement('p', {
    className: styles['game-description'],
    textContent: `Guess the ${options.length}-digit secret number`,
  });

  const gameInfo = createElement('label', {
    className: styles['game-info'],
    textContent: `Base: ${options.base} | Length: ${options.length}`,
  });

  const availableCharsLabel = createElement('label', {
    className: styles['available-chars'],
    textContent: 'Available symbols:',
  });

  const guessForm = createGuessForm(options);

  const input = guessForm.elements.namedItem('guess');

  if (!(input instanceof HTMLInputElement)) {
    throw new Error('Guess input not found');
  }

  const availableChars = createAvailableChars(options.base, input, options.length);

  return createElement(
    'main',
    {
      className: styles['game-screen-main'],
    },
    [description, gameInfo, availableCharsLabel, availableChars, guessForm],
  );
}
