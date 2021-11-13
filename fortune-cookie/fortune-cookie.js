import canvasSketch from 'canvas-sketch';

import {Cookie, Point} from './objects';
import {prepareCanvas} from './utils';

const radius = 96;
const width = radius * 16;
const height = width / 2;

const settings = {
  dimensions: [ width, height ],
  animate: true,
  playbackRate: 'throttle',
  fps: 0.5
};

const sketch = () => {
  return ({ context, width, height }) => {

    prepareCanvas(context, width, height);

    const cookies = [];

    const coordinates = [
        // First row
        new Point(1 * width / 8, height / 4),
        new Point(3 * width / 8, height / 4),
        new Point(5 * width / 8, height / 4),
        new Point(7 * width / 8, height / 4),
        // Second row
        new Point(1 * width / 8, 3 * height / 4),
        new Point(3 * width / 8, 3 * height / 4),
        new Point(5 * width / 8, 3 * height / 4),
        new Point(7 * width / 8, 3 * height / 4),
    ];
    coordinates.forEach((coordinate) => cookies.push(new Cookie(coordinate)));

    cookies.forEach((cookie) => {
      cookie.prepare(context, radius);
      cookie.bite(context, radius);
    });
  };
};

canvasSketch(sketch, settings);
