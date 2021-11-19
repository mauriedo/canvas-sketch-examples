export const FOREGROUND = 'black';
export const BACKGROUND = 'floralwhite';
export const ACCENT = 'firebrick';

  export const prepareCanvas = (context, width, height) => {
  context.fillStyle = BACKGROUND;
  context.fillRect(0, 0, width, height);
}
