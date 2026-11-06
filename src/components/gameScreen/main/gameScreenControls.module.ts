import { Status, type GameState } from '../../../game';
import styles from '../gameScreen.module.css';

export function disableIfFinished(main: HTMLElement, state: GameState): void {
  if (state.status !== Status.FINISHED) return;

  const input = main.querySelector<HTMLInputElement>(`.${styles['game-input']}`);
  const checkButton = main.querySelector<HTMLButtonElement>(`.${styles['check-button']}`);
  const availableButtons = main.querySelectorAll<HTMLButtonElement>(
    `.${styles['available-chars__button']}`,
  );

  if (input) input.disabled = true;
  if (checkButton) checkButton.disabled = true;

  availableButtons.forEach((button) => {
    button.disabled = true;
  });
}