import { renderScene } from './renderer';
import { renderOutdoorScene } from './outdoorRenderer';
import { gameMap } from './map';
import * as Player from './player';
import { getMinimapText } from './minimap';
import { items } from './items';
import { createUI, printCollectedItems, printPlayerDetails, printInventory } from './ui';
import { loadAssets } from './assets';
import { getAction } from './controls';
import { executeIndoorAction } from './indoor';
import { createSiennaLocation } from './locations/sienna';
import { createSiennaRightLocation } from './locations/siennaRight';
import {
  getOutdoorClickResult,
  getOutdoorPath,
  type OutdoorAction,
  type OutdoorItem,
  type Point,
  type OutdoorLocation,
  type OutdoorLocationId,
} from './outdoor';

import './style.css';

const { canvas, ...ui } = createUI();
const context = canvas?.getContext('2d');
const floorShades: number[][] = gameMap.map((row) => Array.from(row, () => Math.random() * 0.15));
const outdoorInventory: OutdoorItem[] = [];
const outdoorLocations: Record<OutdoorLocationId, OutdoorLocation> = {
  sienna: createSiennaLocation(canvas.width, canvas.height),
  'sienna-right': createSiennaRightLocation(canvas.width, canvas.height),
};

let activeOutdoorLocation = outdoorLocations.sienna;
let gameMode: 'outdoor' | 'indoor' = 'outdoor';
let outdoorTarget: Point | null = null;
let outdoorPath: Point[] = [];
let frameElapsedMs = 0;
let frameIndex = 0;
let outdoorAction: OutdoorAction = null;
let outdoorItemId: string | null = null;
let outdoorDescription: string | null = null;
let outdoorDestinationId: OutdoorLocationId | null = null;
let debugMode = false;

const frameDurationMs = 100;
const frameCount = 6;
const outdoorPlayer: Player.OutdoorPlayer = { ...activeOutdoorLocation.playerStart };
const indoorPlayer: Player.IndoorPlayer = {
  x: 4,
  y: 1,
  direction: 'N',
  hasKey: false,
};
const indoorExit = { x: 0, y: 1 };

const updateObjective = (): void => {
  const gateIsOpen = !gameMap.some((row) => row.includes('G'));
  const noteIsCollected = outdoorLocations.sienna.items.some(
    (item) => item.id === 'folded-note' && item.collected,
  );

  if (gateIsOpen) {
    ui.objective.textContent = 'Cel ukończony: brama została otwarta.';

    return;
  }

  if (indoorPlayer.hasKey) {
    ui.objective.textContent = 'Cel: Otwórz bramę.';

    return;
  }

  if (noteIsCollected) {
    ui.objective.textContent = 'Cel: Wejdź do budynku i znajdź klucz.';

    return;
  }

  ui.objective.textContent = 'Cel: Znajdź kartkę na chodniku.';
};

updateObjective();

const drawScene = (): void => {
  if (!context) {
    return;
  }

  const isOutdoor = gameMode === 'outdoor';

  ui.minimap.hidden = isOutdoor;
  ui.detailsBox.hidden = isOutdoor;

  if (isOutdoor) {
    const backgroundImage =
      activeOutdoorLocation.id === 'sienna' ? assets.outdoorBgImage : assets.siennaRightBgImage;
    const carImages =
      activeOutdoorLocation.id === 'sienna' ? assets.carImages : assets.siennaRightCarImages;

    renderOutdoorScene(
      context,
      canvas,
      outdoorPlayer,
      outdoorTarget,
      backgroundImage,
      activeOutdoorLocation.sidewalkBounds,
      assets.idleImage,
      assets.idleUpImage,
      assets.idleDownImage,
      assets.walkImage,
      assets.walkUpImage,
      assets.walkDownImage,
      activeOutdoorLocation.items,
      assets.foldedNoteImage,
      carImages,
      outdoorTarget !== null,
      frameIndex,
      debugMode,
    );

    if (debugMode) {
      context.save();
      context.fillStyle = 'rgba(0, 255, 100, 0.15)';
      context.strokeStyle = '#0f8';
      context.lineWidth = 1;

      for (const area of activeOutdoorLocation.walkableAreas) {
        const width = area.right - area.left;
        const height = area.bottom - area.top;

        context.fillRect(area.left, area.top, width, height);
        context.strokeRect(area.left, area.top, width, height);
      }

      context.fillStyle = 'rgba(79, 2, 2, 0.15)';
      context.strokeStyle = '#f02';

      for (const obj of activeOutdoorLocation.interactables) {
        const width = obj.bounds.right - obj.bounds.left;
        const height = obj.bounds.bottom - obj.bounds.top;

        context.fillRect(obj.bounds.left, obj.bounds.top, width, height);
        context.strokeRect(obj.bounds.left, obj.bounds.top, width, height);
      }

      context.restore();
    }
  } else {
    renderScene(
      context,
      canvas,
      indoorPlayer,
      gameMap,
      items,
      assets.keyImage,
      assets.pavementImage,
      floorShades,
      indoorExit,
    );
  }
};

const assets = loadAssets(drawScene);

drawScene();

ui.minimap.textContent = getMinimapText(gameMap, indoorPlayer, items);

printPlayerDetails(indoorPlayer, ui.detailsBox);

