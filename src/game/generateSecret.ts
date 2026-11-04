import { BaseConfig } from "./base";
import type { Base, BaseObject } from "./types";

export function generateSecret(length: number, base: Base, random: () => number = Math.random): string {
  const baseConfig: BaseObject = BaseConfig[base];

  if (!Number.isInteger(length) || length < 0) {
    throw new Error('Length must be a non-negative integer');
  }

  if (length > baseConfig.maxLength) {
    throw new Error('Length cannot exceed base');
  }

  const availableChars = [...baseConfig.availableChars];
  const secret: string[] = [];

  while (secret.length < length) {
    const randomValue = random();

    if (!Number.isFinite(randomValue) || randomValue < 0 || randomValue >= 1) {
      throw new Error('Random function must return a number between 0 and 1');
    }

    const randomIndex = Math.floor(randomValue * availableChars.length);
    secret.push(availableChars.splice(randomIndex, 1)[0]);
  }

  return secret.join('');
}