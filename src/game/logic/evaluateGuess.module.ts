import type { EvaluationResult } from '../types.module';

export function evaluateGuess(secret: string, guess: string): EvaluationResult {
  const secretChars: string[] = secret.toLowerCase().split('');
  const guessChars: string[] = guess.toLowerCase().split('');

  return guessChars.reduce(
    (result: EvaluationResult, currentChar: string, index: number) => {
      if (secretChars[index] === currentChar) {
        result.bulls += 1;
      } else if (secretChars.includes(currentChar)) {
        result.cows += 1;
      }
      return result;
    },
    {
      bulls: 0,
      cows: 0,
    },
  );
}
