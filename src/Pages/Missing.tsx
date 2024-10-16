import React from "react";
import { NavLink } from "react-router-dom";

const Missing = () => {
  return (
    <div className="mt-5 lg:container">
      <section className="md:grid md:grid-cols-2 gap-6 px-5">
        {" "}
        <div className="my-auto">
          <h1 className="text-3xl font-bold text-blue-500 mb-4">Oups!</h1>
          <p>La page que vous cherchez n'existe pas.</p>
          <NavLink
            to="/"
            className="text-center mt-10 cursor-pointer bg-roseType2 text-red py-1 px-5 rounded-md inline-block"
          >
            Vers la page d'accueil
          </NavLink>
        </div>
      </section>
    </div>
  );
};

export { Missing };
