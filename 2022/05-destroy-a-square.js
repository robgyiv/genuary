const lines = [];
const fr = 60;

function setup() {
  createCanvas(4096, 4096);
  background(220);
  frameRate(fr);
  thing();
}

function thing() {
  const startX = width / 6;
  const startY = height / 3;
  const endX = startX * 2;
  const endY = startY * 2;
  const stroke = 40;
  const strokeWeight = 6;
  
  for (let i = 0; i < 200; i++) {
    // stroke(20);
    // strokeWeight(6);
    const foo = new Line(startX + (10 * i), startY - i, endX + (10 * i), endY + i, stroke, strokeWeight);
    foo.draw();
    lines.push(foo);
  }
  
  for (let i = 0; i < 200; i++) {
    const foo = new Line(endX + (10 * i), endY - i, startX + (10 * i), startY + i, stroke, strokeWeight);
    foo.draw();
    lines.push(foo);
  }
}

class Line {
  constructor(startX, startY, endX, endY, stroke, strokeWeight) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.stroke = stroke;
    this.strokeWeight = strokeWeight;
    this.isUp = true;
  }
  
  draw() {
    stroke(this.stroke);
    strokeWeight(this.strokeWeight);
    line(this.startX, this.startY, this.endX, this.endY);
  }
  
  animate() {
    // if (this.strokeWeight <= 8) this.strokeWeight += 1;
    // else this.strokeWeight -= 1;
    // let isUp = true;
    // if (frameCount > 0 && frameCount % fr === 0) this.isUp = false
    // if (this.isUp) this.strokeWeight += 1;
    // else this.strokeWeight -= 1;
    // this.strokeWeight += (frameCount % 8);
    if (frameCount % fr === 0 && frameCount % fr <= fr - 1) {
      this.strokeWeight += 1;
    }
    else {
      this.strokeWeight -= 1;
    }
  }
}

function draw() {
  // background(220);
  // lines.forEach(line => {
  //   line.draw();
  //   // line.animate();
  // })
}
