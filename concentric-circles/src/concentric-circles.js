const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');

const WIDTH = 1080;
const HEIGHT = 1080;

const LINEWIDTH = 5;
const NUM = 30;
const GREY_FACTOR = 255 / NUM

const settings = {
  dimensions: [ WIDTH, HEIGHT ],
  animate: true,
  loop: true,
  duration: 30
};

const sketch = () => {
  const initialRadius = 50;
  const gap = 10 + LINEWIDTH;
  const shakingFactor = random.range(-20, 20);

  const attributesArray = [];
  for (let i = 0; i < NUM; i++) {
    attributesArray.push({
      factor: random.range(-5, 5),
      startAngle: random.range(0, Math.PI),
      endAngle: random.range(Math.PI, Math.PI * 2),
    });
  }

  return ({ context, width, height, playhead }) => {
    context.fillStyle = (Math.random() < 0.995) ? 'black' : 'white';
    context.fillRect(0, 0, width, height);

    if (Math.random() < 0.995) context.translate(shakingFactor, shakingFactor);

    if (Math.random() < 0.995) {
      attributesArray.forEach((attributes, index) => {
        new Circle(initialRadius + gap * index, attributes).draw(context, playhead, index);
      });
    }
  };
};

canvasSketch(sketch, settings);

class Circle {
  constructor(radius, attributes) {
    this.radius = radius;
    this.attributes = attributes;
  }

  draw(context, playhead, index) {
    context.save();
    context.translate(WIDTH / 2, HEIGHT / 2);
    const angle = math.mapRange(playhead, 0, 1, 0, 2 * Math.PI);
    context.rotate(Math.sin(angle) * this.attributes.factor);

    context.beginPath();
    context.arc(0, 0, this.radius, this.attributes.startAngle, this.attributes.endAngle);
    context.strokeStyle = `rgb(${GREY_FACTOR * index}, ${GREY_FACTOR * index}, ${GREY_FACTOR * index})`
    context.lineWidth = LINEWIDTH;
    context.stroke();
    context.closePath();

    context.restore();
  }
}
