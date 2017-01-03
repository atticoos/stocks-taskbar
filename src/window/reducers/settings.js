import * as Types from '../actions/types';

const initialState = {
  tickerWidth: 300
};

export default function settingsReducer (state = initialState, action = {}) {
  switch (action.type) {
    case Types.TICKER_WIDTH:
      return {
        ...state,
        tickerWidth: action.width
      };
    default:
      return state;
  }
}
