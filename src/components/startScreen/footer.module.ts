import { createElement } from '../utils/elementFactory';
import githubLogo from '../../assets/github.svg';
import styles from './startScreen.module.css';

export function renderFooter(): HTMLElement {
  return createElement(
    'footer',
    {
      className: styles['start-screen-footer'],
    },
    [
      createElement(
        'a',
        {
          className: styles['github-link'],
          href: 'https://github.com/andrewfroze',
        },
        [
          createElement('img', {
            className: styles['github-logo'],
            src: githubLogo,
            alt: 'github-logo',
          }),
        ],
      ),
      createElement(
        'a',
        {
          className: styles['course-link'],
          href: 'https://rs.school/courses/javascript',
        },
        [
          createElement('img', {
            className: 'course-logo',
            src: 'https://rs.school/_next/static/media/rss-logo.c19ce1b4.svg',
            alt: 'course-logo',
          }),
        ],
      ),
      createElement('label', {
        className: styles['name-year-label'],
        textContent: 'Andrei Nikiporchyk, 2026',
      }),
    ],
  );
}
