import { renderStartScreen } from '../components/startScreen';
import { renderGameScreen } from '../components/gameScreen';
import { Base } from '../game/types';

export function start(): void {
  document.body.replaceChildren(...renderStartScreen(startGame));
}

function startGame(base: Base, length: number): void {
  document.body.replaceChildren(
    ...renderGameScreen({
      base,
      length,
      onNewGame: start,
      // todo open leaderboard
      onOpenLeaderboard: () => undefined,
    }),
  );
}
