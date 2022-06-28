import { combineReducers, applyMiddleware, createStore, compose } from "redux";

import thunk from "redux-thunk";
import authReducer from "./auth/reducers";
import categoriesReducer from "./categories/reducers";
import notifReducer from "./notif/reducers";
import speakerReducer from "./speakers/reducers";
import eventsReducer from "./events/reducers";
import listsReducer from "./lists/reducers";
import transactionsReducer from "./transactions/reducers";

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducers = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  notif: notifReducer,
  speakers: speakerReducer,
  events: eventsReducer,
  lists: listsReducer,
  transactions: transactionsReducer,
});

const store = createStore(
  rootReducers,
  composerEnhancer(applyMiddleware(thunk))
);

export default store;
