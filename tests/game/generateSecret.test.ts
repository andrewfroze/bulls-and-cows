import { describe, expect, jest, test } from '@jest/globals';
import { generateSecret } from '../../src/game/generateSecret';
import { Base } from '../../src/game/types';

describe('generateSecret', () => {
  test("При передаче параметров (length=2, base=BIN, random=0) функция возвращает '01'", () => {
    expect(generateSecret(2, Base.BIN, () => 0)).toBe('01');
  });

  test("При передаче параметров (length=8, base=OCT, random=0) функция возвращает '012345678'", () => {
    expect(generateSecret(8, Base.OCT, () => 0)).toBe('01234567');
  });

  test("При передаче параметров (length=10, base=DEC, random=0) функция возвращает '0123456789'", () => {
    expect(generateSecret(10, Base.DEC, () => 0)).toBe('0123456789');
  });

  test("При передаче параметров (length=16, base=HEX, random=0) функция возвращает '0123456789abcdef'", () => {
    expect(generateSecret(16, Base.HEX, () => 0)).toBe('0123456789abcdef');
  });

  test('Функция генерирует секретное число заданной длины', () => {
    const secret = generateSecret(4, Base.DEC);

    expect(secret).toHaveLength(4);
  });

  test('Функция не допускает повторения цифр в секретном числе', () => {
    const secret = generateSecret(6, Base.DEC);

    expect(new Set(secret).size).toBe(secret.length);
  });

  test('Функция генерирует разные результаты при разных значениях random', () => {
    const firstSecret = generateSecret(4, Base.DEC, () => 0);
    const secondSecret = generateSecret(4, Base.DEC, () => 0.5);

    expect(firstSecret).not.toBe(secondSecret);
  });

  test('Функция выбрасывает ошибку при отрицательной длине', () => {
    expect(() => generateSecret(-1, Base.DEC)).toThrow();
  });

  test('Функция выбрасывает ошибку при длине, превышающей количество доступных цифр', () => {
    expect(() => generateSecret(3, Base.BIN)).toThrow();
    expect(() => generateSecret(11, Base.DEC)).toThrow();
    expect(() => generateSecret(17, Base.HEX)).toThrow();
  });

  test('Функция выбрасывает ошибку при некорректной длине', () => {
    expect(() => generateSecret(1.5, Base.DEC)).toThrow();
    expect(() => generateSecret(NaN, Base.DEC)).toThrow();
  });
});