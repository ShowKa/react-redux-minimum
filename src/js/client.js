import { createStore } from "redux";

const reducer = (state = 0, action) => {
  switch(action.type) {
    case "INC":
      return state + action.payload;
      case "DEC":
        return state - action.payload;
  }
  return state;
}

const store = createStore(reducer, 1);

store.subscribe(() => {
  console.log("store changed", store.getState());
});

store.dispatch({type: "INC", payload: 1});
store.dispatch({type: "INC", payload: 100});
store.dispatch({type: "DEC", payload: 50});
