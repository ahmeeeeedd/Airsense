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
      <div className="relative bg-gradient-to-r from-[#4F5D75] to-[#2D4D78] min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('/path-to-your-background-image.jpg')] bg-cover bg-center"></div>
        <div className="relative z-10 container mx-auto my-32 max-w-md px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-200 backdrop-blur-md bg-opacity-70">
            <h2 className="text-4xl font-extrabold text-[#3E3B6D] mb-8 text-center">
              Sign In
            </h2>

            <form onSubmit={formik.handleSubmit} className="space-y-8">
              <div className="space-y-6">
                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-[#3E3B6D]"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <input
                      name="email"
                      type="text"
                      className="block w-full rounded-xl border border-[#D3B4A9] bg-[#F7F7F7] p-4 text-sm text-[#3E3B6D] placeholder-opacity-70 focus:border-[#D4A5A5] focus:ring-[#D4A5A5] shadow-lg transition-transform transform hover:scale-105"
                      placeholder="Email address"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email && (
                      <RenderError message={formik.errors.email} />
                    )}
                  </div>
                </div>

                <div>
                  <label
                    className="mb-2 block text-sm font-semibold text-[#3E3B6D]"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      type="password"
                      className="block w-full rounded-xl border border-[#D3B4A9] bg-[#F7F7F7] p-4 text-sm text-[#3E3B6D] placeholder-opacity-70 focus:border-[#D4A5A5] focus:ring-[#D4A5A5] shadow-lg transition-transform transform hover:scale-105"
                      placeholder="Password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password && (
                      <RenderError message={formik.errors.password} />
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="w-full text-white bg-gradient-to-r from-[#4A4E69] via-[#9A8C99] to-[#C9ADA7] hover:from-[#3E3B6D] hover:to-[#D4A5A5] focus:ring-4 focus:outline-none focus:ring-[#4A4E69] font-medium rounded-full text-sm px-6 py-4 text-center transition-transform transform hover:scale-105"
                >
                  Sign In
                </button>
              </div>
            </form>

            <p className="text-sm font-light text-[#3E3B6D] mt-8 text-center">
              Don't have an account?{" "}
              <NavLink
                to="/Sign-Up"
                className="font-medium text-[#D4A5A5] hover:underline"
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
