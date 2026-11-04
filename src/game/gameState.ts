import { Base, Status, type GameState, type Settings, type Turn } from "./types";

export function getGameState(): GameState {
  return {
    secret: '',
    history: [],
    settings: {
      base: Base.DEC,
    },
    status: Status.PROGRESS,
    time: 0,
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