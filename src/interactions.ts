import { getPositionAhead, type IndoorPlayer } from './player';

type OpenGateResult = 'opened' | 'locked' | 'nothing';

export const openGateAhead = (player: IndoorPlayer, map: string[]): OpenGateResult => {
  const { x, y } = getPositionAhead(player);
  const row = map[y];

  if (row?.[x] !== 'G') {
    return 'nothing';
  }

  if (!player.hasKey) {
    return 'locked';
  }

  map[y] = row.slice(0, x) + '.' + row.slice(x + 1);

  return 'opened';
};
