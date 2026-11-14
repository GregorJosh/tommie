import type { GameObjectBounds } from '../geometry';
import type { OutdoorPlayer } from '../player';
import {
  createItemInteractables,
  type OutdoorInteractable,
  type OutdoorItem,
  type OutdoorLocation,
} from '../outdoor';

type SiennaWalkableData = {
  sidewalkBounds: GameObjectBounds;
  walkableAreas: GameObjectBounds[];
};

export const createSiennaInteractables = (width: number, height: number): OutdoorInteractable[] => {
  const leftCarBounds: GameObjectBounds = {
    top: 295,
    right: 158,
    bottom: height,
    left: 0,
  };

  const centerCarBounds: GameObjectBounds = {
    top: 295,
    right: 450,
    bottom: height,
    left: 195,
  };

  const rightCarBounds: GameObjectBounds = {
    top: 295,
    right: width,
    bottom: height,
    left: 528,
  };

  const doorBounds: GameObjectBounds = {
    top: height - 230,
    right: 205,
    bottom: height - 160,
    left: 175,
  };

  const rightExitBounds: GameObjectBounds = {
    top: height - 147,
    right: width,
    bottom: height - 66,
    left: width - 24,
  };

  return [
    {
      bounds: rightExitBounds,
      target: {
        x: width - 8,
        y: height - 90,
      },
      action: 'change-location',
      description: null,
      destinationId: 'sienna-right',
    },
    {
      bounds: doorBounds,
      target: {
        x: (doorBounds.left + doorBounds.right) / 2,
        y: doorBounds.bottom + 15,
      },
      action: 'enter',
      description: 'Wchodzisz do środka. Wyjście: zachodni koniec korytarza, klawisz F.',
    },
    {
      bounds: centerCarBounds,
      target: {
        x: (centerCarBounds.left + centerCarBounds.right) / 2,
        y: centerCarBounds.top,
      },
      action: 'inspect',
      description: 'Stary zielony samochód. Drzwi są zamknięte.',
    },
    {
      bounds: leftCarBounds,
      target: {
        x: (leftCarBounds.left + leftCarBounds.right) / 2,
        y: leftCarBounds.top,
      },
      action: 'inspect',
      description: 'Stary srebrny samochód. Drzwi są zamknięte.',
    },
    {
      bounds: rightCarBounds,
      target: {
        x: (rightCarBounds.left + rightCarBounds.right) / 2,
        y: rightCarBounds.top,
      },
      action: 'inspect',
      description: 'Stary czerwony samochód. Drzwi są zamknięte.',
    },
  ];
};

export const createSiennaItems = (): OutdoorItem[] => [
  {
    id: 'folded-note',
    name: 'Złożona kartka',
    position: { x: 380, y: 245 },
    collected: false,
    examineText: 'Na kartce napisano: "Klucz do bramy znajduje się w korytarzu budynku".',
  },
];

export const createSiennaWalkableData = (width: number, height: number): SiennaWalkableData => {
  const sidewalkBounds: GameObjectBounds = {
    top: height - 147,
    right: width,
    bottom: height - 60,
    left: 0,
  };

  const walkableAreas: GameObjectBounds[] = [
    sidewalkBounds,
    // Przejście między srebrnym i środkowym autem.
    {
      left: 158,
      right: 180,
      top: 265,
      bottom: height,
    },
    // Przejście między środkowym i czerwonym autem.
    {
      left: 473,
      right: 528,
      top: 265,
      bottom: height,
    },
  ];

  return {
    sidewalkBounds,
    walkableAreas,
  };
};

export const createSiennaLocation = (width: number, height: number): OutdoorLocation => {
  const { sidewalkBounds, walkableAreas } = createSiennaWalkableData(width, height);
  const items = createSiennaItems();
  const interactables = [
    ...createSiennaInteractables(width, height),
    ...createItemInteractables(items),
  ];
  const playerStart: OutdoorPlayer = {
    x: sidewalkBounds.right - width / 2,
    y: sidewalkBounds.top + 50,
    facing: 'right',
  };

  return {
    id: 'sienna',
    sidewalkBounds,
    walkableAreas,
    items,
    interactables,
    playerStart,
  };
};
