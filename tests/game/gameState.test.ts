import { describe, expect, test } from '@jest/globals';
import { addTurn, updateSettings, updateStatus } from '../../src/game/gameState';
import { Base } from '../../src/game/types';
import type { GameState, Turn, Settings, Status } from '../../src/game/types';

describe('Game state immutability', () => {
  const initialState: GameState = {
    secret: '1234',
    history: [
      {
        guess: '1256',
        result: {
          bulls: [0, 1],
          cows: [],
        },
      },
    ],
    settings: {
      base: Base.DEC,
    },
    status: 'progress' as Status,
    time: 0,
  };

  const newTurn: Turn = {
    guess: '1234',
    result: {
      bulls: [0, 1, 2, 3],
      cows: [],
    },
  };

  test('Добавление попытки создаёт новый массив истории', () => {
    const newState = addTurn(initialState, newTurn);

    expect(newState.history).not.toBe(initialState.history);
  });

  test('Добавление попытки не изменяет исходную историю', () => {
    const originalHistory = [...initialState.history];

    addTurn(initialState, newTurn);

    expect(initialState.history).toEqual(originalHistory);
    expect(initialState.history).toHaveLength(1);
  });

  test('Добавление попытки сохраняет все предыдущие записи', () => {
    const newState = addTurn(initialState, newTurn);

    expect(newState.history[0]).toEqual(initialState.history[0]);
  });

  test('Добавление попытки добавляет новую запись в конец истории', () => {
    const newState = addTurn(initialState, newTurn);

    expect(newState.history[newState.history.length - 1]).toEqual(newTurn);
  });

  test('Обновление настроек создаёт новый объект состояния', () => {
    const newSettings: Settings = {
      base: Base.HEX,
    };

    const newState = updateSettings(initialState, newSettings);

    expect(newState).not.toBe(initialState);
    expect(newState.settings).not.toBe(initialState.settings);
    expect(newState.settings).toEqual(newSettings);
  });

  test('Обновление статуса создаёт новый объект состояния', () => {
    const newStatus = 'finished' as Status;

    const newState = updateStatus(initialState, newStatus);

    expect(newState).not.toBe(initialState);
    expect(newState.status).toBe(newStatus);
  });

  test('Обновление состояния не изменяет исходный объект', () => {
    const originalState = structuredClone(initialState);

    addTurn(initialState, newTurn);
    updateSettings(initialState, { base: Base.HEX });
    updateStatus(initialState, 'finished' as Status);

    expect(initialState).toEqual(originalState);
  });
});
