import { isPointInBounds, type GameObjectBounds } from './geometry';
import type { OutdoorPlayer } from './player';

export type OutdoorLocationId = 'sienna' | 'sienna-right';
export type OutdoorAction = 'enter' | 'inspect' | 'collect' | 'change-location' | null;

export type OutdoorClickResult = {
  target: Point;
  action: OutdoorAction;
  description: string | null;
  itemId: string | null;
  destinationId: OutdoorLocationId | null;
};

export type Point = { x: number; y: number };

export type OutdoorInteractable = {
  bounds: GameObjectBounds;
  target: Point;
  action: Exclude<OutdoorAction, null>;
  description: string | null;
  itemId?: string;
  destinationId?: OutdoorLocationId;
};

export type OutdoorItem = {
  id: string;
  name: string;
  position: Point;
  collected: boolean;
  examineText: string;
};

export type OutdoorLocation = {
  id: OutdoorLocationId;
  sidewalkBounds: GameObjectBounds;
  walkableAreas: GameObjectBounds[];
  items: OutdoorItem[];
  interactables: OutdoorInteractable[];
  playerStart: OutdoorPlayer;
};

const canWalkStraight = (
  start: Point,
  target: Point,
  walkableAreas: GameObjectBounds[],
): boolean => {
  const dx = target.x - start.x;
  const dy = target.y - start.y;
  const steps = Math.max(1, Math.ceil(Math.hypot(dx, dy)));

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = start.x + dx * t;
    const y = start.y + dy * t;

    const isWalkable = walkableAreas.some((area) => isPointInBounds(x, y, area));

    if (!isWalkable) {
      return false;
    }
  }

  return true;
};

export const createItemInteractables = (items: OutdoorItem[]): OutdoorInteractable[] =>
  items.map(
    (item): OutdoorInteractable => ({
      bounds: {
        top: item.position.y - 8,
        right: item.position.x + 10,
        bottom: item.position.y + 8,
        left: item.position.x - 10,
      },
      target: {
        x: item.position.x,
        y: item.position.y + 12,
      },
      action: 'collect',
      description: `Podnosisz przedmiot: ${item.name}`,
      itemId: item.id,
    }),
  );

export const getOutdoorClickResult = (
  clickX: number,
  clickY: number,
  interactables: OutdoorInteractable[],
  walkableAreas: GameObjectBounds[],
): OutdoorClickResult | null => {
  const interactable = interactables.find((obj) => isPointInBounds(clickX, clickY, obj.bounds));

  if (interactable !== undefined) {
    return {
      target: { ...interactable.target },
      action: interactable.action,
      description: interactable.description,
      itemId: interactable.itemId ?? null,
      destinationId: interactable.destinationId ?? null,
    };
  }

  const isWalkable = walkableAreas.some((area) => isPointInBounds(clickX, clickY, area));

  if (!isWalkable) {
    return null;
  }

  return {
    target: { x: clickX, y: clickY },
    action: null,
    description: null,
    itemId: null,
    destinationId: null,
  };
};

export const getOutdoorPath = (
  start: Point,
  target: Point,
  sidewalkBounds: GameObjectBounds,
  walkableAreas: GameObjectBounds[],
): Point[] => {
  if (canWalkStraight(start, target, walkableAreas)) {
    return [{ ...target }];
  }

  const margin = 2;
  const preferedY = Math.min(start.y, target.y);

  const sideWalkY = Math.max(
    sidewalkBounds.top + margin,
    Math.min(preferedY, sidewalkBounds.bottom - margin),
  );

  return [{ x: start.x, y: sideWalkY }, { x: target.x, y: sideWalkY }, { ...target }];
};
