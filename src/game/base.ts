import { Base, type BaseObject } from './types';

export const defaultBase = Base.DEC;

export const BaseConfig: Record<Base, BaseObject> = {
  [Base.BIN]: {
    maxLength: 2,
    availableChars: ['0', '1'],
    label: 'binary',
  },
  [Base.OCT]: {
    maxLength: 8,
    availableChars: ['0', '1', '2', '3', '4', '5', '6', '7'],
    label: 'octal',
  },
  [Base.DEC]: {
    maxLength: 10,
    availableChars: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    label: 'decimal',
  },
  [Base.HEX]: {
    maxLength: 16,
    availableChars: [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
    ],
    label: 'hexadecimal',
  },
} as const;
