import { playButton } from '../../sound';

type CustomAttributes = {
  'data-tooltip'?: string;
};

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  attributes: Partial<HTMLElementTagNameMap[K]> & CustomAttributes = {},
  children: (Node | string)[] = [],
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tagName);

  const { 'data-tooltip': tooltip, ...nativeAttributes } = attributes;

  Object.assign(element, nativeAttributes);

  if (tooltip) {
    element.dataset.tooltip = tooltip;
  }

  element.append(...children);

  if (tagName === 'button' || tagName === 'select' || tagName === 'option') {
    element.addEventListener('click', playButton);
  }

  return element;
}
