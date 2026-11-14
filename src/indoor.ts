import * as Player from './player';
import type { Action } from './controls';
import { openGateAhead } from './interactions';

type IndoorActionResult = {
  collectedItems: string[];
  message: string | null;
  exitRequested: boolean;
  gateOpened: boolean;
};

export const executeIndoorAction = (
  action: Action,
  indoorPlayer: Player.IndoorPlayer,
  gameMap: string[],
  indoorExit: { x: number; y: number },
): IndoorActionResult => {
  const outcome: IndoorActionResult = {
    collectedItems: [],
    message: null,
    exitRequested: false,
    gateOpened: false,
  };

  switch (action) {
    case 'turnLeft':
      Player.turnLeft(indoorPlayer);

      break;
    case 'turnRight':
      Player.turnRight(indoorPlayer);

      break;
    case 'moveForward':
      if (Player.moveForward(indoorPlayer, gameMap)) {
        outcome.collectedItems = Player.lookForItems(indoorPlayer);
      }

      break;
    case 'moveLeft':
      if (Player.moveLeft(indoorPlayer, gameMap)) {
        outcome.collectedItems = Player.lookForItems(indoorPlayer);
      }

      break;
    case 'moveRight':
      if (Player.moveRight(indoorPlayer, gameMap)) {
        outcome.collectedItems = Player.lookForItems(indoorPlayer);
      }

      break;
    case 'moveBackward':
      if (Player.moveBackward(indoorPlayer, gameMap)) {
        outcome.collectedItems = Player.lookForItems(indoorPlayer);
      }

      break;
    case 'interact':
      const ahead = Player.getPositionAhead(indoorPlayer);

      if (ahead.x === indoorExit.x && ahead.y === indoorExit.y) {
        outcome.exitRequested = true;
        outcome.message = 'Wracasz na zewnątrz.';

        break;
      } else {
        const result = openGateAhead(indoorPlayer, gameMap);

        if (result === 'opened') {
          outcome.message = 'Otwierasz bramę.';
          outcome.gateOpened = true;
        } else if (result === 'locked') {
          outcome.message = 'Bramę można otworzyć tylko kluczem.';
        } else if (result === 'nothing') {
          outcome.message = 'Nie ma bramy przed tobą.';
        }
      }

      break;
  }

  return outcome;
};
