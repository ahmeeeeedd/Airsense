import React from "react";

const PlacementCubes = ({ grid, setGrid }) => {
  const handleAddCube = (x, y) => {
    const newGrid = [...grid];
    if (!newGrid[x][y]) newGrid[x][y] = "cube";
    setGrid(newGrid);
  };

  const handleRemoveCube = (x, y) => {
    const newGrid = [...grid];
    if (newGrid[x][y] === "cube") newGrid[x][y] = null;
    setGrid(newGrid);
  };

  return (
    <div className="grid grid-cols-10 gap-1">
      {grid.map((row, rowIndex) =>
        row.map((cell, cellIndex) => (
          <div
            key={`${rowIndex}-${cellIndex}`}
            className={`w-10 h-10 border transition duration-200 ease-in-out flex justify-center items-center cursor-pointer ${
              cell === "cube" ? "bg-blue-300" : "bg-gray-200"
            }`}
            onClick={() =>
              cell === "cube"
                ? handleRemoveCube(rowIndex, cellIndex)
                : handleAddCube(rowIndex, cellIndex)
            }
          >
            {cell === "cube" ? "📦" : ""}
          </div>
        ))
      )}
    </div>
  );
};

export default PlacementCubes;
