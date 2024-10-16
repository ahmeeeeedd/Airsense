import React from "react";
import { useFormik } from "formik";
import { RenderError } from "../components/RenderError";
import { SignInValidationSchema } from "../api/auth/sign-in";
import { useAuth } from "../hooks";
import { NavLink } from "react-router-dom";
import { OverlayLoader } from "../components/OverlayLoader";

const PasswordSignIn = () => {
  const { login, isLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignInValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      login(values.email, values.password);
      resetForm();
    },
  });

  return (
    <>
      {isLoading && <OverlayLoader />}
      <div className="relative bg-gradient-to-br from-[#F7EFE5] to-[#F3D1A5] min-h-screen flex items-center justify-center">
        <div className="relative z-10 container mx-auto max-w-md px-4">
          <div className="bg-white/80 p-10 rounded-xl shadow-lg backdrop-blur-md">
            <h2 className="text-3xl font-bold text-[#3E3B6D] mb-6 text-center">
              Sign In
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-[#2D4D78]"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  name="email"
                  type="text"
                  className="block w-full rounded-lg border border-[#D3B4A9] bg-[#FFFDF9] p-3 text-sm text-[#2D4D78] placeholder-gray-400 focus:border-[#C96868] focus:ring-[#C96868] transition-all"
                  placeholder="Email address"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                  <RenderError message={formik.errors.email} />
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-[#2D4D78]"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="block w-full rounded-lg border border-[#D3B4A9] bg-[#FFFDF9] p-3 text-sm text-[#2D4D78] placeholder-gray-400 focus:border-[#C96868] focus:ring-[#C96868] transition-all"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password && (
                  <RenderError message={formik.errors.password} />
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#C96868] text-white font-medium rounded-full py-3 mt-4 hover:bg-[#D68686] transition-transform transform hover:scale-105"
              >
                Sign In
              </button>
            </form>

            <p className="text-sm text-center text-[#2D4D78] mt-6">
              Don't have an account?{" "}
              <NavLink
                to="/Sign-Up"
                className="font-medium text-[#C96868] hover:underline"
              >
                Register
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { PasswordSignIn };
