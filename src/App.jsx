import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Sandbox } from "./pages/Sandbox";
import ExplorePage from "./pages/ExplorePage/ExplorePage"
import MyApplicationsPage from "./pages/MyApplicationsPage/MyApplicationsPage"
import ChangeRequestPage from "./pages/admin/ChangeRequestPage/ChangeRequestPage"
import FaqPage from "./pages/FaqPage/FaqPage";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import DraftSubmissionPage from "./pages/admin/DraftSubmissionPage/DraftSubmissionPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import FollowersPage from "./pages/FollowersPage/FollowersPage";

import CompetitionDetailPage from "./pages/CompetitionDetailPage/CompetitionDetailPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import YourInfoPage from "./pages/YourInfoPage/YourInfoPage";
import React from "react";
import PersonalizationPage from "./pages/PersonalizationPage/PersonalizationPage";
import ToastContainer from "./components/Toast/Toast";
import { useSelector } from "react-redux";
import { selectTheme } from "./features/user/userSlice";

/**
 * A layout component that wraps the main content of the application.
 * It uses the `Outlet` component from `react-router-dom` to render nested routes.
 *
 * @returns {JSX.Element} The rendered layout with a `main` element and an `Outlet`.
 */
const RootLayout = () => {
  const theme = useSelector(selectTheme);

  // Sync theme to the document element for CSS variables
  React.useEffect(() => {
    const root = document.documentElement;
    
    const applyTheme = () => {
      if (theme === 'system') {
        const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', isDark ? 'dark' : 'light');
      } else {
        root.setAttribute('data-theme', theme);
      }
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const listener = (e) => {
        root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
      };
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }
  }, [theme]);

  return (
    <>
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </>
  );
};

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
        path: "/explore",
        element: <ExplorePage />,
      },
      {
        path: "/applications",
        element: <MyApplicationsPage />,
      },
      {
        path: "community/faq",
        element: <FaqPage />,
      },
      {
        path: "community/general",
        element: <ChatPage />,
      },
      {
        path: "/profile",
        element: <ProfilePage />
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
        path: "/account/follower-management",
        element: <FollowersPage />
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
      {
        path: "/account/preferences",
        element: <PersonalizationPage />
      },
      {
        path: "/competition/:id",
        element: <CompetitionDetailPage />
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
