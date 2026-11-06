
import { renderStartScreen } from '../components/startScreen';
import { renderGameScreen, updateGameScreen } from '../components/gameScreen';
import type { Base, Settings } from '../game';
import { renderLeaderboardModal } from '../components/modal';
import { GameController } from './controllers/gameController';
import { isHistoryContainsGuess } from '../game';

const gameController = new GameController(updateGameScreen, start);

export function start(): void {
  gameController.stopGame();

  document.body.replaceChildren(
    ...renderStartScreen(
      startGame,
      (settings: Settings) => openLeaderboard(settings),
    ),
  );
}

function startGame(base: Base, length: number): void {
  document.body.replaceChildren(
    ...renderGameScreen({
      base,
      length,
      onNewGame: start,
      onOpenLeaderboard: openLeaderboard,
      onSubmitGuess: (guess: string) => gameController.makeGuess(guess),
      isHasDuplicates: (guess: string) =>
        isHistoryContainsGuess(gameController.getState(), guess),
    }),
  );

  gameController.startGame({ base, length });
}

function openLeaderboard(settings: Settings): void {
  renderLeaderboardModal({ settings });
}
