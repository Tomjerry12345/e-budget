import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import RootRedux from "../redux/RootRedux";

const ReduxConfig = () => {
  const middlewares = [thunk];
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(RootRedux(), enhancers);

  return store;
};

export default ReduxConfig;
