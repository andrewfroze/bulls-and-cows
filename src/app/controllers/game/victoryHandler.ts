
import { renderLeaderboardModal, renderVictoryModal } from '../../../components/modal';
import { saveRecord } from '../../../game/leaderboard/leaderboardStorage';
import type { GameState } from '../../../game';

export function handleVictory(
  state: GameState,
  onNewGame: () => void,
): void {
  saveRecord(state.history.length, state.time, state.settings);

  renderVictoryModal({
    attempts: state.history.length,
    time: state.time,
    onNewGame,
    onLeaderboard: () => {
      renderLeaderboardModal({
        settings: state.settings,
        onNewGame,
      });
    },
  });
}
