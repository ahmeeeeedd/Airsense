import React from "react";

const RenderError = ({ message }) => (
  <p className="mt-1 text-sm text-red-600" role="alert">
    {message}
  </p>
);

export { RenderError };
