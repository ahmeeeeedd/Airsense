import React from "react";
import { Form, NavLink, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { SignUpValidationSchema } from "../api/auth/sign-up";
import { RenderError } from "../components/RenderError";
import { useAuth } from "../hooks";
import { OverlayLoader } from "../components/OverlayLoader";
import { toast } from "react-toastify";

const PasswordSignUp = () => {
  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validationSchema: SignUpValidationSchema,
    onSubmit: async (values, { resetForm }) => {
      await register(values.email, values.password, values.name);
      toast.success("Account created successfully!");
      navigate("/Sign-In");
      resetForm();
    },
  });

  return (
    <>
      {isLoading && <OverlayLoader />}
      <div className="relative bg-gradient-to-br from-[#F7EFE5] to-[#F3D1A5] min-h-screen flex items-center justify-center">
        <div className="relative z-10 container mx-auto my-32 max-w-md px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 p-8 rounded-3xl shadow-xl backdrop-blur-md">
            <h2 className="text-4xl font-bold text-[#3E3B6D] mb-8 text-center">
              Sign Up
            </h2>

            <Form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-[#3E3B6D]"
                  htmlFor="name"
                >
                  Nom et prénom
                </label>
                <input
                  name="name"
                  type="text"
                  className="block w-full rounded-xl border border-[#D3B4A9] bg-[#FFFDF9] p-4 text-sm text-[#3E3B6D] placeholder-opacity-70 focus:border-[#C96868] focus:ring-[#C96868] transition-transform shadow-lg"
                  placeholder="Adresse name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.touched.name && formik.errors.name && (
                  <RenderError message={formik.errors.name} />
                )}
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-semibold text-[#3E3B6D]"
                  htmlFor="email"
                >
                  Email address
                </label>
                <input
                  name="email"
                  type="text"
                  className="block w-full rounded-xl border border-[#D3B4A9] bg-[#FFFDF9] p-4 text-sm text-[#3E3B6D] placeholder-opacity-70 focus:border-[#C96868] focus:ring-[#C96868] transition-transform shadow-lg"
                  placeholder="Adresse email"
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
                  className="mb-2 block text-sm font-semibold text-[#3E3B6D]"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="block w-full rounded-xl border border-[#D3B4A9] bg-[#FFFDF9] p-4 text-sm text-[#3E3B6D] placeholder-opacity-70 focus:border-[#C96868] focus:ring-[#C96868] transition-transform shadow-lg"
                  placeholder="Mot de passe"
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
                className="w-full bg-[#C96868] text-white font-medium rounded-full py-3 mt-6 hover:bg-[#D68686] transition-transform transform hover:scale-105"
              >
                Sign Up
              </button>
            </Form>

            <p className="text-sm text-center text-[#3E3B6D] mt-6">
              Already have an account?{" "}
              <NavLink
                to="/Sign-In"
                className="font-medium text-[#C96868] hover:underline"
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
