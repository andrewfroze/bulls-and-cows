import { Base, GameState, Settings } from '../../game';
import { renderHeader, updateTimer } from './header.module';
import { disableIfFinished, renderMain } from './main.module';
import { renderFooter, updateHistory } from './footer.module';

export interface GameScreenOptions {
  base: Base;
  length: number;
  onNewGame: () => void;
  onOpenLeaderboard: (settings: Settings) => void;
  onSubmitGuess: (guess: string) => void;
  isHasDuplicates: (guess: string) => boolean;
}

let header;
let main;
let footer;

export function renderGameScreen(options: GameScreenOptions): HTMLElement[] {
  header = renderHeader({
    onNewGame: options.onNewGame,
    onOpenLeaderboard: () => options.onOpenLeaderboard({ base: options.base, length: options.length }),
  });
  main = renderMain({
    base: options.base,
    length: options.length,
    onSubmitGuess: options.onSubmitGuess,
    isHasDuplicates: options.isHasDuplicates,
  });
  footer = renderFooter();
  return [header, main, footer];
}

export function updateGameScreen(state: GameState): void {
  updateHistory(state.history);
  updateTimer(state.time);
  disableIfFinished(state);
}
