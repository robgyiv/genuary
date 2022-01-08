const canvasSketch = require('canvas-sketch');
const random = require('canvas-sketch-util/random');
const p5 = require('p5');

const preload = (p5) => {
  // You can use p5.loadImage() here, etc...
};

const settings = {
  // Pass the p5 instance, and preload function if necessary
  p5: { p5, preload },
  // Turn on a render loop
  animate: true,
  duration: 4,
  dimensions: [2048, 2048],
  attributes: {
    antialias: true,
  },
  fps: 60,
};

canvasSketch(() => {
  // Return a renderer, which is like p5.js 'draw' function
  const yellow = '#FFC43D';
  const blue = '#48ACF0';
  return ({ p5, time, width, height }) => {
    // p5.frameRate(60);
    p5.background(blue);
    p5.noFill();
    p5.beginShape();
    let xOff = 0.0;
    for (let x = 0; x < width; x++) {
      p5.stroke(240);
      p5.strokeWeight(8);
      // let y =
      //   height / 2 +
      //   (p5.sin(time * 4 + xOff) * height) / 16 +
      //   p5.noise(xOff + time) * (height / 16);
      let y = height / 2 + (p5.sin(time * Math.PI + xOff) * height) / 8;

      // let y = p5.noise(xOff + time * 2) * height;
      p5.vertex(x, y);
      xOff += 0.01;
    }
    p5.endShape();
  };
}, settings);
