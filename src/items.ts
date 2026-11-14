type Item = {
  type: 'key' | 'food' | 'water';
  name: string;
  x: number;
  y: number;
};

const items: Item[] = [{ type: 'key', x: 5, y: 2, name: 'Entrance Key' }];

const hasKeyAt = (items: Item[], x: number, y: number): boolean => {
  return items.some((item) => item.type === 'key' && item.x === x && item.y === y);
};

export { type Item, items, hasKeyAt };
