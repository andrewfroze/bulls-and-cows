import { renderLeaderboardModal, renderVictoryModal } from '../../components/modal';
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
import { saveRecord } from '../../game/leaderboard/leaderboardStorage';
import { EvaluationResult } from '../../game/types.module';

export class GameController {
  private state: GameState = getGameState();
  private timerId: ReturnType<typeof setInterval> | null = null;
  private gameStartedAt = 0;

  public constructor(
    private readonly onStateChange: (state: GameState) => void,
    private readonly openHome: () => void,
  ) {}

  public startGame(settings: Settings): void {
    this.stopTimer();
    this.state = getGameState(settings);

    const secret = generateSecret(settings.length, settings.base);

    this.state = updateSecret(this.state, secret);

    this.startTimer();
    this.notify();
  }

  public makeGuess(guess: string): Turn {
    if (this.state.status !== Status.PROGRESS) {
      throw new Error('Game is not in progress');
    }

    console.log(this.state.secret);
    const result: EvaluationResult = evaluateGuess(this.state.secret, guess);
    const turn: Turn = { guess, result };

    this.state = addTurn(this.state, turn);

    if (result.bulls === this.state.settings.length) {
      this.state = updateStatus(this.state, Status.FINISHED);

      this.stopTimer();

      const elapsedSeconds = Math.floor((Date.now() - this.gameStartedAt) / 1000);

      this.state = updateTime(this.state, elapsedSeconds);

      this.handleVictory(this.openHome);
    }

    this.notify();

    return turn;
  }

  private handleVictory(onNewGame: () => void): void {
    const state = this.getState();
    renderVictoryModal({
      attempts: state.history.length,
      time: state.time,

      onNewGame,

      onLeaderboard: () => {
        renderLeaderboardModal({
          settings: state.settings,
          onNewGame,
        });
      },
    });
    saveRecord(state.history.length, state.time, state.settings);
  }

  private startTimer(): void {
    this.gameStartedAt = Date.now();

    this.timerId = setInterval(() => {
      const elapsedSeconds = Math.floor((Date.now() - this.gameStartedAt) / 1000);

      this.updateGameTime(elapsedSeconds);
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
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
