import React, { useEffect, useState } from "react";

const Visualisation = ({ grid }) => {
  const [cubeStates, setCubeStates] = useState([]);

  useEffect(() => {
    const updatedCubeStates = grid.map((row) =>
      row.map((cell) => {
        if (cell === "cube") {
          const randomSensorValue = Math.random();
          if (randomSensorValue < 0.3) return "green";
          else if (randomSensorValue < 0.7) return "yellow";
          else return "red";
        }
        return null;
      })
    );
    setCubeStates(updatedCubeStates);
  }, [grid]);

  return (
    <div className="grid grid-cols-10 gap-1">
      {cubeStates.map((row, rowIndex) =>
        row.map((state, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            className={`w-10 h-10 border transition duration-200 ease-in-out flex justify-center items-center ${
              state === "green"
                ? "bg-green-500"
                : state === "yellow"
                ? "bg-yellow-400"
                : state === "red"
                ? "bg-red-500"
                : "bg-gray-200"
            }`}
          >
            {grid[rowIndex][cellIndex] === "cube" && state === "green"
              ? "✅"
              : grid[rowIndex][cellIndex] === "cube" && state === "yellow"
              ? "⚠️"
              : grid[rowIndex][cellIndex] === "cube" && state === "red"
              ? "🔥"
              : ""}
          </div>
        ))
      )}
    </div>
  );
};

export default Visualisation;
