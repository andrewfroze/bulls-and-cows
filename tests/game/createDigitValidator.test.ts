import { describe, test } from '@jest/globals';
import { createDigitValidator } from '../../src/game/createDigitValidator';
import { Base } from '../../src/game/types';

describe('createDigitValidator', () => {
  test('Функция возвращает функцию-предикат', () => {
    const validator = createDigitValidator(Base.DEC);

    expect(typeof validator).toBe('function');
  });

  test("В BIN-режиме валидатор принимает символ '0'", () => {
    const validator = createDigitValidator(Base.BIN);

    expect(validator('0')).toBe(true);
  });

  test("В BIN-режиме валидатор принимает символ '1'", () => {
    const validator = createDigitValidator(Base.BIN);

    expect(validator('1')).toBe(true);
  });

  test("В BIN-режиме валидатор отклоняет символ '2'", () => {
    const validator = createDigitValidator(Base.BIN);

    expect(validator('2')).toBe(false);
  });

  test("В OCT-режиме валидатор принимает символ '7'", () => {
    const validator = createDigitValidator(Base.OCT);

    expect(validator('7')).toBe(true);
  });

  test("В OCT-режиме валидатор отклоняет символ '8'", () => {
    const validator = createDigitValidator(Base.OCT);

    expect(validator('8')).toBe(false);
  });

  test("В DEC-режиме валидатор принимает символ '9'", () => {
    const validator = createDigitValidator(Base.DEC);

    expect(validator('9')).toBe(true);
  });

  test("В DEC-режиме валидатор отклоняет символ 'A'", () => {
    const validator = createDigitValidator(Base.DEC);

    expect(validator('A')).toBe(false);
  });

  test("В HEX-режиме валидатор принимает символ '9'", () => {
    const validator = createDigitValidator(Base.HEX);

    expect(validator('9')).toBe(true);
  });

  test("В HEX-режиме валидатор принимает символ 'A'", () => {
    const validator = createDigitValidator(Base.HEX);

    expect(validator('A')).toBe(true);
  });

  test("В HEX-режиме валидатор принимает символ 'F'", () => {
    const validator = createDigitValidator(Base.HEX);

    expect(validator('F')).toBe(true);
  });

  test("В HEX-режиме валидатор принимает символ 'a'", () => {
    const validator = createDigitValidator(Base.HEX);

    expect(validator('a')).toBe(true);
  });

  test("В HEX-режиме валидатор принимает символ 'f'", () => {
    const validator = createDigitValidator(Base.HEX);

    expect(validator('f')).toBe(true);
  });

  test("В HEX-режиме валидатор отклоняет символ 'G'", () => {
    const validator = createDigitValidator(Base.HEX);

    expect(validator('G')).toBe(false);
  });

  test('Валидатор отклоняет пустую строку', () => {
    const validator = createDigitValidator(Base.DEC);

    expect(validator('')).toBe(false);
  });

  test('Валидатор отклоняет строку из нескольких символов', () => {
    const validator = createDigitValidator(Base.DEC);

    expect(validator('12')).toBe(false);
    expect(validator('AB')).toBe(false);
  });

  test('Валидатор отклоняет специальные символы', () => {
    const validator = createDigitValidator(Base.HEX);

    expect(validator('@')).toBe(false);
    expect(validator('-')).toBe(false);
    expect(validator('.')).toBe(false);
    expect(validator(' ')).toBe(false);
    expect(validator('\n')).toBe(false);
  });

  test('Валидатор не изменяет переданный символ', () => {
    const validator = createDigitValidator(Base.HEX);
    const char = 'A';

    validator(char);

    expect(char).toBe('A');
  });
});
