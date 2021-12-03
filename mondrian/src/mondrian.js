const canvasSketch = require('canvas-sketch');
const random = require("canvas-sketch-util/random");

const width = 2048;
const height = 1080;

const settings = {
  dimensions: [ width, height ],
  animate: true,
  loop: true,
  playbackRate: 'throttle',
  fps: 0.5,
  duration: 30
};

const sketch = () => {
  const lineWidth = 50;

  const colors = [
    {value: 'blue', weight: 1},
    {value: 'red', weight: 1},
    {value: 'yellow', weight: 1},
    {value: 'white', weight: 4},
  ];

  const rows = 7;
  const cols = 3;

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    context.lineWidth = lineWidth;

    const widths = getRandomDimensions(rows, width, 100);
    const heights = getRandomDimensions(cols, height, 100);

    let x = 0;
    for (let i = 0; i < rows; i++) {
      let y = 0;
      for (let j = 0; j < cols; j++) {
        context.beginPath();
        context.fillStyle = random.weightedSet(colors);
        context.rect(x, y, widths[i], heights[j]);
        context.stroke();
        context.fill();

        y += heights[j];
      }
      x += widths[i];
    }
  };
};

canvasSketch(sketch, settings);

const getRandomDimensions = (num, total, min = 0) => {
  const dimensions = [];
  for (let i = 0; i < num - 1; i++) {
    let range = random.range(0, total - sum(dimensions));
    range > min ? dimensions.push(range) : dimensions.push(min);
  }
  dimensions.push(total - sum(dimensions));
  return dimensions;
}

const sum = (array) => {
  return array.reduce((sum, element) => {
    return sum += element;
  }, 0);
}