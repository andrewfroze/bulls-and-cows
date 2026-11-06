import { BaseConfig } from '../base.module';
import type { Base, BaseObject } from '../types.module';
import { createDigitValidator } from './createDigitValidator.module';

export function isValidGuess(guess: string, length: number, base: Base): boolean {
  if (guess === '') {
    return false;
  }

  if (guess.length !== length) {
    return false;
  }

  const guessChars: string[] = guess.toLowerCase().split('');
  const uniqueChars: Set<string> = new Set(guessChars);

  if (uniqueChars.size !== length) {
    return false;
  }

  const digitValidator: (value: string) => boolean = createDigitValidator(base);

  const areAllCharsValid: boolean = uniqueChars.values().every((char) => digitValidator(char));

  if (!areAllCharsValid) {
    return false;
  }

  return true;
}
