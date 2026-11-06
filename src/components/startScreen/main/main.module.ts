import { createElement } from '../../utils/elementFactory';
import { Base } from '../../../game';
import { createSettingsControls } from './settingsControls.module';
import { createActionCarousel } from './actionCarousel.module';
import { getFormParameters } from './formParameters.module';
import styles from '../startScreen.module.css';

export function renderMain(
  onStartGame: (base: Base, length: number) => void,
  onOpenLeaderboard: (base: Base, length: number) => void,
): HTMLElement {
  const settings = createSettingsControls();
  const carousel = createActionCarousel();

  const form = createElement(
    'form',
    {
      className: styles['game-settings'],
    },
    [
      settings.baseDropdown,
      settings.secretLengthDropdown,
      carousel.element,
    ],
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();

    const { base, length } = getFormParameters(form);

    onStartGame(base, length);
  });

  carousel.leaderboardButton.addEventListener('click', () => {
    const { base, length } = getFormParameters(form);

    onOpenLeaderboard(base, length);
  });

  return createElement(
    'main',
    {
      className: styles['start-screen-main'],
    },
    [form, settings.combinationsInfo],
  );
}