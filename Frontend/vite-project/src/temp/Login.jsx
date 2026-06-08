import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom";

import { loginUser } from "../redux/authSlice";

const loginSchema = z.object({
  emailId: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(8, "Password is too weak"),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    isAuthenticated,
    loading,
    error,
  } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

    useEffect(() => {
      if (!isAuthenticated) return;
      const redirectPath =
        localStorage.getItem("redirectAfterLogin");
      if (redirectPath) {
        localStorage.removeItem(
          "redirectAfterLogin"
        );
        navigate(redirectPath);
      } else {
        navigate("/join");
      }
    }, [isAuthenticated, navigate]);

  async function onSubmit(data) {
    await dispatch(loginUser(data));
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-300 p-4">

      <div className="card w-96 bg-base-200 shadow-xl">

        <div className="card-body">

          {/* TITLE */}

          <h2 className="card-title justify-center text-3xl mb-6 text-cyan-400">
            CodeTogether
          </h2>

          {/* SERVER ERROR */}
          {error && (
            <p className="text-error text-center mb-3">
              {"Server Error Plz Try Again"}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
          >

            {/* EMAIL */}

            <div className="form-control">

              <label className="label">
                <span className="label-text">
                  Email
                </span>
              </label>

              <input
                type="email"
                placeholder="john@example.com"
                className={`input input-bordered w-full ${
                  errors.emailId
                    ? "input-error"
                    : ""
                }`}
                {...register("emailId")}
              />

              {errors.emailId && (
                <p className="text-error text-sm mt-1">
                  {errors.emailId.message}
                </p>
              )}

            </div>

            {/* PASSWORD */}

            <div className="form-control mt-4">

              <label className="label">
                <span className="label-text">
                  Password
                </span>
              </label>

              <div className="relative">

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="••••••••"
                  className={`input input-bordered w-full pr-10 ${
                    errors.password
                      ? "input-error"
                      : ""
                  }`}
                  {...register("password")}
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

               <div className="text-right mt-2">
                  <NavLink
                    to="/forgot-password"
                    className="link link-primary text-sm"
                  >
                    Forgot Password?
                  </NavLink>
              </div>

            </div>

            {/* LOGIN BUTTON */}

            <div className="form-control mt-8">

              <button
                type="submit"
                disabled={loading}
                className="btn btn-info text-black"
              >
                {loading
                  ? "Logging In..."
                  : "Login"}
              </button>

            </div>

          </form>

          {/* SIGNUP LINK */}

          <div className="text-center mt-6">

            <span className="text-sm">
              Don't have an account?{" "}
            </span>

            <NavLink
              to="/signup"
              className="link link-info"
            >
              Sign Up
            </NavLink>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;