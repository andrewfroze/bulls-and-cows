import {
  generateSecret,
  getGameState,
  evaluateGuess,
  updateSecret,
  addTurn,
  updateStatus,
  updateTime,
  Status,
  type GameState,
  type Settings,
  type Turn,
} from '../../game';
import type { EvaluationResult } from '../../game/types.module';

import { GameTimer } from './game/gameTimer';
import { handleVictory } from './game/victoryHandler';

export class GameController {
  private state: GameState = getGameState();
  private readonly timer = new GameTimer();

  public constructor(
    private readonly onTimerChange: (seconds: number) => void,
    private readonly onStateChange: (state: GameState) => void,
    private readonly openHome: () => void,
  ) {}

  public startGame(settings: Settings): void {
    this.timer.stop();

    const secret = generateSecret(settings.length, settings.base);

    this.state = updateSecret(getGameState(settings), secret);

    this.timer.start((elapsedSeconds) => {
      this.updateGameTime(elapsedSeconds);
    });

    this.notify();
  }

  public makeGuess(guess: string): Turn {
    if (this.state.status !== Status.PROGRESS) {
      throw new Error('Game is not in progress');
    }

    const result: EvaluationResult = evaluateGuess(this.state.secret, guess);
    const turn: Turn = { guess, result };

    this.state = addTurn(this.state, turn);

    if (result.bulls === this.state.settings.length) {
      this.finishGame();
    }

    this.notify();

    return turn;
  }

  private finishGame(): void {
    const elapsedSeconds = this.timer.stop();

    this.state = updateStatus(this.state, Status.FINISHED);
    this.state = updateTime(this.state, elapsedSeconds);

    handleVictory(this.state, this.openHome);
  }

  public stopGame(): void {
    this.timer.stop();
  }

  public updateGameTime(time: number): void {
    if (this.state.status !== Status.PROGRESS) {
      return;
    }

    this.state = updateTime(this.state, time);
    this.onTimerChange(time);
  }

  public getState(): GameState {
    return this.state;
  }

  private notify(): void {
    this.onStateChange(this.state);
  }
}
