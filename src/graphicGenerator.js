import Canvas from 'canvas';
import {nativeImage} from 'electron';

const font = '12px Helvetica';

function measureText (text) {
  var canvas = new Canvas();
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  return ctx.measureText(text);
}

export function createTextCanvas (text) {
  var canvas = new Canvas(measureText(text).width, 20);
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillText(text, 0, 15);
  return canvas;
}

export function createTickerImage (text, offset = 0) {
  console.log({text})
  var canvas = new Canvas(200, 20);
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  var {width} = ctx.measureText(text);

  var img = new Canvas.Image();
  img.src = createTextCanvas(text).toBuffer();
  console.log('width', width)
  console.log('at offset', -offset)
  ctx.drawImage(img, -offset, 0, width, 20);

  return nativeImage.createFromBuffer(canvas.toBuffer(), {
    width: 200,
    height: 20,
    scaleFactor: 1.0
  });

}
