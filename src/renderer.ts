import * as Figures from './figures';
import * as Player from './player';
import { hasKeyAt, type Item } from './items';

export const renderScene = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  player: Player.IndoorPlayer,
  map: string[],
  items: Item[],
  keyImage: HTMLImageElement,
  pavementImage: HTMLImageElement,
  floorShades: number[][],
  exit: { x: number; y: number },
) => {
  Figures.drawSky(context, canvas);
  Figures.drawGround(context, canvas);

  for (let distance = 30; distance >= 0; distance--) {
    const sideRange = distance + 1;

    for (let sideOffset = -sideRange; sideOffset <= sideRange; sideOffset++) {
      const { x, y } = Player.getRelativePosition(player, distance, sideOffset);

      if (map[y]?.[x] === '.') {
        const shade = floorShades[y]?.[x] ?? 0;

        Figures.drawFloorTile(context, canvas, pavementImage, distance, sideOffset, shade);
      }
    }
  }

  for (let distance = 30; distance >= 2; distance--) {
    for (let sideOffset = -distance; sideOffset <= distance; sideOffset++) {
      const { x, y } = Player.getRelativePosition(player, distance, sideOffset);
      const cell = map[y]?.[x];

      if (cell === '#') {
        Figures.drawFrontWall(context, canvas, distance, sideOffset);

        if (x === exit.x && y === exit.y) {
          Figures.drawExitDoor(context, canvas, distance, sideOffset);
        }
      } else if (cell === 'G') {
        Figures.drawGate(context, canvas, distance, sideOffset);
      } else if (cell === '.') {
        if (hasKeyAt(items, x, y)) {
          Figures.drawKey(context, canvas, keyImage, distance, sideOffset);
        }
      }
    }

    const wallDistance = distance - 1;

    for (let sideOffset = -distance; sideOffset <= -1; sideOffset++) {
      const { x, y } = Player.getRelativePosition(player, wallDistance, sideOffset);
      const cell = map[y]?.[x];

      if (cell === '#') {
        Figures.drawFarLeftWall(context, canvas, wallDistance, sideOffset);
      } else if (cell === 'G') {
        Figures.drawFarLeftWall(context, canvas, wallDistance, sideOffset, '#3f697a');
      }
    }

    for (let sideOffset = 1; sideOffset <= distance; sideOffset++) {
      const { x, y } = Player.getRelativePosition(player, wallDistance, sideOffset);
      const cell = map[y]?.[x];

      if (cell === '#') {
        Figures.drawFarRightWall(context, canvas, wallDistance, sideOffset);
      } else if (cell === 'G') {
        Figures.drawFarRightWall(context, canvas, wallDistance, sideOffset, '#345767');
      }
    }
  }

  const aheadLeft = Player.getRelativePosition(player, 1, -1);
  const aheadLeftCell = map[aheadLeft.y]?.[aheadLeft.x];

  if (aheadLeftCell === '#') {
    Figures.drawFrontWall(context, canvas, 1, -1);
  } else if (aheadLeftCell === 'G') {
    Figures.drawGate(context, canvas, 1, -1);
  } else if (aheadLeftCell === '.') {
    if (hasKeyAt(items, aheadLeft.x, aheadLeft.y)) {
      Figures.drawKey(context, canvas, keyImage, 1, -1);
    }
  }

  const aheadRight = Player.getRelativePosition(player, 1, 1);
  const aheadRightCell = map[aheadRight.y]?.[aheadRight.x];

  if (aheadRightCell === '#') {
    Figures.drawFrontWall(context, canvas, 1, 1);
  } else if (aheadRightCell === 'G') {
    Figures.drawGate(context, canvas, 1, 1);
  } else if (aheadRightCell === '.') {
    if (hasKeyAt(items, aheadRight.x, aheadRight.y)) {
      Figures.drawKey(context, canvas, keyImage, 1, 1);
    }
  }

  const ahead = Player.getPositionAhead(player);
  const frontCell = map[ahead.y]?.[ahead.x];

  if (frontCell === 'G') {
    Figures.drawGate(context, canvas);
  } else if (frontCell !== '.') {
    Figures.drawFrontWall(context, canvas);
  }

  if (ahead.x === exit.x && ahead.y === exit.y) {
    Figures.drawExitDoor(context, canvas);
  }

  if (frontCell === '.' && hasKeyAt(items, ahead.x, ahead.y)) {
    Figures.drawKey(context, canvas, keyImage);
  }

  const left = Player.getPositionLeft(player);
  const leftCell = map[left.y]?.[left.x];

  if (leftCell === 'G') {
    Figures.drawLeftWall(context, canvas, '#3f697a');
  } else if (leftCell !== '.') {
    Figures.drawLeftWall(context, canvas);
  }

  if (left.x === exit.x && left.y === exit.y) {
    Figures.drawSideExitDoor(context, canvas, 'left');
  }

  const right = Player.getPositionRight(player);
  const rightCell = map[right.y]?.[right.x];

  if (rightCell === 'G') {
    Figures.drawRightWall(context, canvas, '#345767');
  } else if (rightCell !== '.') {
    Figures.drawRightWall(context, canvas);
  }

  if (right.x === exit.x && right.y === exit.y) {
    Figures.drawSideExitDoor(context, canvas, 'right');
  }
};
