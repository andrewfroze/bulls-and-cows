import { createElement } from '../utils/elementFactory';
import { BaseConfig, defaultBase, defaultLength, Base, countPossibleSecrets } from '../../game';
import styles from './startScreen.module.css';

const baseDropdown: HTMLSelectElement = createBaseDropdown();
const secretLengthDropdown: HTMLSelectElement = createEmptySecretLengthDropdown();

const combinationsInfo: HTMLParagraphElement = createElement('p', {
  className: styles['game-settings__combinations-info'],
});

updateSelectLengthDropdownOptions(defaultBase);
updateCombinationsInfo();

export function renderMain(
  onStartGame: (base: Base, length: number) => void,
  onOpenLeaderboard: (base: Base, length: number) => void,
): HTMLElement {
  const startButton: HTMLButtonElement = createElement('button', {
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

  const slides = createElement('div', { className: styles['carousel-slides'] }, [
    createElement('div', { className: styles['carousel-slide'] }, [startButton]),
    createElement('div', { className: styles['carousel-slide'] }, [leaderboardButton]),
  ]);

  const viewport = createElement('div', { className: styles['carousel-viewport'] }, [slides]);

  const carousel = createElement('div', { className: styles['action-carousel'] }, [
    previousButton,
    viewport,
    nextButton,
  ]);

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

  leaderboardButton.addEventListener('click', () => {
    openLeaderboard(form, onOpenLeaderboard);
  });

  const form = createElement(
    'form',
    {
      className: styles['game-settings'],
    },
    [baseDropdown, secretLengthDropdown, carousel],
  );

  form.addEventListener('submit', (event: SubmitEvent) => {
    event.preventDefault();
    startGame(form, onStartGame);
  });

  baseDropdown.addEventListener('change', () => {
    updateSelectLengthDropdownOptions(baseDropdown.value as Base);
    updateCombinationsInfo();
  });

  secretLengthDropdown.addEventListener('change', updateCombinationsInfo);

  return createElement(
    'main',
    {
      className: styles['start-screen-main'],
    },
    [form, combinationsInfo],
  );
}

function createBaseDropdown(base: Base = defaultBase): HTMLSelectElement {
  const options: HTMLOptionElement[] = Object.entries(BaseConfig).map(([base, baseObject]) =>
    createElement('option', {
      className: styles['game-settings__base-dropdown__option'],
      value: base,
      textContent: baseObject.label,
    }),
  );

  const baseDropdown = createElement(
    'select',
    {
      className: styles['game-settings__base-dropdown'],
      name: 'base',
    },
    options,
  );

  baseDropdown.value = base;

  return baseDropdown;
}

function createEmptySecretLengthDropdown(): HTMLSelectElement {
  return createElement('select', {
    className: styles['game-settings__length-dropdown'],
    name: 'length',
  });
}

function updateSelectLengthDropdownOptions(base: Base): void {
  const minLength = 2;
  const maxLength = 6;

  const availableMaxLength = Math.min(maxLength, BaseConfig[base].maxLength);

  const options = Array.from({ length: availableMaxLength - minLength + 1 }, (_, index) => {
    const length = minLength + index;

    return createElement('option', {
      value: String(length),
      textContent: String(length),
    });
  });

  secretLengthDropdown.replaceChildren(...options);
  secretLengthDropdown.value = String(Math.min(availableMaxLength, defaultLength));

  secretLengthDropdown.disabled = options.length < 2;
}

function updateCombinationsInfo(): void {
  const base = baseDropdown.value as Base;
  const length = Number(secretLengthDropdown.value);

  const count = countPossibleSecrets(length, base);

  combinationsInfo.textContent = `Possible combinations: ${count.toLocaleString()}`;
}

function startGame(form: HTMLFormElement, onStartGame: (base: Base, length: number) => void): void {
  const formData = getFormParameters(form);

  onStartGame(formData.base, formData.length);
}

function openLeaderboard(
  form: HTMLFormElement,
  onOpenLeaderboard: (base: Base, length: number) => void,
): void {
  const formData = getFormParameters(form);

  onOpenLeaderboard(formData.base, formData.length);
}

function getFormParameters(form: HTMLFormElement): { base: Base; length: number } {
  const formData = new FormData(form);

  const base = formData.get('base') as Base;
  const lengthElement = form.elements.namedItem('length');

  if (!(lengthElement instanceof HTMLSelectElement)) {
    throw new Error('Length select not found');
  }

  const length = Number(lengthElement.value);

  return { base, length };
}
