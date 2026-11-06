import {
  generateSecret,
  getGameState,
  addTurn,
  updateStatus,
  updateTime,
  Status,
  type GameState,
  type Settings,
  type Turn,
} from '../../game/logic';

export class GameController {
  private state: GameState = getGameState();

  private timerId: ReturnType<typeof setInterval> | null = null;

  constructor(private readonly onTimeChange: (time: number) => void) {}

  getState(): GameState {
    return this.state;
  }

  startGame(settings: Settings): GameState {
    this.stopTimer();

    const secret = generateSecret(settings.length, settings.base);

    this.state = {
      ...getGameState(settings),
      secret,
      status: Status.PROGRESS,
    };

    this.startTimer();

    return this.state;
  }

  addTurn(turn: Turn): GameState {
    this.state = addTurn(this.state, turn);

    return this.state;
  }

  finishGame(): GameState {
    this.state = updateStatus(this.state, Status.FINISHED);

    this.stopTimer();

    return this.state;
  }

  private startTimer(): void {
    this.timerId = setInterval(() => {
      if (this.state.status !== Status.PROGRESS) {
        this.stopTimer();
        return;
      }

      this.state = updateTime(this.state, this.state.time + 1);

      this.onTimeChange(this.state.time);
    }, 1000);
  }

  private stopTimer(): void {
    if (this.timerId !== null) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }
}
