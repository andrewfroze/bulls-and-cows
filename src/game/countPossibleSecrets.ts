import { memo } from '../utils/memo';
import { BaseConfig } from './base';
import type { Base, BaseObject } from './types';

export function countPossibleSecrets(length: number, base: Base): number {
  const baseConfig: BaseObject = BaseConfig[base];

  if (length < 0) {
    throw new Error('Length cannot be negative');
  }

  if (length > baseConfig.maxLength) {
    throw new Error('Length cannot exceed base');
  }

  const count = memo((length: number, base: number): number => {
    if (base === 0 || length === 0) {
      return 1;
    }

    return base * count(length - 1, base - 1);
  });

  return count(length, baseConfig.maxLength);
}
