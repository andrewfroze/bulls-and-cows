import { describe, expect, test } from '@jest/globals';
import { isValidGuess } from '../../src/game/isValidGuess';
import { Base } from '../../src/game/types';

describe('isValidGuess', () => {
  test("Для guess='1234', length=4, base=DEC функция возвращает true", () => {
    expect(isValidGuess('1234', 4, Base.DEC)).toBe(true);
  });

  test("Для guess='0123', length=4, base=DEC функция возвращает true", () => {
    expect(isValidGuess('0123', 4, Base.DEC)).toBe(true);
  });

  test("Для guess='1023', length=4, base=DEC функция возвращает true", () => {
    expect(isValidGuess('1023', 4, Base.DEC)).toBe(true);
  });

  test("Для guess='1123', length=4, base=DEC функция возвращает false", () => {
    expect(isValidGuess('1123', 4, Base.DEC)).toBe(false);
  });

  test("Для guess='123', length=4, base=DEC функция возвращает false", () => {
    expect(isValidGuess('123', 4, Base.DEC)).toBe(false);
  });

  test("Для guess='12345', length=4, base=DEC функция возвращает false", () => {
    expect(isValidGuess('12345', 4, Base.DEC)).toBe(false);
  });

  test("Для guess='12a4', length=4, base=DEC функция возвращает false", () => {
    expect(isValidGuess('12a4', 4, Base.DEC)).toBe(false);
  });

  test("Для guess='102', length=3, base=BIN функция возвращает false", () => {
    expect(isValidGuess('102', 3, Base.BIN)).toBe(false);
  });

  test("Для guess='01', length=2, base=BIN функция возвращает true", () => {
    expect(isValidGuess('01', 2, Base.BIN)).toBe(true);
  });

  test("Для guess='02', length=2, base=BIN функция возвращает false", () => {
    expect(isValidGuess('02', 2, Base.BIN)).toBe(false);
  });

  test("Для guess='1A3F', length=4, base=HEX функция возвращает true", () => {
    expect(isValidGuess('1A3F', 4, Base.HEX)).toBe(true);
  });

  test("Для guess='1a3f', length=4, base=HEX функция возвращает true", () => {
    expect(isValidGuess('1a3f', 4, Base.HEX)).toBe(true);
  });

  test("Для guess='1aAf', length=4, base=HEX функция возвращает false", () => {
    expect(isValidGuess('1aAf', 4, Base.HEX)).toBe(false);
  });

  test('Функция проверяет точное соответствие длины guess параметру length', () => {
    expect(isValidGuess('123', 4, Base.DEC)).toBe(false);
    expect(isValidGuess('12345', 4, Base.DEC)).toBe(false);
    expect(isValidGuess('1234', 4, Base.DEC)).toBe(true);
  });

  test('Функция отклоняет пустую строку', () => {
    expect(isValidGuess('', 0, Base.DEC)).toBe(false);
    expect(isValidGuess('', 4, Base.DEC)).toBe(false);
  });

  test('Функция отклоняет строку с повторяющимися цифрами', () => {
    expect(isValidGuess('1123', 4, Base.DEC)).toBe(false);
    expect(isValidGuess('1223', 4, Base.DEC)).toBe(false);
    expect(isValidGuess('1233', 4, Base.DEC)).toBe(false);
  });

  test('Функция отклоняет недопустимые символы', () => {
    expect(isValidGuess('12a4', 4, Base.DEC)).toBe(false);
    expect(isValidGuess('12@4', 4, Base.DEC)).toBe(false);
    expect(isValidGuess('12-4', 4, Base.DEC)).toBe(false);
    expect(isValidGuess('12 4', 4, Base.DEC)).toBe(false);
  });

  test('Функция не учитывает регистр hex-символов при проверке повторений', () => {
    expect(isValidGuess('1aAf', 4, Base.HEX)).toBe(false);
    expect(isValidGuess('aAbB', 4, Base.HEX)).toBe(false);
    expect(isValidGuess('1a2F', 4, Base.HEX)).toBe(true);
  });
});
