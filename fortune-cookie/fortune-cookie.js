import canvasSketch from 'canvas-sketch';

import {Cookie, Point} from './objects';
import {prepareCanvas} from './utils';

const RADIUS = 96;
const WIDTH = RADIUS * 16;
const HEIGHT = WIDTH / 2;

const settings = {
  dimensions: [ WIDTH, HEIGHT ],
  animate: true,
  playbackRate: 'throttle',
  fps: 0.5
};

const sketch = ({ width, height }) => {
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

  return ({ context, width, height }) => {

    prepareCanvas(context, width, height);

    cookies.forEach((cookie) => {
      cookie.prepare(context, RADIUS);
      cookie.bite(context, RADIUS);
    });
  };
};

canvasSketch(sketch, settings);
