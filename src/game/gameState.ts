import type { GameState, Settings, Status, Turn } from "./types";

export function getGameState(): GameState {
  throw new Error("Not implemented");
}

export function addTurn(state: GameState, turn: Turn): GameState {
    throw new Error('Not implemented');
}

export function updateSettings(state: GameState, settings: Settings): GameState {
    throw new Error('Not implemented');
}

export function updateStatus(state: GameState, status: Status): GameState {
    throw new Error('Not implemented');
}