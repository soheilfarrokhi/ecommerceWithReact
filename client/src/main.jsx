import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
// import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state/store.js";
import { HomeProvider } from "./context/HomeProvider.jsx";

const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
});

import { theme } from "./theme.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <HomeProvider>
        <App />
      </HomeProvider>
    </Provider>
  </ThemeProvider>
  // </React.StrictMode>,
);
