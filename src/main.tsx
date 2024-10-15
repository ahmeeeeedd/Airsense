import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // Assurez-vous que le chemin est correct
import "./index.css"; // Si vous avez un fichier CSS global

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
