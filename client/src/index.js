import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import { AuthStateProvider } from "./context/auth/authState";
import { EntryStateProvider } from "./context/entry/entryState";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <EntryStateProvider>
      <AuthStateProvider>
        <App />
      </AuthStateProvider>
    </EntryStateProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
