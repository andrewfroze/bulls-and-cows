import { renderFooter } from "./footer";
import { renderHeader } from "./header";
import { renderMain } from "./main";

export function renderStartScreen(): HTMLElement[] {
  return [
    renderHeader(),
    renderMain(),
    renderFooter(),
  ]
}