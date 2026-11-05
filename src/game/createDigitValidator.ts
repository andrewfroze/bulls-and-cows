import { BaseConfig } from './base';
import type { Base, BaseObject } from './types';

export function createDigitValidator(base: Base): (value: string) => boolean {
  const baseConfig: BaseObject = BaseConfig[base];
  return (char) => baseConfig.availableChars.includes(char.toLowerCase());
}
