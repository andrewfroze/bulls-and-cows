import type { EvaluationResult } from "./types";

export function evaluateGuess(secret: string, guess: string): EvaluationResult {
  const secretChars: string[] = secret.toLowerCase().split('');
  const guessChars: string[] = guess.toLowerCase().split('');

  return guessChars.reduce((result: EvaluationResult, currentChar: string, index: number) => {
    if (secretChars[index] === currentChar) {
      result.bulls.push(index);
    } else if (secretChars.includes(currentChar)) {
      result.cows.push(index);
    }
    return result;
  },
  {
    bulls: [],
    cows: []
  });
}