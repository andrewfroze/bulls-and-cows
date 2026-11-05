import { Base } from '../../game/types';
import { renderHeader } from './header.module';
import { renderMain } from './main.module';
import { renderFooter } from './footer.module';

export interface GameAttempt {
    guess: string;
    bulls: number;
    cows: number;
}

export interface GameScreenOptions {
    base: Base;
    length: number;
    onNewGame: () => void;
    onOpenLeaderboard: () => void;
}

export function renderGameScreen(
    options: GameScreenOptions,
): HTMLElement[] {
    return [
        renderHeader({
            onNewGame: options.onNewGame,
            onOpenLeaderboard: options.onOpenLeaderboard,
        }),
        renderMain({
            base: options.base,
            length: options.length,
        }),
        renderFooter(),
    ];
}
