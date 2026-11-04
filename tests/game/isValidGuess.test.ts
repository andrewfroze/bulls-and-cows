import { describe, test } from '@jest/globals';

describe('isValidGuess', () => {
    test.todo("Для guess='1234', length=4, base=DEC функция возвращает true");
    test.todo("Для guess='0123', length=4, base=DEC функция возвращает true");
    test.todo("Для guess='1023', length=4, base=DEC функция возвращает true");
    test.todo("Для guess='1123', length=4, base=DEC функция возвращает false");
    test.todo("Для guess='123', length=4, base=DEC функция возвращает false");
    test.todo("Для guess='12345', length=4, base=DEC функция возвращает false");
    test.todo("Для guess='12a4', length=4, base=DEC функция возвращает false");
    test.todo("Для guess='102', length=3, base=BIN функция возвращает false");
    test.todo("Для guess='01', length=2, base=BIN функция возвращает true");
    test.todo("Для guess='02', length=2, base=BIN функция возвращает false");
    test.todo("Для guess='1A3F', length=4, base=HEX функция возвращает true");
    test.todo("Для guess='1a3f', length=4, base=HEX функция возвращает true");
    test.todo("Для guess='1aAf', length=4, base=HEX функция возвращает false");
    test.todo('Функция проверяет точное соответствие длины guess параметру length');
    test.todo('Функция отклоняет пустую строку');
    test.todo('Функция отклоняет строку с повторяющимися цифрами');
    test.todo('Функция отклоняет недопустимые символы');
    test.todo('Функция не учитывает регистр hex-символов при проверке повторений');
});