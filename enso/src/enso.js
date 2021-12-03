import canvasSketch from 'canvas-sketch';

import {ACCENT, prepareCanvas} from './utils';
import {Range, Stroke} from "./objects";

export const WIDTH = 512;
export const HEIGHT = 512;

const settings = {
  dimensions: [ WIDTH, HEIGHT ],
  animate: true,
  loop: true,
  duration: 30,
  fps: 0.5,
  playbackRate: 'throttle'
};

const sketch = () => {
  return ({ context, width, height }) => {
    prepareCanvas(context, width, height);

    const initialRadius = WIDTH / 4;
    const startRange = new Range(1.00, 1.15);
    const endRange = new Range(2.50, 2.95);
    const numStrokes = 6;

    const strokes = [];
    for (let i = 0; i < numStrokes; i++) {
      strokes.push(new Stroke(initialRadius + 10 * i, startRange, endRange));
    }

    strokes.forEach(stroke => stroke.paint(context));

    context.font = 'bold 40px serif'
    context.fillStyle = ACCENT;
    context.fillText('円相', WIDTH * 0.8, HEIGHT * 0.95);
  };
};

canvasSketch(sketch, settings);
