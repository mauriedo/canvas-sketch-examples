import random from 'canvas-sketch-util/random';

import {FOREGROUND} from "./utils";
import {HEIGHT, WIDTH} from "./enso";

export class Range {
  constructor(min, max) {
    this.min = min;
    this.max = max;
  }
}

export class Stroke {
  constructor(radius, startAngleRange, endAngleRange) {
    this.radius = radius;
    this.startAngle = Math.PI * random.range(startAngleRange.min, startAngleRange.max);
    this.endAngle = Math.PI * random.range(endAngleRange.min, endAngleRange.max);

    this.minLineWidth = 10;
    this.maxLineWidth = 20;
  }

  paint(context) {
    const cx = WIDTH / 2;
    const cy = HEIGHT / 2;

    context.beginPath();
    context.arc(cx, cy, this.radius, this.startAngle, this.endAngle);
    context.strokeStyle = FOREGROUND;
    context.lineWidth = random.range(this.minLineWidth, this.maxLineWidth);
    context.lineCap = 'round'
    context.stroke();
    context.closePath();
  }
}
