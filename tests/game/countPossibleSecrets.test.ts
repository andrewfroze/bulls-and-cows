import { describe, test } from '@jest/globals';

describe('countPossibleSecrets', () => {
    test.todo('При length=1 и base=BIN функция возвращает 2');
    test.todo('При length=2 и base=BIN функция возвращает 2');
    test.todo('При length=2 и base=DEC функция возвращает 90');
    test.todo('При length=3 и base=DEC функция возвращает 720');
    test.todo('При length=4 и base=DEC функция возвращает 5040');
    test.todo('При length=3 и base=HEX функция возвращает 3360');
    test.todo('Функция учитывает возможность нуля в первой позиции');
    test.todo('Функция вычисляет количество перестановок без повторений');
    test.todo('Функция корректно обрабатывает length=base');
    test.todo('Функция возвращает 1 при length=0');
    test.todo('Функция выбрасывает ошибку при отрицательной длине');
    test.todo('Функция выбрасывает ошибку при отрицательном основании');
    test.todo('Функция выбрасывает ошибку, если length превышает base');
    test.todo('Функция использует мемоизацию для повторных вычислений');
    test.todo('Функция возвращает одинаковый результат при повторных вызовах');
});