import React, { useState } from "react";
import ConstructionEntreprise from "../components/Interactive_monitoring/ConstructionEntreprise";
import PlacementCubes from "../components/Interactive_monitoring/PlacementCubes";
import Visualisation from "../components/Interactive_monitoring/Visualisation";

const Interactive_monitoring = () => {
  const [grid, setGrid] = useState(
    Array.from({ length: 10 }, () => Array(10).fill(null))
  );
  const [message, setMessage] = useState("");

  const resetGrid = () => {
    setGrid(Array.from({ length: 10 }, () => Array(10).fill(null)));
    setMessage("");
  };

  const saveGrid = () => {
    localStorage.setItem("savedGrid", JSON.stringify(grid));
    setMessage("Grille enregistrée avec succès !");
  };

  return (
    <div
      className="container mx-auto p-5"
      style={{ backgroundColor: "#FFF4EA" }}
    >
      <h1
        className="text-4xl font-extrabold text-center"
        style={{ color: "#C96868" }}
      >
        Supervision Interactive de l'Entreprise
      </h1>

      <section className="mb-8 border-b pb-5">
        <h2 className="text-3xl font-semibold" style={{ color: "#8EACCD" }}>
          Phase 1 : Construction de l'entreprise
        </h2>
        <ConstructionEntreprise grid={grid} setGrid={setGrid} />
      </section>

      <section className="mb-8 border-b pb-5">
        <h2 className="text-3xl font-semibold" style={{ color: "#8EACCD" }}>
          Phase 2 : Placement des boîtiers
        </h2>
        <PlacementCubes grid={grid} setGrid={setGrid} />
      </section>

      <section>
        <h2 className="text-3xl font-semibold" style={{ color: "#8EACCD" }}>
          Phase 3 : Visualisation en temps réel
        </h2>
        <Visualisation grid={grid} />
      </section>

      <div className="mt-6 text-center">
        <button
          onClick={resetGrid}
          className="px-6 py-2"
          style={{
            backgroundColor: "#C96868",
            color: "#FFF4EA",
            fontWeight: "600",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#C04D4D")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#C96868")
          }
        >
          Réinitialiser la grille
        </button>
        <button
          onClick={saveGrid}
          className="ml-4 px-6 py-2"
          style={{
            backgroundColor: "#8EACCD",
            color: "#FFF4EA",
            fontWeight: "600",
            borderRadius: "0.5rem",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#7A9EBB")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#8EACCD")
          }
        >
          Enregistrer la grille
        </button>
      </div>

      {message && (
        <div
          className="mt-4 text-center"
          style={{ color: "#C96868", fontWeight: "600" }}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default Interactive_monitoring;
