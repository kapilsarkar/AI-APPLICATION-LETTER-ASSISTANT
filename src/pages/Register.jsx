import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { registerSchema } from "../validation/authSchema.js";
import { supabase } from "../services/supabaseClient.js";

const Register = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

 const onValidSubmit = async (data) => {
  setAuthError("");
  setLoading(true);

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        full_name: data.fullName,
      },
    },
  });

  setLoading(false);

  if (error) {
    setAuthError(error.message);
    return;
  }

  // Handle case where user already exists but Supabase suppresses the error
  if (authData?.user?.identities?.length === 0) {
    setAuthError("An account with this email already exists. Please log in instead.");
    return;
  }

  // Verification link sent
  if (authData?.user && !authData?.session) {
    setRegisteredEmail(data.email);
    setShowSuccessModal(true);
    reset();
    return;
  }

  // Auto-confirmed or confirmations disabled
  if (authData?.session) {
    navigate("/create");
  }
};

  const handleModalProceed = () => {
    setShowSuccessModal(false);
    navigate("/login");
  };

  return (
    <div className="relative mx-auto my-12 max-w-md rounded-lg border border-gray-300 p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">Register</h2>

      {/* Error alert banner */}
      {authError && (
        <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-xs font-semibold text-red-600">
          {authError}
        </div>
      )}

      <form
        onSubmit={handleSubmit(onValidSubmit)}
        noValidate
        className="flex flex-col gap-4"
      >
        {/* Full Name */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            {...register("fullName")}
            className={`rounded border p-2 text-sm outline-none ${
              errors.fullName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fullName && (
            <p className="text-xs text-red-600">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={`rounded border p-2 text-sm outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-xs text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("password")}
            className={`rounded border p-2 text-sm outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-xs text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            {...register("confirmPassword")}
            className={`rounded border p-2 text-sm outline-none ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded bg-emerald-600 py-2 font-medium text-white hover:bg-emerald-700 disabled:opacity-60 transition"
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-4 text-center text-xs text-gray-600">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold text-emerald-600 hover:underline"
        >
          Log in
        </Link>
      </p>

      {/* POPUP CONFIRMATION MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl text-center">
            {/* Success Icon */}
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 font-bold text-xl">
              ✉
            </div>

            <h3 className="text-lg font-extrabold text-slate-950">
              Verify Your Email
            </h3>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              We sent a verification link to:
              <br />
              <span className="font-semibold text-slate-800">
                {registeredEmail}
              </span>
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Please click the link inside your email to activate your account.
              Check your spam folder if you do not see it within a few minutes.
            </p>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={handleModalProceed}
                className="w-full rounded-xl bg-emerald-700 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-emerald-800 transition"
              >
                Go to Login →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
