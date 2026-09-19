import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

const baseNavLinks = [
  { label: "Home", href: "/", id: "top" },
  { label: "How It Works", href: "/how-it-works", id: "how-it-works" },
  { label: "Demo", href: "/demo", id: "demo" },
  { label: "Features", href: "/features", id: "features" },
];

const MenuIcon = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
    className="h-5 w-5"
  >
    {open ? (
      <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
    ) : (
      <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
    )}
  </svg>
);

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isHomePage = location.pathname === "/";
  const closeMenu = () => setIsOpen(false);

  // Dynamically include Dashboard if user is authenticated
  const navLinks = [
    ...baseNavLinks,
    ...(user ? [{ label: "Dashboard", href: "/dashboard", id: "dashboard" }] : []),
  ];

  useEffect(() => {
    if (!isHomePage) return;

    const sections = ["top", "how-it-works", "features"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, [isHomePage]);

  const checkIsActive = (link) => {
    if (link.href === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    if (link.href === "/demo") {
      return location.pathname === "/demo";
    }
    if (!isHomePage) {
      return location.pathname === link.href;
    }
    return activeSection === link.id;
  };

  const displayName =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-amber-50/95 backdrop-blur">
      <nav
        className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-5 sm:px-7"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2.5 text-lg font-extrabold tracking-tight text-slate-950"
          onClick={closeMenu}
        >
          <span
            className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-700 text-sm font-extrabold text-white shadow-sm"
            aria-hidden="true"
          >
            A
          </span>
          AI WriteAssist
        </Link>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link);
            const activeClasses = isActive
              ? "text-emerald-700 font-bold border-b-2 border-emerald-700 pb-1"
              : "text-slate-600 font-semibold hover:text-emerald-800";

            return (
              <li key={link.label}>
                {link.href.startsWith("/") ? (
                  <Link
                    to={link.href}
                    onClick={() => {
                      closeMenu();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`text-sm transition-colors ${activeClasses}`}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={isHomePage ? link.href : `/${link.href}`}
                    className={`text-sm transition-colors ${activeClasses}`}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>

        {/* Desktop Auth Controls & CTA */}
        <div className="hidden items-center gap-4 sm:flex">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="max-w-[150px] truncate text-xs font-semibold text-slate-700 hover:text-emerald-700 transition"
              >
                Hi, {displayName}
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="rounded-xl border border-slate-300 px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="rounded-xl px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:text-emerald-800"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-xs font-bold text-slate-800 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
              >
                Sign Up
              </Link>
            </div>
          )}

          <Link
            to="/create"
            className="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-800"
          >
            Create an Application
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-lg text-slate-800 transition hover:bg-slate-100 lg:hidden"
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon open={isOpen} />
        </button>
      </nav>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div
          id="mobile-navigation"
          className="absolute inset-x-3 top-[calc(100%+.5rem)] rounded-2xl border border-slate-200 bg-white p-3 shadow-xl lg:hidden"
        >
          {user && (
            <Link
              to="/dashboard"
              onClick={closeMenu}
              className="mb-2 block rounded-xl bg-slate-50 px-4 py-2.5 text-xs text-slate-600 hover:bg-emerald-50 transition"
            >
              Signed in as <span className="font-bold text-slate-900">{displayName}</span> (View Dashboard)
            </Link>
          )}

          <ul className="grid gap-1">
            {navLinks.map((link) => {
              const isActive = checkIsActive(link);
              const mobileActiveClasses = isActive
                ? "bg-emerald-50 text-emerald-900 font-bold"
                : "text-slate-700 font-semibold hover:bg-emerald-50 hover:text-emerald-900";

              return (
                <li key={link.label}>
                  {link.href.startsWith("/") ? (
                    <Link
                      to={link.href}
                      onClick={() => {
                        closeMenu();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}
                      className={`block rounded-xl px-4 py-3 text-sm ${mobileActiveClasses}`}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      href={isHomePage ? link.href : `/${link.href}`}
                      onClick={closeMenu}
                      className={`block rounded-xl px-4 py-3 text-sm ${mobileActiveClasses}`}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex flex-col gap-2 border-t border-slate-100 pt-3">
            {user ? (
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  signOut();
                }}
                className="w-full rounded-xl border border-rose-200 bg-rose-50/50 py-2.5 text-center text-xs font-bold text-rose-700 hover:bg-rose-100/70 transition"
              >
                Sign Out
              </button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="rounded-xl border border-slate-200 py-2.5 text-center text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  onClick={closeMenu}
                  className="rounded-xl bg-slate-900 py-2.5 text-center text-xs font-bold text-white hover:bg-slate-800"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              to="/create"
              onClick={closeMenu}
              className="mt-1 flex justify-center rounded-xl bg-emerald-700 px-4 py-3 text-sm font-bold text-white shadow-sm hover:bg-emerald-800 transition"
            >
              Create an Application
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default NavBar;