window.addEventListener('keydown', (event) => {
  if (gameMode !== 'indoor') {
    return;
  }

  const action = getAction(event.code);

  if (action === null) {
    return;
  }

  if (event.ctrlKey || event.altKey || event.metaKey) {
    return;
  }

  event.preventDefault();

  if (event.repeat) {
    return;
  }

  const outcome = executeIndoorAction(action, indoorPlayer, gameMap, indoorExit);

  if (outcome.gateOpened) {
    updateObjective();
  }

  if (outcome.exitRequested) {
    gameMode = 'outdoor';
  }

  if (outcome.collectedItems.length > 0) {
    printCollectedItems(outcome.collectedItems, ui.messageBox);

    if (indoorPlayer.hasKey) {
      updateObjective();
    }
  }

  if (outcome.message !== null) {
    ui.messageBox.textContent = outcome.message;
  }

  drawScene();

  ui.minimap.textContent = getMinimapText(gameMap, indoorPlayer, items);

  printPlayerDetails(indoorPlayer, ui.detailsBox);
});

canvas.addEventListener('click', (event) => {
  if (gameMode !== 'outdoor') {
    return;
  }

  const x = (event.offsetX * canvas.width) / canvas.clientWidth;
  const y = (event.offsetY * canvas.height) / canvas.clientHeight;

  const clickResult = getOutdoorClickResult(
    x,
    y,
    activeOutdoorLocation.interactables,
    activeOutdoorLocation.walkableAreas,
  );

  if (clickResult === null) {
    return;
  }

  outdoorAction = clickResult.action;
  outdoorItemId = clickResult.itemId;
  outdoorDescription = clickResult.description;
  outdoorDestinationId = clickResult.destinationId;
  outdoorPath = getOutdoorPath(
    outdoorPlayer,
    clickResult.target,
    activeOutdoorLocation.sidewalkBounds,
    activeOutdoorLocation.walkableAreas,
  );
  outdoorTarget = outdoorPath.shift() ?? null;

  drawScene();
});

ui.inventory.addEventListener('click', () => {
  if (outdoorInventory.length === 0) {
    ui.messageBox.textContent = 'Nie posiadasz żadnych przedmiotów.';
    return;
  }

  const item = outdoorInventory[outdoorInventory.length - 1];

  ui.messageBox.textContent = item.examineText;
});

ui.debugButton.addEventListener('click', () => {
  debugMode = !debugMode;
  drawScene();
});

const updateOutdoorMovement = (deltaSeconds: number) => {
  if (outdoorTarget === null) {
    return;
  }

  const reachedTarget = Player.moveOutdoor(outdoorPlayer, outdoorTarget, deltaSeconds);

  if (!reachedTarget) {
    return;
  }

  outdoorTarget = outdoorPath.shift() ?? null;

  if (outdoorTarget !== null) {
    return;
  }

  if (outdoorAction === 'change-location') {
    const destinationId = outdoorDestinationId;

    outdoorAction = null;
    outdoorDestinationId = null;
    outdoorItemId = null;
    outdoorDescription = null;

    if (destinationId === null) {
      return;
    }

    activeOutdoorLocation = outdoorLocations[destinationId];

    const entersFromLeft = destinationId === 'sienna-right';

    outdoorPlayer.x = entersFromLeft ? 35 : canvas.width - 35;
    outdoorPlayer.y = activeOutdoorLocation.sidewalkBounds.top + 50;
    outdoorPlayer.facing = entersFromLeft ? 'right' : 'left';

    frameElapsedMs = 0;
    frameIndex = 0;

    return;
  }

  if (outdoorAction === 'collect') {
    outdoorAction = null;

    const item = activeOutdoorLocation.items.find((item) => item.id === outdoorItemId);

    if (item !== undefined && !item.collected) {
      item.collected = true;
      outdoorInventory.push(item);

      updateObjective();
      printInventory(
        outdoorInventory.map((item) => item.name),
        ui.inventory,
      );

      ui.messageBox.textContent = outdoorDescription ?? `Podnosisz przedmiot: ${item.name}.`;

      outdoorDescription = null;
    }

    const interactableIndex = activeOutdoorLocation.interactables.findIndex(
      (obj) => obj.itemId === outdoorItemId,
    );

    if (interactableIndex !== -1) {
      activeOutdoorLocation.interactables.splice(interactableIndex, 1);
    }

    outdoorItemId = null;

    return;
  }

  if (outdoorAction === 'inspect') {
    outdoorAction = null;

    if (outdoorDescription !== null) {
      ui.messageBox.textContent = outdoorDescription;
      outdoorDescription = null;
    }

    return;
  }

  if (outdoorAction === 'enter') {
    outdoorAction = null;

    if (outdoorDescription !== null) {
      ui.messageBox.textContent = outdoorDescription;
      outdoorDescription = null;
    }

    indoorPlayer.x = indoorExit.x + 1;
    indoorPlayer.y = indoorExit.y;
    indoorPlayer.direction = 'E';

    gameMode = 'indoor';

    ui.minimap.textContent = getMinimapText(gameMap, indoorPlayer, items);
    printPlayerDetails(indoorPlayer, ui.detailsBox);
  }
};

let previousTime: number | null = null;

const frame = (time: number) => {
  const deltaSeconds = previousTime === null ? 0 : Math.min((time - previousTime) / 1000, 0.05);

  previousTime = time;

  if (gameMode === 'outdoor') {
    updateOutdoorMovement(deltaSeconds);

    const isPlayerMoving = outdoorTarget !== null;
    const durationMs = isPlayerMoving ? frameDurationMs : 250;

    const idleVertical =
      !isPlayerMoving && (outdoorPlayer.facing === 'up' || outdoorPlayer.facing === 'down');

    const currentFrameCount = idleVertical ? 4 : frameCount;

    frameElapsedMs += deltaSeconds * 1000;
    frameIndex = Math.floor(frameElapsedMs / durationMs) % currentFrameCount;

    drawScene();
  } else {
    frameElapsedMs = 0;
    frameIndex = 0;
  }

  requestAnimationFrame(frame);
};

requestAnimationFrame(frame);
