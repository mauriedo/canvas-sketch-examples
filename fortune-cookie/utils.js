export const FOREGROUND = 'ghostwhite';
export const BACKGROUND = 'black';

export const prepareCanvas = (context, width, height) => {
  context.fillStyle = BACKGROUND;
  context.fillRect(0, 0, width, height);
}
