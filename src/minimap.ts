import type { IndoorPlayer } from './player.ts';
import type { Item } from './items.ts';

const getMinimapText = (map: string[], player: IndoorPlayer, items: Item[]): string => {
  const arrows = {
    N: '^',
    E: '>',
    S: 'v',
    W: '<',
  };
  const arrow = arrows[player.direction];

  const minimapText = map.map((row, y) => {
    const cells = row.split('');

    for (const item of items) {
      if (item.y === y && item.type === 'key') {
        cells[item.x] = 'K';
      }
    }

    if (y === player.y) {
      cells[player.x] = arrow;
    }

    return cells.join('');
  });

  return minimapText.join('\n');
};

export { getMinimapText };
