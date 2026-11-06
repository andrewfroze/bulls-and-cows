import { createElement } from '../../utils/elementFactory';
import { createAttemptHistory } from './attemptHistory.module';
import styles from '../gameScreen.module.css';

export interface GameScreenFooter {
  element: HTMLElement;
  historyList: HTMLElement;
}

export function renderFooter(): GameScreenFooter {
  const title = createElement('h2', {
    textContent: 'ATTEMPT HISTORY',
  });

  const historyList = createAttemptHistory();

  const element = createElement(
    'footer',
    {
      className: styles['game-screen-footer'],
    },
    [title, historyList],
  );

  return {
    element,
    historyList,
  };
}
