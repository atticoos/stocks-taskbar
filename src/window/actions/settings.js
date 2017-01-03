import * as Types from './types';

export function setTickerWidth (width) {
  return {
    type: Types.TICKER_WIDTH,
    width: parseInt(width)
  };
}
