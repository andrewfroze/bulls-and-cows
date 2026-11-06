import { renderStartScreen } from '../components/startScreen';
import { renderGameScreen, updateGameScreen } from '../components/gameScreen';
import { Base, Settings } from '../game/types.module';
import { renderLeaderboardModal } from '../components/modal';
import { GameController } from './controllers/gameController';
import { isHistoryContainsGuess } from '../game';

export function start(): void {
  document.body.replaceChildren(...renderStartScreen(startGame, (settings: Settings) => openLeaderboard(settings)));
}

function startGame(base: Base, length: number): void {
  const gameController: GameController = new GameController(updateGameScreen, start);
  document.body.replaceChildren(
    ...renderGameScreen({
      base,
      length,
      onNewGame: start,
      onOpenLeaderboard: (settings: Settings) => openLeaderboard(settings),
      onSubmitGuess: (guess: string) => gameController.makeGuess(guess),
      isHasDuplicates: (guess: string) => isHistoryContainsGuess(gameController.getState(), guess),
    }),
  );
  gameController.startGame({ base, length });
}

  function openLeaderboard(settings: Settings): void {
    renderLeaderboardModal({
      settings,
    });
  }
