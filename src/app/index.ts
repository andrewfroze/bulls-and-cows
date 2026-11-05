import { renderStartScreen } from '../components/startScreen';
import { renderGameScreen, updateGameScreen } from '../components/gameScreen';
import { Base } from '../game/types.module';
import { GameController } from './controllers/gameController';

export function start(): void {
  document.body.replaceChildren(...renderStartScreen(startGame));
}

function startGame(base: Base, length: number): void {
  const gameController: GameController = new GameController(updateGameScreen);
  document.body.replaceChildren(
    ...renderGameScreen({
      base,
      length,
      onNewGame: start,
      onOpenLeaderboard: () => undefined,
      onSubmitGuess: (guess: string) => gameController.makeGuess(guess),
    }),
  );
  gameController.startGame({base, length});
}
