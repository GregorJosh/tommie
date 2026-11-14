import { items } from './items';

export type IndoorPlayer = {
  x: number;
  y: number;
  direction: 'N' | 'E' | 'S' | 'W';
  hasKey: boolean;
};

export type OutdoorPlayer = {
  x: number;
  y: number;
  facing: 'up' | 'down' | 'left' | 'right';
};

export const getPositionAhead = (
  player: IndoorPlayer,
  distance: number = 1,
): { x: number; y: number } => {
  const { x, y, direction } = player;

  switch (direction) {
    case 'N':
      return { x, y: y - distance };
    case 'E':
      return { x: x + distance, y };
    case 'S':
      return { x, y: y + distance };
    case 'W':
      return { x: x - distance, y };
    default:
      return { x, y };
  }
};

export const getPositionBehind = (player: IndoorPlayer): { x: number; y: number } => {
  const { x, y, direction } = player;

  switch (direction) {
    case 'N':
      return { x, y: y + 1 };
    case 'E':
      return { x: x - 1, y };
    case 'S':
      return { x, y: y - 1 };
    case 'W':
      return { x: x + 1, y };
    default:
      return { x, y };
  }
};

export const getPositionLeft = (player: IndoorPlayer): { x: number; y: number } => {
  const { x, y, direction } = player;

  switch (direction) {
    case 'N':
      return { x: x - 1, y };
    case 'E':
      return { x, y: y - 1 };
    case 'S':
      return { x: x + 1, y };
    case 'W':
      return { x, y: y + 1 };
    default:
      return { x, y };
  }
};

export const getPositionRight = (player: IndoorPlayer): { x: number; y: number } => {
  const { x, y, direction } = player;

  switch (direction) {
    case 'N':
      return { x: x + 1, y };
    case 'E':
      return { x, y: y + 1 };
    case 'S':
      return { x: x - 1, y };
    case 'W':
      return { x, y: y - 1 };
    default:
      return { x, y };
  }
};

export const getRelativePosition = (
  player: IndoorPlayer,
  distance: number,
  sideOffset: number = 0,
): { x: number; y: number } => {
  const ahead = getPositionAhead(player, distance);
  const right = getPositionRight(player);

  return {
    x: ahead.x + (right.x - player.x) * sideOffset,
    y: ahead.y + (right.y - player.y) * sideOffset,
  };
};

export const lookForItems = (player: IndoorPlayer): string[] => {
  const collectedItems: string[] = [];

  for (let i = items.length - 1; i >= 0; i--) {
    const item = items[i];

    if (item.x === player.x && item.y === player.y) {
      if (item.type === 'key') {
        player.hasKey = true;

        collectedItems.push(item.name);
        items.splice(i, 1);
      }
    }
  }

  return collectedItems;
};

export const moveBackward = (player: IndoorPlayer, map: string[]): boolean => {
  const { x, y } = getPositionBehind(player);

  if (map[y]?.[x] !== '.') {
    return false;
  }

  player.x = x;
  player.y = y;

  return true;
};

export const moveForward = (player: IndoorPlayer, map: string[]): boolean => {
  const { x, y } = getPositionAhead(player);

  if (map[y]?.[x] !== '.') {
    return false;
  }

  player.x = x;
  player.y = y;

  return true;
};

export const moveOutdoor = (
  player: OutdoorPlayer,
  target: { x: number; y: number },
  deltaSeconds: number,
): boolean => {
  const dx = target.x - player.x;
  const dy = target.y - player.y;
  const distance = Math.hypot(dx, dy);

  if (distance === 0) {
    return true;
  }

  if (Math.abs(dx) > Math.abs(dy)) {
    player.facing = dx < 0 ? 'left' : 'right';
  } else {
    player.facing = dy < 0 ? 'up' : 'down';
  }

  const speed = 140;
  const step = speed * deltaSeconds;

  if (distance <= step) {
    player.x = target.x;
    player.y = target.y;

    return true;
  }

  player.x += (dx / distance) * step;
  player.y += (dy / distance) * step;

  return false;
};

export const moveLeft = (player: IndoorPlayer, map: string[]): boolean => {
  const { x, y } = getPositionLeft(player);

  if (map[y]?.[x] !== '.') {
    return false;
  }

  player.x = x;
  player.y = y;

  return true;
};

export const moveRight = (player: IndoorPlayer, map: string[]): boolean => {
  const { x, y } = getPositionRight(player);

  if (map[y]?.[x] !== '.') {
    return false;
  }

  player.x = x;
  player.y = y;

  return true;
};

export const turnLeft = (player: IndoorPlayer): void => {
  switch (player.direction) {
    case 'N':
      player.direction = 'W';
      return;
    case 'E':
      player.direction = 'N';
      return;
    case 'S':
      player.direction = 'E';
      return;
    case 'W':
      player.direction = 'S';
      return;
  }
};

export const turnRight = (player: IndoorPlayer): void => {
  switch (player.direction) {
    case 'N':
      player.direction = 'E';
      return;
    case 'E':
      player.direction = 'S';
      return;
    case 'S':
      player.direction = 'W';
      return;
    case 'W':
      player.direction = 'N';
      return;
  }
};
