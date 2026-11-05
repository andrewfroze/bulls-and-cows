import { createElement } from "../utils/elementFactory"

export function renderHeader(): HTMLElement {
  return createElement('header',
    {
      className: 'start-screen-header',
    },
    [ 
      createElement('h1',
        {
          className: 'game-title',
          textContent: 'Bulls & Cows',
        }
      ),
    ]
  )
}