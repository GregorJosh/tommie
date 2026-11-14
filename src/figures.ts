const FRONT_WALL_WIDTH = 0.7;
const FRONT_WALL_HEIGHT = 0.7;
const FRONT_WALL_LEFT = 0.15;
const FRONT_WALL_TOP = 0.15;

const drawSky = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  context.fillStyle = '#394867';
  context.fillRect(0, 0, canvas.width, canvas.height / 2);
};

const drawGround = (context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  context.fillStyle = '#55504a';
  context.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);
};

const drawFloorTile = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  distance: number = 1,
  sideOffset: number = 0,
  shade: number = 0,
) => {
  if (!image.complete || image.naturalWidth === 0 || distance < 0) {
    return;
  }

  const horizon = canvas.height / 2;
  const projection = (canvas.height * FRONT_WALL_HEIGHT) / 2;

  const farY = horizon + projection / (distance + 1);
  const nearY = distance === 0 ? canvas.height : horizon + projection / distance;

  const startY = Math.max(0, Math.round(farY));
  const endY = Math.min(canvas.height, Math.round(nearY));

  context.save();
  context.imageSmoothingEnabled = false;
  context.fillStyle = `rgba(0, 0, 0, ${shade})`;

  for (let y = startY; y < endY; y++) {
    const depth = projection / (y + 0.5 - horizon);
    const rowWidth = (canvas.width * FRONT_WALL_WIDTH) / depth;

    const left = Math.round(canvas.width / 2 + (sideOffset - 0.5) * rowWidth);
    const right = Math.round(canvas.width / 2 + (sideOffset + 0.5) * rowWidth);

    const textureV = Math.max(0, Math.min(1, distance + 1 - depth));
    const sourceY = Math.min(image.naturalHeight - 1, Math.floor(textureV * image.naturalHeight));

    context.drawImage(image, 0, sourceY, image.naturalWidth, 1, left, y, right - left, 1);

    if (shade > 0) {
      context.fillRect(left, y, right - left, 1);
    }
  }

  context.restore();
};

const drawLeftWall = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  color: string = '#786658',
) => {
  const bX = Math.round(canvas.width * FRONT_WALL_LEFT);
  const bY = canvas.height * FRONT_WALL_TOP;
  const cX = Math.round(canvas.width * FRONT_WALL_LEFT);
  const cY = canvas.height * (FRONT_WALL_TOP + FRONT_WALL_HEIGHT);

  context.fillStyle = color;
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(bX, bY);
  context.lineTo(cX, cY);
  context.lineTo(0, canvas.height);
  context.closePath();
  context.fill();
};

const drawFarLeftWall = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  distance: number = 1,
  sideOffset: number = -1,
  color: string = '#786658',
) => {
  const shift = sideOffset + 1;

  const nearCellWidth = (canvas.width * FRONT_WALL_WIDTH) / distance;
  const farCellWidth = (canvas.width * FRONT_WALL_WIDTH) / (distance + 1);
  const nearCellHeight = (canvas.height * FRONT_WALL_HEIGHT) / distance;
  const farCellHeight = (canvas.height * FRONT_WALL_HEIGHT) / (distance + 1);

  const aX = Math.round((canvas.width - nearCellWidth) / 2 + shift * nearCellWidth);
  const aY = Math.round((canvas.height - nearCellHeight) / 2);
  const bX = Math.round((canvas.width - farCellWidth) / 2 + shift * farCellWidth);
  const bY = Math.round((canvas.height - farCellHeight) / 2);
  const cX = bX;
  const cY = Math.round((canvas.height + farCellHeight) / 2);
  const dX = aX;
  const dY = Math.round((canvas.height + nearCellHeight) / 2);

  context.fillStyle = color;
  context.beginPath();
  context.moveTo(aX, aY);
  context.lineTo(bX, bY);
  context.lineTo(cX, cY);
  context.lineTo(dX, dY);
  context.closePath();
  context.fill();
};

const drawRightWall = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  color: string = '#625348',
) => {
  const bX = Math.round(canvas.width * (FRONT_WALL_LEFT + FRONT_WALL_WIDTH));
  const bY = canvas.height * FRONT_WALL_TOP;
  const cX = Math.round(canvas.width * (FRONT_WALL_LEFT + FRONT_WALL_WIDTH));
  const cY = canvas.height * (FRONT_WALL_TOP + FRONT_WALL_HEIGHT);

  context.fillStyle = color;
  context.beginPath();
  context.moveTo(canvas.width, 0);
  context.lineTo(bX, bY);
  context.lineTo(cX, cY);
  context.lineTo(canvas.width, canvas.height);
  context.closePath();
  context.fill();
};

