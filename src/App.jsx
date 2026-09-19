import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import Layout from "./pages/Layout.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import CreateApplication from "./pages/CreateApplication.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Features from "./components/Features.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import DemoPreview from "./pages/DemoPreview.jsx";
import DashBoard from "./pages/DashBoard.jsx";
import EditApplication from "./pages/EditApplication.jsx";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Root Layout Component
    errorElement: <ErrorPage />, // Global Error Boundary
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "demo",
        element: <DemoPreview />,
      },

      /* Protected Routes Section */
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "create",
            element: <CreateApplication />,
          },
          // Any other private routes (e.g., dashboard, history) go here
          {
            path: "dashboard",
            element: <DashBoard />,
          },
          {
            path: "edit/:applicationId",
            element: <EditApplication />,
         },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={appRouter} />
    </AuthProvider>
  );
}

export default App;
