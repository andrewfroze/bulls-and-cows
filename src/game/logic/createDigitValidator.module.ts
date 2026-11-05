import { BaseConfig } from '../base.module';
import type { Base, BaseObject } from '../types.module';

export function createDigitValidator(base: Base): (value: string) => boolean {
  const baseConfig: BaseObject = BaseConfig[base];
  return (char) => baseConfig.availableChars.includes(char.toLowerCase());
}