const drawFarRightWall = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  distance: number = 1,
  sideOffset: number = 1,
  color: string = '#625348',
) => {
  const shift = sideOffset;

  const nearCellWidth = (canvas.width * FRONT_WALL_WIDTH) / distance;
  const farCellWidth = (canvas.width * FRONT_WALL_WIDTH) / (distance + 1);
  const nearCellHeight = (canvas.height * FRONT_WALL_HEIGHT) / distance;
  const farCellHeight = (canvas.height * FRONT_WALL_HEIGHT) / (distance + 1);

  const aX = Math.round((canvas.width - nearCellWidth) / 2 + shift * nearCellWidth);
  const aY = Math.round((canvas.height - nearCellHeight) / 2);
  const bX = Math.round((canvas.width - farCellWidth) / 2 + shift * farCellWidth);
  const bY = Math.round((canvas.height - farCellHeight) / 2);
  const cX = bX;
  const cY = Math.round((canvas.height + farCellHeight) / 2);
  const dX = aX;
  const dY = Math.round((canvas.height + nearCellHeight) / 2);

  context.fillStyle = color;
  context.beginPath();
  context.moveTo(aX, aY);
  context.lineTo(bX, bY);
  context.lineTo(cX, cY);
  context.lineTo(dX, dY);
  context.closePath();
  context.fill();
};

const drawFrontWall = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  distance: number = 1,
  sideOffset: number = 0,
  color: string = '#8b7866',
) => {
  const cellWidth = (canvas.width * FRONT_WALL_WIDTH) / distance;
  const cellHeight = (canvas.height * FRONT_WALL_HEIGHT) / distance;
  const baseX = (canvas.width - cellWidth) / 2;

  const x = Math.round(baseX + sideOffset * cellWidth);
  const endX = Math.round(baseX + (sideOffset + 1) * cellWidth);
  const y = Math.round((canvas.height - cellHeight) / 2);
  const endY = Math.round((canvas.height + cellHeight) / 2);

  const width = endX - x;
  const height = endY - y;

  context.fillStyle = color;
  context.fillRect(x, y, width, height);
};

const drawGate = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  distance: number = 1,
  sideOffset: number = 0,
) => {
  drawFrontWall(context, canvas, distance, sideOffset, '#4d7d91');
};

const drawExitDoor = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  distance: number = 1,
  sideOffset: number = 0,
) => {
  const cellWidth = (canvas.width * FRONT_WALL_WIDTH) / distance;
  const cellHeight = (canvas.height * FRONT_WALL_HEIGHT) / distance;

  const width = Math.round(cellWidth * 0.25);
  const height = Math.round(cellHeight * 0.8);

  const centerX = canvas.width / 2 + sideOffset * cellWidth;
  const bottom = Math.round((canvas.height + cellHeight) / 2);

  const x = Math.round(centerX - width / 2);
  const y = bottom - height;

  context.fillStyle = '#68442e';
  context.fillRect(x, y, width, height);

  const handleSize = Math.max(1, Math.round(8 / distance));

  context.fillStyle = '#d8b86b';
  context.fillRect(
    Math.round(x + width * 0.8),
    Math.round(y + height * 0.55),
    handleSize,
    handleSize,
  );
};

const drawSideExitDoor = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  side: 'left' | 'right',
) => {
  const pointOnWall = (alongWall: number, heightRatio: number) => {
    const leftX = Math.round(canvas.width * FRONT_WALL_LEFT) * alongWall;
    const top = canvas.height * FRONT_WALL_TOP * alongWall;
    const bottom = canvas.height - top;

    return {
      x: side === 'left' ? leftX : canvas.width - leftX,
      y: bottom - (bottom - top) * heightRatio,
    };
  };

  const nearTop = pointOnWall(-0.25, 0.8);
  const farTop = pointOnWall(0.15, 0.8);
  const farBottom = pointOnWall(0.15, 0);
  const nearBottom = pointOnWall(-0.25, 0);

  context.fillStyle = '#68442e';
  context.beginPath();
  context.moveTo(nearTop.x, nearTop.y);
  context.lineTo(farTop.x, farTop.y);
  context.lineTo(farBottom.x, farBottom.y);
  context.lineTo(nearBottom.x, nearBottom.y);
  context.closePath();
  context.fill();

  const handle = pointOnWall(side === 'left' ? 0.05 : -0.25, 0.36);

  context.fillStyle = '#d8b86b';
  context.fillRect(Math.round(handle.x) - 2, Math.round(handle.y) - 2, 4, 4);
};

const drawKey = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  image: HTMLImageElement,
  distance: number = 1,
  sideOffset: number = 0,
) => {
  if (!image.complete || image.naturalWidth === 0) {
    return;
  }

  const width = Math.max(1, Math.round((canvas.width * 0.08) / distance));
  const height = Math.max(1, Math.round((canvas.height * 0.03) / distance));

  const floorY = canvas.height * (0.5 + FRONT_WALL_HEIGHT / (2 * (distance + 0.5)));

  const cellWidth = (canvas.width * FRONT_WALL_WIDTH) / (distance + 0.5);
  const centerX = canvas.width / 2 + sideOffset * cellWidth;
  const x = Math.round(centerX - width / 2);
  const y = Math.round(floorY) - height;

  context.save();
  context.fillStyle = 'rgba(0, 0, 0, 0.25)';
  context.beginPath();
  context.ellipse(
    centerX,
    y + height * 0.65,
    width * 0.48,
    Math.max(1, height * 0.2),
    0,
    0,
    Math.PI * 2,
  );
  context.fill();
  context.restore();

  context.drawImage(image, x, y, width, height);
};

export {
  drawSky,
  drawGround,
  drawFloorTile,
  drawLeftWall,
  drawFarLeftWall,
  drawRightWall,
  drawFarRightWall,
  drawFrontWall,
  drawGate,
  drawExitDoor,
  drawSideExitDoor,
  drawKey,
};
