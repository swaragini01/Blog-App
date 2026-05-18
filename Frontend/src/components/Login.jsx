import { useForm } from "react-hook-form";
import {
  formCard,
  formTitle,
  formGroup,
  labelClass,
  inputClass,
  submitBtn,
  errorClass,
  mutedText,
  linkClass,
  pageWrapper,
} from "../styles/common";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../stores/authStore";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const login = useAuth((state) => state.login);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const currentUser = useAuth((state) => state.currentUser);
  const error = useAuth((state) => state.error);
  const loading = useAuth((state) => state.loading);
  const navigate = useNavigate();

  const onUserLogin = async (userCredObj) => {
    await login(userCredObj);
  };

  useEffect(() => {
    if (isAuthenticated && currentUser) {
      toast.success("Logged in successfully");
      navigate("/profile");
    }
  }, [isAuthenticated, currentUser, navigate]);

  return (
    <div className={pageWrapper}>
      <div className={formCard}>
        <h2 className={formTitle}>Sign In</h2>

        {error && <p className={errorClass}>{error}</p>}
        <form onSubmit={handleSubmit(onUserLogin)}>
          <div className={formGroup}>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              placeholder="you@example.com"
              className={inputClass}
            />
            {errors.email && <p className={errorClass}>{errors.email.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Password</label>
            <input
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Enter your password"
              className={inputClass}
            />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          <button type="submit" className={submitBtn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={`${mutedText} mt-5 text-center`}>
          Don't have an account?{" "}
          <NavLink to="/register" className={linkClass}>
            Create one
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
