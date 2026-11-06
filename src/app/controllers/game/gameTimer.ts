export class GameTimer {
  private intervalId: ReturnType<typeof setInterval> | null = null;
  private startedAt = 0;

  public start(onTick: (elapsedSeconds: number) => void): void {
    this.stop();

    this.startedAt = Date.now();

    this.intervalId = setInterval(() => {
      onTick(this.getElapsedSeconds());
    }, 1000);
  }

  public stop(): number {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    return this.getElapsedSeconds();
  }

  public getElapsedSeconds(): number {
    if (this.startedAt === 0) {
      return 0;
    }

    return Math.floor((Date.now() - this.startedAt) / 1000);
  }
}
