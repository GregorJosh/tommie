import type { OutdoorPlayer } from './player';
import type { GameObjectBounds } from './geometry';
import type { OutdoorItem, Point } from './outdoor';

export const renderOutdoorScene = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  player: OutdoorPlayer,
  target: Point | null,
  bgImage: HTMLImageElement,
  sidewalkBounds: GameObjectBounds,
  idleImage: HTMLImageElement,
  idleUpImage: HTMLImageElement,
  idleDownImage: HTMLImageElement,
  walkImage: HTMLImageElement,
  walkUpImage: HTMLImageElement,
  walkDownImage: HTMLImageElement,
  outdoorItems: OutdoorItem[],
  foldedNoteImage: HTMLImageElement,
  carImages: HTMLImageElement[],
  isPlayerMoving: boolean = false,
  frameIndex: number = 0,
  debugMode: boolean = false,
) => {
  context.fillStyle = '#263648';
  context.fillRect(0, 0, canvas.width, canvas.height);

  if (bgImage.complete && bgImage.naturalWidth > 0) {
    context.save();
    context.imageSmoothingEnabled = false;

    context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);

    context.restore();
  }

  for (const item of outdoorItems) {
    if (item.collected) {
      continue;
    }

    context.save();
    context.translate(item.position.x, item.position.y);

    context.fillStyle = 'rgba(0, 0, 0, 0.2)';
    context.beginPath();
    context.ellipse(0, 2, 7, 2, 0, 0, Math.PI * 2);
    context.fill();

    if (foldedNoteImage.complete && foldedNoteImage.naturalWidth > 0) {
      context.imageSmoothingEnabled = false;
      context.drawImage(foldedNoteImage, -12, -12, 24, 24);
    } else {
      context.fillStyle = '#e8dfb8';
      context.fillRect(-6, -3, 12, 6);
    }

    context.restore();
  }

  if (target !== null && debugMode) {
    context.save();

    context.strokeStyle = '#74e0a1';
    context.lineWidth = 2;

    context.beginPath();
    context.arc(target.x, target.y, 6, 0, Math.PI * 2);
    context.stroke();

    context.restore();
  }

  // Pozycja oznacza punkt pod stopami postaci.
  const feetX = player.x;
  const feetY = player.y;

  const progress = Math.max(
    0,
    Math.min(1, (feetY - sidewalkBounds.top) / (sidewalkBounds.bottom - sidewalkBounds.top)),
  );
  const scale = 0.8 + progress * 0.4;

  const width = Math.round(50 * scale);
  const height = Math.round(75 * scale);

  context.save();
  context.fillStyle = 'rgba(0, 0, 0, 0.25)';

  context.beginPath();
  context.ellipse(feetX, feetY, width * 0.25, height * 0.03, 0, 0, Math.PI * 2);
  context.fill();

  context.restore();

  let spriteImage = isPlayerMoving ? walkImage : idleImage;
  let spriteFrame = frameIndex;

  if (player.facing === 'up') {
    spriteImage = isPlayerMoving ? walkUpImage : idleUpImage;
  } else if (player.facing === 'down') {
    spriteImage = isPlayerMoving ? walkDownImage : idleDownImage;
  }

  if (spriteImage.complete && spriteImage.naturalWidth > 0) {
    const frameWidth = 144;
    const frameHeight = 144;
    const anchorX = 72;
    const anchorY = 120;
    const referenceBodyHeight = 94;

    const sourceX = spriteFrame * frameWidth;

    const spriteScale = height / referenceBodyHeight;
    const destinationWidth = frameWidth * spriteScale;
    const destinationHeight = frameHeight * spriteScale;

    context.save();
    context.imageSmoothingEnabled = false;

    context.translate(Math.round(feetX), Math.round(feetY));
    context.scale(player.facing === 'left' ? -1 : 1, 1);

    context.drawImage(
      spriteImage,
      sourceX,
      0,
      frameWidth,
      frameHeight,
      -anchorX * spriteScale,
      -anchorY * spriteScale,
      destinationWidth,
      destinationHeight,
    );

    context.restore();
  } else {
    // Zastępcza postać wyrasta w górę od punktu stóp.
    context.fillStyle = '#d6a04f';
    context.fillRect(feetX - width / 2, feetY - height, width, height);
  }

  if (debugMode) {
    // Czerwony znacznik punktu stóp.
    context.save();

    context.fillStyle = 'red';
    context.fillRect(feetX - 2, feetY - 2, 4, 4);

    context.font = '10px monospace';
    context.fillText(player.facing, feetX + 6, feetY - 6);

    context.restore();
  }

  context.save();
  context.imageSmoothingEnabled = false;

  context.scale(canvas.width / 1672, canvas.height / 941);

  for (const carImage of carImages) {
    if (carImage.complete && carImage.naturalWidth > 0) {
      context.drawImage(carImage, 0, 0);
    }
  }

  context.restore();
};
