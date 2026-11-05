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
import { EvaluationResult } from '../../game/types.module';

export class GameController {
  private state: GameState = getGameState();

  public constructor(
    private readonly onStateChange: (state: GameState) => void,
  ) {}

  public startGame(settings: Settings): void {
    this.state = getGameState(settings);

    const secret = generateSecret(
      settings.length,
      settings.base,
    );

    this.state = updateSecret(this.state, secret);

    this.notify();
  }

  public makeGuess(guess: string): Turn {
    if (this.state.status !== Status.PROGRESS) {
      throw new Error('Game is not in progress');
    }

    console.log(this.state.secret);
    const result: EvaluationResult = evaluateGuess(this.state.secret, guess);
    console.log(result);
    const turn: Turn = { guess, result };

    this.state = addTurn(this.state, turn);

    if (result.bulls === this.state.settings.length) {
      this.state = updateStatus(this.state, Status.FINISHED);
    }

    this.notify();

    return turn;
  }

  public updateGameTime(time: number): void {
    this.state = updateTime(this.state, time);
    this.notify();
  }

  public getState(): GameState {
    return this.state;
  }

  private notify(): void {
    this.onStateChange(this.state);
  }
}