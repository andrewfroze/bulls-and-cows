import { Base, Status, type GameState, type Settings, type Turn } from '../types.module';

export function getGameState(
  settings: Settings = { base: Base.DEC, length: 4 }
): GameState {
  return {
    secret: '',
    history: [],
    settings: {...settings},
    status: Status.PROGRESS,
    time: 0,
  };
}

export function updateSecret(state: GameState, secret: string): GameState {
    return {
        ...state,
        secret,
    };
}

export function addTurn(state: GameState, turn: Turn): GameState {
  return {
    ...state,
    history: [...state.history, turn],
  };
}

export function updateSettings(state: GameState, settings: Settings): GameState {
  return {
    ...state,
    settings: { ...settings },
  };
}

export function updateStatus(state: GameState, status: Status): GameState {
  return {
    ...state,
    status: status,
  };
}

export function updateTime(state: GameState, time: number): GameState {
    return {
        ...state,
        time,
    };
}
