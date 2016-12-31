import Canvas from 'canvas';
import {nativeImage} from 'electron';

const font = '12px Helvetica';
const SPACE = 5;
const TRI = 5;

function measureText (text) {
  var canvas = new Canvas();
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  return ctx.measureText(text);
}

function createCanvasFromData (quotes) {
  console.log('wtf', quotes)
  var measurements = quotes.map(quote => {
    var symbolSize = measureText(quote.Symbol).width;
    var percentSize = measureText(Math.abs(quote.ChangePercent).toFixed(2)).width;

    return {
      symbol: {
        value: quote.Symbol,
        size: symbolSize
      },
      percent: {
        value: Math.abs(quote.ChangePercent),
        size: percentSize
      },
      up: quote.ChangePercent >= 0
    }
  });

  var totalSize = measurements.reduce((total, item) => {
    var itemTotal = item.symbol.size + SPACE + TRI + SPACE + item.percent.size + SPACE;
    return total + itemTotal;
  }, 0);

  console.log({totalSize})

  var canvas = new Canvas(totalSize, 20);
  var ctx = canvas.getContext('2d');
  ctx.font = font;

  var offset = 0;
  measurements.forEach(item => {
    ctx.fillText(item.symbol.value, offset, 15);

    offset += item.symbol.size + SPACE;

    ctx.fillText('^', offset, 15);

    offset += TRI + SPACE;

    ctx.fillText(item.percent.value.toFixed(2), offset, 15);

    offset += item.percent.size + SPACE;
    console.log('buliding at', offset)
  });

  return canvas;
}

export function createTextCanvas (text) {
  var canvas = new Canvas(measureText(text).width, 20);
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  ctx.fillText(text, 0, 15);
  return canvas;
}

export function createTickerImage (data, offset = 0) {
  //console.log({text})
  var canvas = new Canvas(200, 20);
  var ctx = canvas.getContext('2d');
  ctx.font = font;
  //var {width} = ctx.measureText(text);

  var img = new Canvas.Image();
  //img.src = createTextCanvas(text).toBuffer();
  img.src = createCanvasFromData(data).toBuffer();
  console.log('width', img.width)
  console.log('at offset', -offset)
  ctx.drawImage(img, -offset, 0, img.width, 20);

  return nativeImage.createFromBuffer(canvas.toBuffer(), {
    width: 200,
    height: 20,
    scaleFactor: 1.0
  });

}
