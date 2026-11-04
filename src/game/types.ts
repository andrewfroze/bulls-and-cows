export interface EvaluationResult {
  bulls: number[];
  cows: number[];
}

export interface BaseObject {
  maxLength: number;
  availableChars: string[];
  label: string;
};

export enum Base {
    BIN = 'BIN',
    OCT = 'OCT',
    DEC = 'DEC',
    HEX = 'HEX',
};

export enum Status {
  PROGRESS = 'progress',
  FINISHED = 'finished'
}

export interface GameState {
  secret: string;
  history: Turn[];
  settings: Settings;
  status: Status;
  time: number;
}

export interface Turn {
  guess: string;
  result: EvaluationResult
}

export interface Settings {
  base: Base
}