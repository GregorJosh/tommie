import type { GameObjectBounds } from '../geometry';
import type { OutdoorInteractable, OutdoorLocation } from '../outdoor';

type SiennaRightWalkableData = {
  sidewalkBounds: GameObjectBounds;
  walkableAreas: GameObjectBounds[];
};

const createSiennaRightWalkableData = (width: number, height: number): SiennaRightWalkableData => {
  const sidewalkBounds: GameObjectBounds = {
    top: height - 140,
    right: width,
    bottom: height - 60,
    left: 0,
  };

  const walkableAreas: GameObjectBounds[] = [
    sidewalkBounds,
    // Przejście pomiędzy czerwonym autem i srebrnym kombi.
    {
      left: 178,
      right: 208,
      top: 265,
      bottom: height,
    },
    // Przejście pomiędzy srebrnym kombi a czarnym SUV-em.
    {
      left: 510,
      right: 555,
      top: 265,
      bottom: height,
    },
  ];

  return {
    sidewalkBounds,
    walkableAreas,
  };
};

const createSiennaRightInteractables = (width: number, height: number): OutdoorInteractable[] => {
  const leftCarBounds: GameObjectBounds = {
    top: 295,
    right: 178,
    bottom: height,
    left: 0,
  };

  const centerCarBounds: GameObjectBounds = {
    top: 295,
    right: 510,
    bottom: height,
    left: 208,
  };

  const rightCarBounds: GameObjectBounds = {
    top: 295,
    right: width,
    bottom: height,
    left: 555,
  };

  const doorBounds: GameObjectBounds = {
    top: 133,
    right: 300,
    bottom: 211,
    left: 253,
  };

  const leftExitBounds: GameObjectBounds = {
    top: height - 140,
    right: 24,
    bottom: height - 66,
    left: 0,
  };

  return [
    {
      bounds: leftExitBounds,
      target: {
        x: 8,
        y: height - 90,
      },
      action: 'change-location',
      description: null,
      destinationId: 'sienna',
    },
    {
      bounds: doorBounds,
      target: {
        x: (doorBounds.left + doorBounds.right) / 2,
        y: doorBounds.bottom + 15,
      },
      action: 'inspect',
      description: 'Drzwi do kamienicy są zamknięte.',
    },
    {
      bounds: leftCarBounds,
      target: {
        x: (leftCarBounds.left + leftCarBounds.right) / 2,
        y: leftCarBounds.top,
      },
      action: 'inspect',
      description: 'Czerwony samochód stojący przy krawężniku.',
    },
    {
      bounds: centerCarBounds,
      target: {
        x: (centerCarBounds.left + centerCarBounds.right) / 2,
        y: centerCarBounds.top,
      },
      action: 'inspect',
      description: 'Srebrne kombi. Drzwi są zamknięte.',
    },
    {
      bounds: rightCarBounds,
      target: {
        x: (rightCarBounds.left + rightCarBounds.right) / 2,
        y: rightCarBounds.top,
      },
      action: 'inspect',
      description: 'Ciemny SUV. Drzwi są zamknięte.',
    },
  ];
};

export const createSiennaRightLocation = (width: number, height: number): OutdoorLocation => {
  const { sidewalkBounds, walkableAreas } = createSiennaRightWalkableData(width, height);

  return {
    id: 'sienna-right',
    sidewalkBounds,
    walkableAreas,
    items: [],
    interactables: createSiennaRightInteractables(width, height),
    playerStart: {
      x: 35,
      y: sidewalkBounds.top + 50,
      facing: 'right',
    },
  };
};
