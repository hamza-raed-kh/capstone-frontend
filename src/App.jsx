import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Sandbox } from "./pages/Sandbox";
import ExplorePage from "./pages/ExplorePage/ExplorePage"
import MyApplicationsPage from "./pages/MyApplicationsPage/MyApplicationsPage"
import ChangeRequestPage from "./pages/admin/ChangeRequestPage/ChangeRequestPage"
import FaqPage from "./pages/FaqPage/FaqPage";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import DraftSubmissionPage from "./pages/admin/DraftSubmissionPage/DraftSubmissionPage";

import LoginPage from "./pages/LoginPage/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import YourInfoPage from "./pages/YourInfoPage/YourInfoPage";
import ToastContainer from "./components/Toast/Toast";

/**
 * A layout component that wraps the main content of the application.
 * It uses the `Outlet` component from `react-router-dom` to render nested routes.
 *
 * @returns {JSX.Element} The rendered layout with a `main` element and an `Outlet`.
 */
const RootLayout = () => (
  <>
    <ToastContainer />
    <main>
      <Outlet />
    </main>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <h1>Home Page</h1>,
      },
      {
        path: "/sandbox",
        element: <Sandbox />,
      },
      {
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/applications",
        element: <MyApplicationsPage />,
      },
      {
        path: "/faq",
        element: <FaqPage />,
      },
      {
        path: "/account/security",
        element: <SecurityPage />,
      },
      {
        path: "/login",
        element: <LoginPage />
      },
      {
        path: "/admin/login",
        element: <AdminLoginPage />
      },
      {
        path: "/signup",
        element: <SignupPage />
      },
      {
        path: "/onboarding",
        element: <OnboardingPage />
      },
      {
        path: "/profile",
        element: <ProfilePage />
      },
      {
        path: "/manage/edit-requests",
        element: <ChangeRequestPage />
      },
      {
        path: "/manage/draft-submissions",
        element: <DraftSubmissionPage />
      },
      {
        path: "/account/profile",
        element: <YourInfoPage />
      },
    ],
  },
]);

/**
 * The main application component.
 * It sets up the router and renders the `RouterProvider`.
 *
 * @returns {JSX.Element} The `RouterProvider` component with the configured router.
 */
export default function App() {
  function selectSectionedLayout() {
    return false
  }
  return <RouterProvider router={router} />;
}
