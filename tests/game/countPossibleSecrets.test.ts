import { describe, test } from '@jest/globals';
import { countPossibleSecrets } from '../../src/game/countPossibleSecrets';
import { Base } from '../../src/game/types';

describe('countPossibleSecrets', () => {
  test('При length=1 и base=BIN функция возвращает 2', () => {
    expect(countPossibleSecrets(1, Base.BIN)).toBe(2);
  });

  test('При length=2 и base=BIN функция возвращает 2', () => {
    expect(countPossibleSecrets(2, Base.BIN)).toBe(2);
  });

  test('При length=2 и base=DEC функция возвращает 90', () => {
    expect(countPossibleSecrets(2, Base.DEC)).toBe(90);
  });

  test('При length=3 и base=DEC функция возвращает 720', () => {
    expect(countPossibleSecrets(3, Base.DEC)).toBe(720);
  });

  test('При length=4 и base=DEC функция возвращает 5040', () => {
    expect(countPossibleSecrets(4, Base.DEC)).toBe(5040);
  });

  test('При length=3 и base=HEX функция возвращает 3360', () => {
    expect(countPossibleSecrets(3, Base.HEX)).toBe(3360);
  });

  test('Функция учитывает возможность нуля в первой позиции', () => {
    expect(countPossibleSecrets(2, Base.DEC)).toBe(90);
  });

  test('Функция корректно обрабатывает length=base', () => {
    expect(countPossibleSecrets(2, Base.BIN)).toBe(2);
  });

  test('Функция возвращает 1 при length=0', () => {
    expect(countPossibleSecrets(0, Base.DEC)).toBe(1);
  });

  test('Функция выбрасывает ошибку при отрицательной длине', () => {
    expect(() => countPossibleSecrets(-1, Base.DEC)).toThrow();
  });

  test('Функция выбрасывает ошибку, если length превышает base', () => {
    expect(() => countPossibleSecrets(3, Base.BIN)).toThrow();
  });

  test('Функция использует мемоизацию для повторных вычислений', () => {
    const firstResult = countPossibleSecrets(4, Base.DEC);
    const secondResult = countPossibleSecrets(4, Base.DEC);

    expect(secondResult).toBe(firstResult);
  });

  test('Функция возвращает одинаковый результат при повторных вызовах', () => {
    expect(countPossibleSecrets(3, Base.DEC)).toBe(countPossibleSecrets(3, Base.DEC));
  });
});
