import { BaseConfig } from "./base";
import type { Base, BaseObject } from "./types";

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

  const baseConfig: BaseObject = BaseConfig[base];

  const areAllCharsValid: boolean = uniqueChars.values().every((char) => baseConfig.availableChars.includes(char));

  if (!areAllCharsValid) {
    return false;
  }


  return true;
}