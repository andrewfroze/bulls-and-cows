import { Base, Settings } from '../../game';
import { renderFooter } from './footer.module';
import { renderHeader } from './header.module';
import { renderMain } from './main/main.module';

export function renderStartScreen(
  onStartGame: (base: Base, length: number) => void,
  onOpenLeaderboard: (settings: Settings) => void,
): HTMLElement[] {
  return [
    renderHeader(),
    renderMain(onStartGame, (base: Base, length: number) => onOpenLeaderboard({ base, length })),
    renderFooter(),
  ];
}
