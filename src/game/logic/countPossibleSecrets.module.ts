import { memo } from '../../utils/memo';
import { BaseConfig } from '../base.module';
import type { Base, BaseObject } from '../types.module';

const memoizedCount = memo((length: number, base: number): number => {
  if (base === 0 || length === 0) return 1;
  return base * memoizedCount(length - 1, base - 1);
});

export function countPossibleSecrets(length: number, base: Base): number {
  const baseConfig: BaseObject = BaseConfig[base];

  if (length < 0) {
    throw new Error('Length cannot be negative');
  }

  if (length > baseConfig.maxLength) {
    throw new Error('Length cannot exceed base');
  }

  return memoizedCount(length, baseConfig.maxLength);
}
