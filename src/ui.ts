import type { IndoorPlayer } from './player';

export type UIElements = {
  canvas: HTMLCanvasElement;
  minimap: HTMLPreElement;
  messageBox: HTMLParagraphElement;
  detailsBox: HTMLParagraphElement;
  debugButton: HTMLButtonElement;
  inventory: HTMLDivElement;
  objective: HTMLParagraphElement;
};

export const createUI = (): UIElements => {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
    <main>
      <canvas id="game-canvas" width="649" height="360"></canvas>
      <p id="objective">Cel: Znajdź kartkę na chodniku.</p>
      <pre id="minimap"></pre>
      <p id="message-box">Witaj w grze!</p>
      <p id="details-box"></p>
      <div id="inventory">Ekwipunek: pusty</div>
      <button id="debug-button">Debug</button>
    </main>
  `;

  const canvas = document.querySelector<HTMLCanvasElement>('#game-canvas')!;
  const minimap = document.querySelector<HTMLPreElement>('#minimap')!;
  const messageBox = document.querySelector<HTMLParagraphElement>('#message-box')!;
  const detailsBox = document.querySelector<HTMLParagraphElement>('#details-box')!;
  const debugButton = document.querySelector<HTMLButtonElement>('#debug-button')!;
  const inventory = document.querySelector<HTMLDivElement>('#inventory')!;
  const objective = document.querySelector<HTMLParagraphElement>('#objective')!;

  return {
    canvas,
    minimap,
    messageBox,
    detailsBox,
    debugButton,
    inventory,
    objective,
  };
};

export const printCollectedItems = (namesOfItems: string[], element: HTMLElement): void => {
  if (!namesOfItems.length) {
    return;
  }

  let message = 'Znalazłeś ';

  for (const itemName of namesOfItems) {
    message += itemName + ', ';
  }

  message = message.slice(0, -2) + '.';

  element.textContent = message;
};

export const printPlayerDetails = (player: IndoorPlayer, element: HTMLElement): void => {
  element.textContent = `Twoje współrzędne: (${player.x}, ${player.y}), kierunek: ${player.direction}, masz klucz: ${player.hasKey ? 'tak' : 'nie'}. `;
};

export const printInventory = (itemNames: string[], element: HTMLElement): void => {
  element.textContent =
    itemNames.length > 0 ? `Ekwipunek: ${itemNames.join(', ')}` : 'Ekwipunek: pusty';
};
