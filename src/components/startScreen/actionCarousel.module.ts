import { createElement } from '../utils/elementFactory';
import styles from './startScreen.module.css';

export interface ActionCarousel {
  element: HTMLElement;
  startButton: HTMLButtonElement;
  leaderboardButton: HTMLButtonElement;
}

export function createActionCarousel(): ActionCarousel {
  const startButton = createElement('button', {
    className: styles['start-button'],
    textContent: 'Start',
    type: 'submit',
  });

  const leaderboardButton = createElement('button', {
    className: styles['leaderboard-button'],
    textContent: 'Leaderboard',
    type: 'button',
  });

  const previousButton = createElement('button', {
    className: styles['carousel-arrow'],
    textContent: '❮',
    type: 'button',
    title: 'Previous',
  });

  const nextButton = createElement('button', {
    className: styles['carousel-arrow'],
    textContent: '❯',
    type: 'button',
    title: 'Next',
  });

  const slides = createElement('div', {
    className: styles['carousel-slides'],
  }, [
    createElement('div', { className: styles['carousel-slide'] }, [startButton]),
    createElement('div', { className: styles['carousel-slide'] }, [leaderboardButton]),
  ]);

  const viewport = createElement('div', {
    className: styles['carousel-viewport'],
  }, [slides]);

  const element = createElement('div', {
    className: styles['action-carousel'],
  }, [previousButton, viewport, nextButton]);

  let isAnimating = false;
  let direction: 'next' | 'previous' | null = null;

  const slideToNext = (): void => {
    if (isAnimating) return;

    const lastSlide = slides.lastElementChild;

    if (!lastSlide) return;

    isAnimating = true;
    direction = 'next';

    slides.prepend(lastSlide);

    slides.style.transition = 'none';
    slides.style.transform = 'translateX(-50%)';

    void slides.offsetWidth;

    slides.style.transition = '';
    slides.style.transform = 'translateX(0)';
  };

  const slideToPrevious = (): void => {
    if (isAnimating) return;

    isAnimating = true;
    direction = 'previous';

    slides.style.transform = 'translateX(-50%)';
  };

  slides.addEventListener('transitionend', (event: TransitionEvent) => {
    if (event.target !== slides || event.propertyName !== 'transform') return;

    if (direction === 'previous') {
      const firstSlide = slides.firstElementChild;

      if (firstSlide) {
        slides.append(firstSlide);
      }
    }

    slides.style.transition = 'none';
    slides.style.transform = 'translateX(0)';

    void slides.offsetWidth;

    slides.style.transition = '';

    direction = null;
    isAnimating = false;
  });

  previousButton.addEventListener('click', slideToPrevious);
  nextButton.addEventListener('click', slideToNext);

  return {
    element,
    startButton,
    leaderboardButton,
  };
}