
import { createElement } from '../utils/elementFactory';
import styles from './modal.module.css';

export interface ModalAction {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  closeOnClick?: boolean;
}

export interface ModalOptions {
  title: string;
  content: HTMLElement;
  actions?: ModalAction[];
  showCloseButton?: boolean;
  onClose?: () => void;
}

export interface ModalInstance {
  close: () => void;
  destroy: () => void;
}

export function createModal(options: ModalOptions): ModalInstance {
  const dialog = createElement('dialog', {
    className: styles.modal,
  });

  const container = createElement('div', {
    className: styles['modal__container'],
  });

  const title = createElement('h2', {
    className: styles['modal__title'],
    id: 'modal-title',
    textContent: options.title,
  });

  const headerChildren: HTMLElement[] = [title];

  if (options.showCloseButton) {
    const closeButton = createElement('button', {
      className: styles['modal__close'],
      type: 'button',
      textContent: '×',
      ariaLabel: 'Close modal',
    });

    closeButton.addEventListener('click', () => dialog.close());
    headerChildren.push(closeButton);
  }

  const header = createElement(
    'header',
    { className: styles['modal__header'] },
    headerChildren,
  );

  const content = createElement(
    'div',
    { className: styles['modal__content'] },
    [options.content],
  );

  const children: HTMLElement[] = [header, content];

  if (options.actions?.length) {
    const buttons = options.actions.map((action) => {
      const button = createElement('button', {
        className: [
          styles['modal__button'],
          styles[`modal__button--${action.variant ?? 'secondary'}`],
        ].join(' '),
        type: 'button',
        textContent: action.label,
      });

      button.addEventListener('click', () => {
        if (action.closeOnClick !== false) {
          dialog.close();
        }

        action.onClick();
      });

      return button;
    });

    const footer = createElement(
      'footer',
      { className: styles['modal__footer'] },
      buttons,
    );

    children.push(footer);
  }

  container.append(...children);
  dialog.append(container);

  dialog.addEventListener('click', (event: MouseEvent) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener('close', () => {
    options.onClose?.();
    dialog.remove();
  });

  document.body.append(dialog);
  dialog.showModal();

  return {
    close: () => dialog.close(),
    destroy: () => {
      if (dialog.open) {
        dialog.close();
      } else {
        dialog.remove();
      }
    },
  };
}
