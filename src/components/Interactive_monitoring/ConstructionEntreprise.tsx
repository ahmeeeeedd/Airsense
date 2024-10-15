import React, { useState, useEffect } from "react";
import { database, ref, set, get } from "../../Pages/Firebase";

const ConstructionEntreprise = ({ grid, setGrid }) => {
  const [currentObject, setCurrentObject] = useState("wall");
  const [labelText, setLabelText] = useState("");

  const saveGridToFirebase = async (gridData) => {
    try {
      await set(ref(database, "your-grid-path"), gridData);
      console.log("Grid saved successfully.");
    } catch (error) {
      console.error("Error saving grid: ", error);
    }
  };

  const loadGridFromFirebase = async () => {
    try {
      const snapshot = await get(ref(database, "your-grid-path"));
      if (snapshot.exists()) {
        setGrid(snapshot.val());
      } else {
        console.log("No data available");
      }
    } catch (error) {
      console.error("Error loading grid: ", error);
    }
  };

  // Load grid when component mounts
  useEffect(() => {
    loadGridFromFirebase();
  }, []);

  const handleAddObject = (x, y) => {
    const newGrid = [...grid];
    if (currentObject === "wall") {
      newGrid[x][y] = "wall";
    } else if (currentObject === "desk") {
      newGrid[x][y] = "desk";
    } else if (currentObject === "door") {
      newGrid[x][y] = "door";
    } else if (currentObject === "label" && labelText) {
      newGrid[x][y] = labelText;
      setLabelText("");
    }
    setGrid(newGrid);
    saveGridToFirebase(newGrid);
  };

  const handleRemoveObject = (x, y) => {
    const newGrid = [...grid];
    newGrid[x][y] = null;
    setGrid(newGrid);
    saveGridToFirebase(newGrid);
  };

  return (
    <div>
      <div className="flex mb-4">
        <select
          value={currentObject}
          onChange={(e) => setCurrentObject(e.target.value)}
          className="mr-2 p-2 border rounded shadow"
        >
          <option value="wall">Mur</option>
          <option value="desk">Bureau</option>
          <option value="door">Porte</option>
          <option value="label">Étiquette</option>
        </select>

        {currentObject === "label" && (
          <input
            type="text"
            placeholder="Nommer l'espace"
            value={labelText}
            onChange={(e) => setLabelText(e.target.value)}
            className="p-2 border rounded shadow"
          />
        )}
      </div>

      <div className="grid grid-cols-10 gap-1">
        {grid.map((row, rowIndex) =>
          row.map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`w-10 h-10 border transition duration-200 ease-in-out flex justify-center items-center cursor-pointer ${
                cell === "wall"
                  ? "bg-gray-600"
                  : cell === "desk"
                  ? "bg-blue-400"
                  : cell === "door"
                  ? "bg-green-400"
                  : currentObject === "label" && !cell
                  ? "bg-yellow-200"
                  : "bg-gray-200"
              } ${!cell ? "hover:bg-gray-300" : ""}`}
              onClick={() =>
                cell
                  ? handleRemoveObject(rowIndex, cellIndex)
                  : handleAddObject(rowIndex, cellIndex)
              }
              aria-label={cell ? `${cell}` : `Ajouter un ${currentObject}`}
            >
              {cell === "wall"
                ? "🧱"
                : cell === "desk"
                ? "🪑"
                : cell === "door"
                ? "🚪"
                : typeof cell === "string"
                ? cell
                : ""}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ConstructionEntreprise;
