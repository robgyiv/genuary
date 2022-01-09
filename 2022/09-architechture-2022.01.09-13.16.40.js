const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');

const settings = {
  dimensions: [2048, 2048],
};

const HALF_W = settings.dimensions[0] / 2;
const HALF_H = settings.dimensions[1] / 2;
// Copy for each row?
const DIMENSIONS = {
  dimensions: {
    width: { remaining: undefined, size: undefined },
    height: { remaining: undefined, size: undefined },
    start: { x: undefined, y: undefined },
  },
  walls: [],
};
const EXTERNAL_WALL_THICKNESS = 16;
const INTERNAL_WALL_THICKNESS = 8;
const BG_COLOUR = '#fcfcfc';
const WALL_COLOUR = '#030303';

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = BG_COLOUR;
    context.fillRect(0, 0, width, height);

    const drawExternalWall = () => {
      const externalWallSize = HALF_W;
      const x = HALF_W - externalWallSize / 2;
      const y = HALF_H - externalWallSize / 2;
      DIMENSIONS.dimensions.start.x = x;
      DIMENSIONS.dimensions.start.y = y;
      console.dir('start', x, y);
      context.strokeStyle = WALL_COLOUR;
      context.lineWidth = EXTERNAL_WALL_THICKNESS;
      context.strokeRect(x, y, externalWallSize, externalWallSize);
      DIMENSIONS.dimensions.width.size = externalWallSize;
      DIMENSIONS.dimensions.height.size = externalWallSize;
      DIMENSIONS.dimensions.width.remaining = externalWallSize;
      DIMENSIONS.dimensions.height.remaining = externalWallSize;
      DIMENSIONS.walls.push({
        x,
        y,
        width: externalWallSize,
        height: externalWallSize,
        thickness: EXTERNAL_WALL_THICKNESS,
      });
    };

    const rowRooms = (x, y) => {
      const roomsThisRow = parseInt(random.range(0, 5));
      for (let i = 0; i < roomsThisRow; i++) {
        const availableX = DIMENSIONS.dimensions.width.remaining;
        const roomWidth = availableX / roomsThisRow;
        const roomHeight = random.pick([
          DIMENSIONS.dimensions.height.size / 4,
          DIMENSIONS.dimensions.height.size / 2,
          DIMENSIONS.dimensions.height.size,
        ]);
        const remaining = DIMENSIONS.dimensions.height.remaining - roomHeight;

        if (remaining >= roomHeight) {
          context.strokeStyle = WALL_COLOUR;
          context.lineWidth = INTERNAL_WALL_THICKNESS;
          context.strokeRect(x + roomWidth * i, y, roomWidth, roomHeight);
          const windowSize = random.pick([128, 256, 512]);
          console.log(true, windowSize, 512, y + roomHeight - windowSize / 2);
          // showPoint(512, y + roomHeight - windowSize / 2);
          Math.random() > 0.5 && window(true, windowSize, 512, y + roomHeight - windowSize / 2);
          Math.random() > 0.5 &&
            window(
              true,
              windowSize,
              x + DIMENSIONS.dimensions.width.size,
              y + roomHeight - windowSize / 2
            );
          Math.random() > 0.5 && window(false, windowSize, x + roomWidth - windowSize / 2, 512);
          Math.random() > 0.5 && window(false, windowSize, x + roomWidth - windowSize / 2, 1536);
          window(false, windowSize, x, 1536);
        }
      }
    };

    const decideRows = () => {
      const numRows = parseInt(random.range(1, 4));
      let x = DIMENSIONS.walls[0].x;
      let y = DIMENSIONS.walls[0].y;
      for (let i = 0; i < numRows; i++) {
        const bottomExternalEnds = HALF_H + DIMENSIONS.dimensions.height.size / 2;
        if (y < bottomExternalEnds) {
          rowRooms(x, y);
          y += y;
        }
      }
    };

    const showPoint = (x, y) => {
      context.beginPath();
      // context.arc(x, y, 32, 0, 2 * Math.PI);
      context.fillStyle = 'red';
      context.fillRect(x, y, 32, 32);
      context.fill();
      context.closePath();
    };

    const window = (isVertical, size, x, y) => {
      console.dir({ isVertical, size, x, y });
      context.fillStyle = BG_COLOUR;
      // const windowThickness = EXTERNAL_WALL_THICKNESS - EXTERNAL_WALL_THICKNESS / 8;
      const windowThickness = 8;
      const isTooWide = size + x < DIMENSIONS.dimensions.start.x + DIMENSIONS.dimensions.width.size;
      const isTooTall =
        size + y < DIMENSIONS.dimensions.start.y + DIMENSIONS.dimensions.height.size;
      if (isVertical && !isTooTall) {
        const xPos = x - windowThickness / 2;
        const yPos = y + EXTERNAL_WALL_THICKNESS / 2;
        // const windowSizes = [128, 256];
        // const windowHeight = random.pick(windowSizes);
        // showPoint(x, y);
        context.fillRect(xPos, yPos, windowThickness, size);
      }
      if (!isVertical && !isTooWide) {
        const xPos = x + windowThickness / 2;
        const yPos = y - windowThickness / 2;
        const windowSizes = [128, 256];
        const windowWidth = random.pick(windowSizes);
        // showPoint(x, y);
        context.fillRect(xPos, yPos, size, windowThickness);
      }
    };

    const drawWindows = () => {
      const windowSizes = [128, 256];

      const remainingV = DIMENSIONS.dimensions.height.size;
      // Vertical
      const numVertical = parseInt(random.range(0, 5));
      console.log(numVertical);
      for (let i = 0; i < numVertical; i++) {
        const size = random.pick(windowSizes);
        const startPos = [128, 512, 768, 1024];
        const startFrom = random.pick(startPos);
        startPos.slice(startFrom);
        console.dir({ startPos });
        window(true, size, 512, startFrom);
      }
      // window(true, 512, 512);
      // window(true, 512, 1024);
      // window(true, 1536, 1024);

      // Horizontal
      const remainingH = DIMENSIONS.dimensions.width.size;
      const numHorizontal = random.range(0, 5);
      // window(false, 512, 512);
    };

    drawExternalWall();
    decideRows();
    // drawWindows();
  };
};

canvasSketch(sketch, settings);
