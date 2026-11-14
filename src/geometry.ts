export type GameObjectBounds = {
  top: number;
  right: number;
  bottom: number;
  left: number;
};

export const isPointInBounds = (x: number, y: number, bounds: GameObjectBounds): boolean => {
  return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
};
