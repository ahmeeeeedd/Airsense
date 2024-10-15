import React from "react";
import { Form, NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "../api/auth/sign-up";
import { RenderError } from "../components/RenderError";
import { useAuth } from "../hooks";
import { OverlayLoader } from "../components/OverlayLoader";

const PasswordSignUp = () => {
  const { register, isLoading } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      register(values.email, values.password);
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
              Sign Up
            </h2>

            <Form onSubmit={formik.handleSubmit} className="space-y-8">
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
                      placeholder="Adresse email"
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
                      placeholder="Mot de passe"
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
                  Sign Up
                </button>
              </div>
            </Form>

            <p className="text-sm font-light text-[#3E3B6D] mt-8 text-center">
              Already have an account?{" "}
              <NavLink
                to="/Sign-In"
                className="font-medium text-[#D4A5A5] hover:underline"
              >
                Login here
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export { PasswordSignUp };
