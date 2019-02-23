"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureStore;

var _redux = require("redux");

var _reduxObservable = require("redux-observable");

var _reduxDevtoolsExtension = require("redux-devtools-extension");

var _actions = require("./actions");

function configureStore(initialState) {
  var epicMiddleware = (0, _reduxObservable.createEpicMiddleware)();
  var store = (0, _redux.createStore)(_actions.rootReducer, initialState, (0, _reduxDevtoolsExtension.composeWithDevTools)((0, _redux.applyMiddleware)(epicMiddleware)));
  epicMiddleware.run(_actions.rootEpic);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./actions', function () {
      return store.replaceReducer(require('./actions').rootReducer);
    });
  }

  return store;
}