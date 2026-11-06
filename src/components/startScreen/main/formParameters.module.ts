import { Base } from '../../../game';

export interface FormParameters {
  base: Base;
  length: number;
}

export function getFormParameters(form: HTMLFormElement): FormParameters {
  const formData = new FormData(form);

  const base = formData.get('base') as Base;
  const lengthElement = form.elements.namedItem('length');

  if (!(lengthElement instanceof HTMLSelectElement)) {
    throw new Error('Length select not found');
  }

  return {
    base,
    length: Number(lengthElement.value),
  };
}