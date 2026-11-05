import { createElement } from '../utils/elementFactory';
import styles from './startScreen.module.css';

export function renderHeader(): HTMLElement {
  return createElement(
    'header',
    {
      className: styles['start-screen-header'],
    },
    [
      createElement('h1', {
        className: styles['game-title'],
        textContent: 'Bulls & Cows',
      }),
    ],
  );
}
