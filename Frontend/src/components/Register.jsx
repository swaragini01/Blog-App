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
  divider,
  loadingClass,
  pageWrapper,
  linkClass,
} from "../styles/common";
import { NavLink, useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { role: "user" } });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const onUserRegister = async (newUser) => {
    setLoading(true);
    setError(null);

    try {
      const { role, ...userObj } = newUser;
      const endpoint = role === "author" ? "author-api" : "user-api";
      const resObj = await axios.post(`http://localhost:4000/${endpoint}/users`, userObj);

      if (resObj.status === 201) {
        navigate("/login");
      }
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p className={loadingClass}>Creating account...</p>;
  }

  return (
    <div className={pageWrapper}>
      <div className={formCard}>
        <h2 className={formTitle}>Create an Account</h2>
        {error && <p className={errorClass}>{error}</p>}

        <form onSubmit={handleSubmit(onUserRegister)}>
          <div className="mb-5">
            <p className={labelClass}>Register as</p>
            <div className="mt-1 flex gap-6">
              <label className="flex cursor-pointer items-center gap-2">
                <input type="radio" {...register("role")} value="user" className="h-4 w-4 accent-[#0f6b68]" />
                <span className="text-sm font-medium text-[#354056]">User</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <input type="radio" {...register("role")} value="author" className="h-4 w-4 accent-[#0f6b68]" />
                <span className="text-sm font-medium text-[#354056]">Author</span>
              </label>
            </div>
          </div>

          <div className={divider} />

          <div className="mb-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>First Name</label>
              <input
                type="text"
                {...register("firstName", { required: "First name is required" })}
                placeholder="First name"
                className={inputClass}
              />
              {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
            </div>
            <div>
              <label className={labelClass}>Last Name</label>
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                placeholder="Last name"
                className={inputClass}
              />
              {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
            </div>
          </div>

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
              {...register("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters" },
              })}
              placeholder="Min. 8 characters"
              className={inputClass}
            />
            {errors.password && <p className={errorClass}>{errors.password.message}</p>}
          </div>

          <div className={formGroup}>
            <label className={labelClass}>Profile Image URL</label>
            <input
              type="text"
              {...register("profileImageUrl")}
              placeholder="https://example.com/avatar.png"
              className={inputClass}
            />
          </div>

          <button type="submit" className={submitBtn}>
            Create Account
          </button>
        </form>

        <p className={`${mutedText} mt-5 text-center`}>
          Already have an account?{" "}
          <NavLink to="/login" className={linkClass}>
            Sign in
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Register;
