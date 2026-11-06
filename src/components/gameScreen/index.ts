import { Base, GameState, Settings } from '../../game';
import { GameScreenHeader, renderHeader, updateTimer } from './header/header.module';
import { renderMain } from './main/main.module';
import { GameScreenFooter, renderFooter } from './footer/footer.module';
import { updateHistory } from './footer/attemptHistory.module';
import { disableIfFinished } from './main/gameScreenControls.module';

export interface GameScreenOptions {
  base: Base;
  length: number;
  onNewGame: () => void;
  onOpenLeaderboard: (settings: Settings) => void;
  onSubmitGuess: (guess: string) => void;
  isHasDuplicates: (guess: string) => boolean;
}

let header: GameScreenHeader;
let main: HTMLElement;
let footer: GameScreenFooter;

export function renderGameScreen(options: GameScreenOptions): HTMLElement[] {
  header = renderHeader({
    onNewGame: options.onNewGame,
    onOpenLeaderboard: () =>
      options.onOpenLeaderboard({ base: options.base, length: options.length }),
  });
  main = renderMain({
    base: options.base,
    length: options.length,
    onSubmitGuess: options.onSubmitGuess,
    isHasDuplicates: options.isHasDuplicates,
  });
  footer = renderFooter();
  return [header.element, main, footer.element];
}

export function updateGameScreen(state: GameState): void {
  updateHistory(footer.element, state.history);
  updateTimer(header.timer, state.time);
  disableIfFinished(main, state);
}
