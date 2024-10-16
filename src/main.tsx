import React, { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./index.css";
import { App } from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <StrictMode>
  <>
    <App />
    <ToastContainer position="bottom-right" />
  </>
  // {/* </StrictMode> */}
);
