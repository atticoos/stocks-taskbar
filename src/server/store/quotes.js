import * as ActionTypes from '../../window/actions/types';

const addQuote = newQuote => quotes => quotes.concat(newQuote);
const removeQuote = oldQuote => quotes => quotes.filter(quote => quote !== oldQuote);

function createIntents (inputSource) {
  const added = inputSource
    .filter(action => action.type === ActionTypes.ADD_STOCK_SYMBOL)
    .map(action => action.symbol);

  const removed = inputSource
    .filter(action => action.type === ActionTypes.REMOVE_STOCK_SYMBOL)
    .map(action => action.symbol);

  return {added, removed};
}

function createReducers (intents) {
  return [
    intents.added.map(addQuote),
    intents.removed.map(removeQuote)
  ];
}

export default function createQuoteReducers (actionInputSource) {
  return createReducers(createIntents(actionInputSource));
}
