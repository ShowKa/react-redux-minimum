import { applyMiddleware, createStore } from "redux";
import axios from "axios";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";

const initialState = {
  fetching: false,
  fetched: false,
  users: [],
  error: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_USERS_START":
      return { ...state, fetching: true };
    case "FETCH_USERS_ERROR":
      return { ...state, fetching: false, error: action.payload };
    case "RECEIVE_USERS":
      return {
        ...state,
        fetching: false,
        fetched: true,
        users: action.payload
      };
  }
  return state;
};

const middleware = applyMiddleware(thunk, createLogger());
const store = createStore(reducer, middleware);

store.dispatch((dispatch) => {
  dispatch({ type: "FETCH_USERS_START" });
  axios.get("http://localhost:18080").then((response) => {
    dispatch({ type: "RECEIVE_USERS", payload: response.data });
  }).catch((err) => {
    dispatch({ type: "FETCH_USERS_ERROR", payload: err });
  });
});

// start Dummy Server By Node.js
/*
node << EOF
var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
  setTimeout(() => res.end('{age: 30, id: 0, name: "foo", age: 25, id: 1, name: "bar"}'), 1000);
}).listen(18080);
EOF
*/
