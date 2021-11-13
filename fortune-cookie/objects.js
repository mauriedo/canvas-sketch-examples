import random from 'canvas-sketch-util/random';

import {BACKGROUND, FOREGROUND} from "./utils";

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class RandomPoint extends Point {
  constructor(radius) {
    const values = [0, -radius];
    super(random.pick(values), random.pick(values));
  }
}

export class Cookie {
  constructor(coordinates) {
    this.x = coordinates.x;
    this.y = coordinates.y;
  }

  prepare(context, radius) {
    context.save()
    context.translate(this.x, this.y);

    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI);
    context.fillStyle = FOREGROUND;
    context.fill();
    context.closePath();

    context.restore();
  }

  partial(context, point, side) {
    context.fillStyle = BACKGROUND;
    context.fillRect(point.x, point.y, side, side);
  }

  eat(context, radius) {
    const point = new Point(-radius, -radius);
    this.partial(context, point, 2 * radius);
  }

  bite(context, radius) {
    context.save();
    context.translate(this.x, this.y);

    const biteSizes = [
      {value: 'complete', weight: 1},
      {value: 'partial', weight: 4},
      {value: 'none', weight: 1},
    ];
    const biteSize = random.weightedSet(biteSizes)

    switch (biteSize) {
      case 'complete':
        this.eat(context, radius)
        break;
      case 'partial':
        const quadrant = new RandomPoint(radius);
        this.partial(context, quadrant, radius);
        break;
      case 'none':
        break;
    }

    context.restore();
  }
}
