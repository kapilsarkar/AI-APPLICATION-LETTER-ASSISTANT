import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loginSchema } from "../validation/authSchema.js";
import { supabase } from "../services/supabaseClient.js";

const Login = () => {
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [authenticatedUser, setAuthenticatedUser] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onValidSubmit = async (data) => {
    setAuthError("");
    setLoading(true);

    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes("email not confirmed")) {
        setAuthError(
          "Your email address has not been confirmed yet. Please check your inbox and click the verification link."
        );
      } else {
        setAuthError(error.message);
      }
      return;
    }

    setAuthenticatedUser(authData?.user);
    setShowSuccessModal(true);
  };

  // Always route directly to dashboard on continue
  const handleModalProceed = () => {
    setShowSuccessModal(false);
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="min-h-[85vh] bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Sign In
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          Welcome back! Access your letters and saved applications.
        </p>

        {authError && (
          <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3.5 text-xs font-semibold leading-5 text-rose-700">
            {authError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onValidSubmit)}
          noValidate
          className="mt-6 flex flex-col gap-4"
        >
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className={`rounded-xl border p-2.5 text-sm outline-none transition focus:ring-4 ${
                errors.email
                  ? "border-rose-500 focus:border-rose-600 focus:ring-rose-100"
                  : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-100"
              }`}
            />
            {errors.email && (
              <p className="text-xs font-medium text-rose-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`rounded-xl border p-2.5 text-sm outline-none transition focus:ring-4 ${
                errors.password
                  ? "border-rose-500 focus:border-rose-600 focus:ring-rose-100"
                  : "border-slate-300 focus:border-emerald-600 focus:ring-emerald-100"
              }`}
            />
            {errors.password && (
              <p className="text-xs font-medium text-rose-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex items-center justify-center rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-600">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="font-bold text-emerald-700 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div
          onClick={handleModalProceed}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-2xl sm:p-8"
          >
            <div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full bg-emerald-100 text-xl font-bold text-emerald-700">
              ✓
            </div>

            <h2 className="text-xl font-extrabold text-slate-900">
              Login Successful!
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Welcome back,{" "}
              <strong className="text-slate-900">
                {authenticatedUser?.user_metadata?.full_name ||
                  authenticatedUser?.email?.split("@")[0] ||
                  "User"}
              </strong>
              !
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Signed in as{" "}
              <span className="font-medium text-slate-700">
                {authenticatedUser?.email}
              </span>
            </p>

            <button
              type="button"
              onClick={handleModalProceed}
              className="mt-6 w-full rounded-xl bg-emerald-700 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              Continue to Dashboard →
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Login;