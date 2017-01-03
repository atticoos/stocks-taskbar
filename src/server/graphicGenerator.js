import Canvas from 'canvas';
import {nativeImage} from 'electron';

const font = '12px Helvetica';
const SPACE = 5;
const TRI = 8;

function measureText (text) {
  var canvas = new Canvas();
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  return ctx.measureText(text);
}

function createCanvasFromData (quotes) {
  var measurements = quotes.map(quote => {
    var percent = Math.abs(quote.ChangePercent).toFixed(2) + '%';
    percent = (quote.ChangePercent > 0 ? '+' : '-') + percent;

    return {
      symbol: {
        value: quote.Symbol,
        size: measureText(quote.Symbol).width
      },
      percent: {
        value: percent,
        size: measureText(percent).width
      },
      up: quote.ChangePercent >= 0
    }
  });

  var totalSize = measurements.reduce((total, item) => {
    var itemTotal = item.symbol.size + SPACE + TRI + SPACE + item.percent.size + SPACE + SPACE;
    return total + itemTotal;
  }, 0);

  var canvas = new Canvas(totalSize, 20);
  var ctx = canvas.getContext('2d');
  ctx.font = font;

  var offset = 0;
  measurements.forEach(item => {
    drawText(ctx, item.symbol.value, offset);

    offset += item.symbol.size + SPACE;

    drawDirection(ctx, offset, item.up);

    offset += TRI + SPACE;

    drawText(ctx, item.percent.value, offset);

    offset += item.percent.size + SPACE + SPACE;
    //console.log('buliding at', offset)
  });

  return canvas;
}

function drawText (ctx, text, position) {
  ctx.fillStyle = 'black';
  ctx.fillText(text, position, 15);
}

function drawDirection (ctx, position, up) {
  ctx.fillStyle = up ? 'green' : 'red';

  var verticalTop = up ? 7 : 13;
  var verticalBot = up ? 13 : 7;

  var delta = 4;
  var horizontalLeft = position;
  var horizontalMid = horizontalLeft + delta;
  var horizontalRight = horizontalMid + delta;

  ctx.beginPath();
  ctx.moveTo(horizontalLeft, verticalBot);
  ctx.lineTo(horizontalMid, verticalTop);
  ctx.lineTo(horizontalRight, verticalBot);
  ctx.lineTo(horizontalLeft, verticalBot);
  ctx.closePath();
  ctx.fill();
}

export function createTickerImage (data, offset = 0) {
  var canvas = new Canvas(200, 20);
  var ctx = canvas.getContext('2d');
  ctx.font = font;

  var img = new Canvas.Image();
  img.src = createCanvasFromData(data).toBuffer();
  ctx.drawImage(img, -offset, 0, img.width, 20);

  return nativeImage.createFromBuffer(canvas.toBuffer(), {
    width: 200,
    height: 20,
    scaleFactor: 1.0
  });

}
