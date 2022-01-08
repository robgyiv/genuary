const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [2048, 2048],
};

const sketch = () => {
  const GRID_SIZE = 4;
  const PAGE_MARGIN = settings.dimensions[0] / 4;
  const SQUARES_SIZE = settings.dimensions[0] / 2;
  const PADDING = 8;
  const SQUARE_SIZE = SQUARES_SIZE / 4 - PADDING / 2;
  const PER_GRID = 20;
  const IN_GRID_SPACING = 15;
  const STROKE_LONG = 28;
  const STROKE_SHORT = 1;
  const LINE_WIDTH = 2;
  console.log({ GRID_SIZE, PAGE_MARGIN, SQUARES_SIZE, PADDING, SQUARE_SIZE });
  const BLACK = '#D2D3D4';
  // const YELLOW = '#F0F0C0';
  // const BLUE = '#D8D8F0';
  // const RED = '#F0D8D8';
  const YELLOW = '#F0F0C0';
  const BLUE = '#D8D8F0';
  const RED = '#F0D8D8';

  const PALETTE = [BLACK, YELLOW, BLUE, RED];

  const randomRange = (min, max) => Math.random() * (max - min) + min;

  return ({ context, width, height }) => {
    context.fillStyle = '#F3EEEA';
    context.fillRect(0, 0, width, height);

    const vertical = (x, y, width, height) => {
      const colour = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      for (let i = 0; i < width; i += IN_GRID_SPACING) {
        for (let j = 0; j < height; j += IN_GRID_SPACING) {
          const randomX = randomRange(2, 8);
          const randomY = randomRange(2, 8);
          const startX = x + i + randomX;
          const startY = y + j + randomY;
          if (startX + STROKE_SHORT < x + width && startY + STROKE_LONG < y + height) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineWidth = LINE_WIDTH;
            context.lineTo(startX + STROKE_SHORT, startY + STROKE_LONG);
            // context.strokeStyle = colour;
            context.strokeStyle = YELLOW;
            context.stroke();
            context.closePath();
          }
        }
      }
    };

    const horizontal = (x, y, width, height) => {
      const colour = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      for (let i = 0; i < width; i += IN_GRID_SPACING) {
        for (let j = 0; j < height; j += IN_GRID_SPACING) {
          const randomX = randomRange(2, 8);
          const randomY = randomRange(2, 8);
          const startX = x + i + randomX;
          const startY = y + j + randomY;
          if (startX + STROKE_LONG < x + width && startY + STROKE_SHORT < y + height) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineWidth = LINE_WIDTH;
            context.lineTo(startX + STROKE_LONG, startY + STROKE_SHORT);
            // context.strokeStyle = colour;
            context.strokeStyle = BLACK;
            context.stroke();
            context.closePath();
          }
        }
      }
    };

    const diagonalLR = (x, y, width, height) => {
      const colour = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      for (let i = 0; i < width; i += IN_GRID_SPACING) {
        for (let j = 0; j < height; j += IN_GRID_SPACING) {
          const randomX = randomRange(2, 8);
          const randomY = randomRange(2, 8);
          const startX = x + i + randomX;
          const startY = y + j + randomY;
          if (startX + STROKE_LONG < x + width && startY + STROKE_LONG < y + height) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineWidth = LINE_WIDTH;
            context.lineTo(startX + STROKE_LONG, startY + STROKE_LONG);
            // context.strokeStyle = colour;
            context.strokeStyle = RED;
            context.stroke();
            context.closePath();
          }
        }
      }
    };

    const diagonalRL = (x, y, width, height) => {
      const colour = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      for (let i = 0; i < width; i += IN_GRID_SPACING) {
        for (let j = 0; j < height; j += IN_GRID_SPACING) {
          const randomX = randomRange(2, 8);
          const randomY = randomRange(2, 8);
          const startX = x + i + randomX;
          const startY = y + j + randomY;
          if (startX + STROKE_LONG < x + width && startY - STROKE_LONG > y) {
            context.beginPath();
            context.moveTo(startX, startY);
            context.lineWidth = LINE_WIDTH;
            context.lineTo(startX + STROKE_LONG, startY - STROKE_LONG);
            // context.strokeStyle = colour;
            context.strokeStyle = BLUE;

            context.stroke();
            context.closePath();
          }
        }
      }
    };

    const boundary = (x, y, width, height, i) => {
      console.log({ x, y, width, height });
      // const dice = 4;
      const dice = parseInt(randomRange(0, 13));
      if (dice === 0) vertical(x, y, width, height);
      if (dice === 1) horizontal(x, y, width, height);
      if (dice === 2) diagonalLR(x, y, width, height);
      if (dice === 3) diagonalRL(x, y, width, height);
      if (dice === 4) {
        vertical(x, y, width, height);
        diagonalRL(x, y, width, height);
      }
      if (dice === 5) {
        vertical(x, y, width, height);
        horizontal(x, y, width, height);
      }
      if (dice === 6) {
        vertical(x, y, width, height);
        diagonalLR(x, y, width, height);
      }
      if (dice === 7) {
        horizontal(x, y, width, height);
        diagonalLR(x, y, width, height);
      }
      if (dice === 8) {
        horizontal(x, y, width, height);
        diagonalRL(x, y, width, height);
      }
      if (dice === 9) {
        diagonalLR(x, y, width, height);
        diagonalRL(x, y, width, height);
      }
      if (dice === 10) {
        horizontal(x, y, width, height);
        diagonalLR(x, y, width, height);
        diagonalRL(x, y, width, height);
      }
      if (dice === 11) {
        vertical(x, y, width, height);
        diagonalLR(x, y, width, height);
        diagonalRL(x, y, width, height);
      }
      if (dice === 12) {
        vertical(x, y, width, height);
        horizontal(x, y, width, height);
        diagonalLR(x, y, width, height);
        diagonalRL(x, y, width, height);
      }
    };

    let iteration = 0;
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        // context.strokeStyle = 'black';
        // context.strokeRect(
        //   x * SQUARE_SIZE + PADDING * x + PAGE_MARGIN,
        //   y * SQUARE_SIZE + PADDING * y + PAGE_MARGIN,
        //   SQUARE_SIZE,
        //   SQUARE_SIZE
        // );
        boundary(
          // x * SQUARE_SIZE + PADDING * x + PAGE_MARGIN,
          // y * SQUARE_SIZE + PADDING * y + PAGE_MARGIN,
          PAGE_MARGIN + x * SQUARE_SIZE + PADDING * x,
          PAGE_MARGIN + y * SQUARE_SIZE + PADDING * y,
          SQUARE_SIZE,
          SQUARE_SIZE,
          iteration
        );
        iteration++;
      }
    }
    // context.fillStyle = '#F3EEEA';
    // context.strokeStyle = 'red';
    // context.lineWidth = 4;
    // context.strokeRect(0, 512, 512, 1024);
    // context.strokeRect(512, 512, 1024, 1024);
    // context.strokeRect(1536, 512, 1024, 1024);
  };
};

canvasSketch(sketch, settings);
