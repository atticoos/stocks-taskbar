import * as ActionTypes from '../../window/actions/types';

/**
 * Reducer logic
 */
const Operations = {
  addQuote: newQuote => quotes => quotes.concat(newQuote),
  removeQuote: oldQuote => quotes => quotes.filter(quote => quote !== oldQuote)
};

/**
 * Create bindings to incoming actions
 */
function createIntents (inputSource) {
  const added = inputSource
    .filter(action => action.type === ActionTypes.ADD_STOCK_SYMBOL)
    .map(action => action.symbol);

  const removed = inputSource
    .filter(action => action.type === ActionTypes.REMOVE_STOCK_SYMBOL)
    .map(action => action.symbol);

  return {added, removed};
}

/**
 * Create reducers
 */
function createReducers (intents) {
  return [
    intents.added.map(quote => Operations.addQuote(quote)),
    intents.removed.map(quote => Operations.removeQuote(quote))
  ];
}

export default function createQuoteReducers (actionInputSource) {
  return createReducers(createIntents(actionInputSource));
}
