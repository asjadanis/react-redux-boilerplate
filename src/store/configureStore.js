import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from "redux-logger";
import { createHashHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "../reducers";

export const history = createHashHistory({ basename: "react-redux-boilerplate" });

export default function configureStore(initialState = {}) {
  const middlewares = [thunk, routerMiddleware(history)];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
    return createStore(
      rootReducer(history),
      initialState,
      composeWithDevTools(applyMiddleware(...middlewares))
    );
  } else {
    return createStore(rootReducer(history), initialState, applyMiddleware(...middlewares));
  }
}
