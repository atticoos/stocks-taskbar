import * as ActionTypes from '../../window/actions/types';

const setWidth = (width) => state => width;

function createIntents (inputSource) {
  const setWidthAction = inputSource
    .filter(action => action.type === ActionTypes.TICKER_WIDTH)
    .map(action => action.width);

  const setTickerHeight = inputSource
    .filter(action => action.type === ActionTypes.TICKER_HEIGHT)
    .map(action => action.width);
  return {setWidthAction, setTickerHeight};
}

export default function createTickerSettingsReducers (actionInputSource) {
  const intents = createIntents(actionInputSource);
  return [
    intents.setWidthAction.map(setWidth)
  ];
}
