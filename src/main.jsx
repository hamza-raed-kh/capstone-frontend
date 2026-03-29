import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import "./index.css";

/**
 * The main entry point for the React application.
 * This file is responsible for rendering the root component of the application,
 * which is the `App` component. It also wraps the `App` component with the
 * Redux `Provider` to make the Redux store available to all components in the
 * application.
 *
 * @version 1.0.0
 * @since 2024-07-26
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
