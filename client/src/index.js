import React from "react";
import ReactDOM from "react-dom";
import { AuthStateProvider } from "./context/auth/authState";
import { EntryStateProvider } from "./context/entry/entryState";
import App from "./App";

ReactDOM.render(
  <EntryStateProvider>
    <AuthStateProvider>
      <App />
    </AuthStateProvider>
  </EntryStateProvider>,
  document.getElementById("root")
);
