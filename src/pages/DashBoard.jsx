import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../services/supabaseClient.js";
import { useAuth } from "../hooks/useAuth.js";
import {
  getApplications,
  updateApplication,
  deleteApplication,
} from "../services/applicationService.js";

const Dashboard = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(() => Boolean(user));
  const [error, setError] = useState("");

  // Modal state for Renaming application
  const [renameModalApp, setRenameModalApp] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  // Modal state for Deleting application
  const [deleteModalApp, setDeleteModalApp] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Open Rename Modal
  const openRenameModal = (application) => {
    setRenameModalApp(application);
    setNewTitle(application.title || "");
  };

  // Close Rename Modal
  const closeRenameModal = () => {
    setRenameModalApp(null);
    setNewTitle("");
    setIsRenaming(false);
  };

  // Submit renamed title
  const handleSaveRename = async (e) => {
    e.preventDefault();
    if (!renameModalApp) return;

    const trimmed = newTitle.trim();
    if (!trimmed || trimmed === renameModalApp.title) {
      closeRenameModal();
      return;
    }

    setIsRenaming(true);
    try {
      const updated = await updateApplication(renameModalApp.id, {
        title: trimmed,
      });

      setApplications((current) =>
        current.map((app) => (app.id === updated.id ? updated : app))
      );
      closeRenameModal();
    } catch (err) {
      console.error("Error updating application title:", err);
      alert("Failed to update application title.");
      setIsRenaming(false);
    }
  };

  // Open Delete Modal
  const openDeleteModal = (application) => {
    setDeleteModalApp(application);
  };

  // Close Delete Modal
  const closeDeleteModal = () => {
    setDeleteModalApp(null);
    setIsDeleting(false);
  };

  // Confirm and delete
  const handleConfirmDelete = async () => {
    if (!deleteModalApp) return;

    setIsDeleting(true);
    try {
      await deleteApplication(deleteModalApp.id);
      setApplications((current) =>
        current.filter((app) => app.id !== deleteModalApp.id)
      );
      closeDeleteModal();
    } catch (err) {
      console.error("Error deleting application:", err);
      alert("Failed to delete application.");
      setIsDeleting(false);
    }
  };

  const loadDashboardData = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      const [profileRes, appsData] = await Promise.all([
        supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle(),
        getApplications(user.id),
      ]);

      if (profileRes.error) {
        console.error("Profile fetch error:", profileRes.error.message);
      } else {
        setProfile(profileRes.data);
      }

      setApplications(appsData || []);
    } catch (err) {
      console.error("Dashboard loading error:", err);
      setError("Failed to load your dashboard data.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    if (!user) return;

    const execute = async () => {
      try {
        const [profileRes, appsData] = await Promise.all([
          supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle(),
          getApplications(user.id),
        ]);

        if (!isMounted) return;

        if (profileRes.error) {
          console.error("Profile fetch error:", profileRes.error.message);
        } else {
          setProfile(profileRes.data);
        }

        setApplications(appsData || []);
      } catch (err) {
        if (!isMounted) return;
        console.error("Dashboard loading error:", err);
        setError("Failed to load your dashboard data.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    execute();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const displayName =
    profile?.name ||
    profile?.full_name ||
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    "there";

  const email = profile?.email || user?.email || "Not provided";
  const phone = profile?.phone?.trim() || "Not provided";

  if (loading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-emerald-100 border-t-emerald-600" />
          <p className="text-sm font-medium text-slate-600">
            Loading your dashboard...
          </p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-2xl border border-rose-100 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-rose-50 text-lg font-bold text-rose-600">
            !
          </div>
          <h1 className="text-lg font-semibold text-slate-900">
            We couldn&apos;t load your dashboard
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">{error}</p>
          <button
            type="button"
            onClick={loadDashboardData}
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-slate-800"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Welcome Header */}
        <section className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-700">
                AI WriteAssist
              </p>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Welcome, {displayName} 👋
              </h1>
              <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                Create professional applications and letters with ease.
              </p>
            </div>

            <Link
              to="/create"
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
            >
              Create New Application →
            </Link>
          </div>
        </section>

        {/* Quick Start & Profile Grid */}
        <div className="mt-6 grid gap-6 lg:grid-cols-3">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-emerald-700">
                  Quick start
                </p>
                <h2 className="mt-2 text-xl font-bold text-slate-900">
                  Create the document you need
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">
                  Draft polished applications, formal letters, requests, and
                  complaints with guided assistance.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    "Applications",
                    "Formal letters",
                    "Requests",
                    "Complaints",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-center text-sm font-medium text-slate-700"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <Link
                to="/create"
                className="mt-6 inline-flex w-fit items-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-800"
              >
                Start creating →
              </Link>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-emerald-700">
              Profile summary
            </p>
            <h2 className="mt-2 text-xl font-bold text-slate-900">
              Your details
            </h2>

            <dl className="mt-5 space-y-4">
              <div className="border-b border-slate-100 pb-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Name
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-800">
                  {displayName}
                </dd>
              </div>

              <div className="border-b border-slate-100 pb-4">
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Email
                </dt>
                <dd className="mt-1 break-all text-sm font-medium text-slate-800">
                  {email}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Phone
                </dt>
                <dd className="mt-1 text-sm font-medium text-slate-800">
                  {phone}
                </dd>
              </div>
            </dl>
          </aside>
        </div>

        {/* Saved Applications Section */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                My Applications
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Keep track of your saved documents in one place.
              </p>
            </div>
            {applications.length > 0 && (
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                {applications.length} Saved
              </span>
            )}
          </div>

          {applications.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 px-6 py-12 text-center">
              <h3 className="text-base font-semibold text-slate-900">
                No applications yet
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Your saved applications and letters will appear here once generated.
              </p>
              <Link
                to="/create"
                className="mt-5 inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
              >
                Create Your First Application →
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {applications.map((app) => (
                <div
                  key={app.id}
                  className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow"
                >
                  <div>
                    <span className="inline-flex rounded-md bg-emerald-100 px-2 py-0.5 text-[11px] font-bold text-emerald-800">
                      {app.category || "General"}
                    </span>
                    <h3 className="mt-3 font-bold text-slate-900 line-clamp-1">
                      {app.title || "Untitled Application"}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {app.document_type || "Standard Letter"}
                    </p>
                  </div>

                  <div>
                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 text-[11px] font-medium text-slate-500">
                      <span>
                        {app.language || "English"} · {app.tone || "Formal"}
                      </span>
                      {app.created_at && (
                        <span>
                          {new Date(app.created_at).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                          })}
                        </span>
                      )}
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-slate-100 pt-3">
                      <Link
                        to={`/edit/${app.id}`}
                        className="rounded-lg bg-emerald-50 py-1.5 text-center text-xs font-bold text-emerald-700 hover:bg-emerald-100 transition"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => openRenameModal(app)}
                        className="rounded-lg border border-slate-200 bg-slate-50 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition"
                      >
                        Rename
                      </button>
                      <button
                        type="button"
                        onClick={() => openDeleteModal(app)}
                        className="rounded-lg border border-rose-100 bg-rose-50/50 py-1.5 text-xs font-semibold text-rose-600 hover:bg-rose-100/70 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Rename Application Modal */}
      {renameModalApp && (
        <div
          onClick={closeRenameModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Rename Application
              </h3>
              <button
                type="button"
                onClick={closeRenameModal}
                className="text-slate-400 hover:text-slate-600 transition text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveRename} className="mt-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Title
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                autoFocus
                placeholder="Application Title"
                className="mt-1.5 block w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />

              <div className="mt-5 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeRenameModal}
                  disabled={isRenaming}
                  className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRenaming || !newTitle.trim()}
                  className="rounded-xl bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-emerald-800 transition disabled:opacity-60"
                >
                  {isRenaming ? "Saving..." : "Save Title"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalApp && (
        <div
          onClick={closeDeleteModal}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-xl sm:p-7"
          >
            <div className="flex items-start gap-4">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-rose-100 text-rose-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-slate-900">
                  Delete Application
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold text-slate-900">
                    &quot;{deleteModalApp.title || "Untitled Application"}&quot;
                  </span>
                  ? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={closeDeleteModal}
                disabled={isDeleting}
                className="rounded-xl border border-slate-300 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="rounded-xl bg-rose-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-rose-700 transition disabled:opacity-60"
              >
                {isDeleting ? "Deleting..." : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Dashboard;