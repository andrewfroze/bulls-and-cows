import { describe, expect, test } from '@jest/globals';
import { evaluateGuess } from '../../src/game/evaluateGuess';

describe('evaluateGuess', () => {
  test("При secret='1234' и guess='1234' функция возвращает { bulls: [0, 1, 2, 3], cows: [] }", () => {
    expect(evaluateGuess('1234', '1234')).toEqual({
      bulls: [0, 1, 2, 3],
      cows: [],
    });
  });

  test("При secret='1234' и guess='4321' функция возвращает { bulls: [], cows: [0, 1, 2, 3] }", () => {
    expect(evaluateGuess('1234', '4321')).toEqual({
      bulls: [],
      cows: [0, 1, 2, 3],
    });
  });

  test("При secret='1234' и guess='1243' функция возвращает { bulls: [0, 1], cows: [2, 3] }", () => {
    expect(evaluateGuess('1234', '1243')).toEqual({
      bulls: [0, 1],
      cows: [2, 3],
    });
  });

  test("При secret='1234' и guess='5678' функция возвращает { bulls: [], cows: [] }", () => {
    expect(evaluateGuess('1234', '5678')).toEqual({
      bulls: [],
      cows: [],
    });
  });

  test("При secret='0123' и guess='0123' функция возвращает { bulls: [0, 1, 2, 3], cows: [] }", () => {
    expect(evaluateGuess('0123', '0123')).toEqual({
      bulls: [0, 1, 2, 3],
      cows: [],
    });
  });

  test('Функция корректно определяет количество быков', () => {
    expect(evaluateGuess('1234', '1256')).toEqual({
      bulls: [0, 1],
      cows: [],
    });

    expect(evaluateGuess('1234', '9234')).toEqual({
      bulls: [1, 2, 3],
      cows: [],
    });
  });

  test('Функция корректно определяет количество коров', () => {
    expect(evaluateGuess('1234', '4321')).toEqual({
      bulls: [],
      cows: [0, 1, 2, 3],
    });

    expect(evaluateGuess('1234', '2143')).toEqual({
      bulls: [],
      cows: [0, 1, 2, 3],
    });
  });

  test('Функция не учитывает совпадения отсутствующих в секрете цифр', () => {
    expect(evaluateGuess('1234', '5678')).toEqual({
      bulls: [],
      cows: [],
    });

    expect(evaluateGuess('1234', '1567')).toEqual({
      bulls: [0],
      cows: [],
    });
  });

  test('Функция корректно обрабатывает hex-цифры в нижнем регистре', () => {
    expect(evaluateGuess('1a2b', '1b2a')).toEqual({
      bulls: [0, 2],
      cows: [1, 3],
    });
  });

  test('Функция корректно обрабатывает hex-цифры в верхнем регистре', () => {
    expect(evaluateGuess('1A2B', '1B2A')).toEqual({
      bulls: [0, 2],
      cows: [1, 3],
    });
  });

  test('Функция считает одинаковые hex-цифры в разных регистрах совпадениями', () => {
    expect(evaluateGuess('1a2b', '1A2B')).toEqual({
      bulls: [0, 1, 2, 3],
      cows: [],
    });

    expect(evaluateGuess('1a2b', '1B2A')).toEqual({
      bulls: [0, 2],
      cows: [1, 3],
    });
  });

  test('Функция не изменяет исходную строку secret', () => {
    const secret = '1a2b';

    evaluateGuess(secret, '1A2B');

    expect(secret).toBe('1a2b');
  });

  test('Функция не изменяет исходную строку guess', () => {
    const guess = '1A2B';

    evaluateGuess('1a2b', guess);

    expect(guess).toBe('1A2B');
  });
});