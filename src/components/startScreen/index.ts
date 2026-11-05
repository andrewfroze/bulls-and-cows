import { Base } from '../../game';
import { renderFooter } from './footer.module';
import { renderHeader } from './header.module';
import { renderMain } from './main.module';

export function renderStartScreen(
  onStartGame: (base: Base, length: number) => void,
): HTMLElement[] {
  return [renderHeader(), renderMain(onStartGame), renderFooter()];
}
