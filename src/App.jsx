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
import FollowingPage from "./pages/FollowingPage/FollowingPage";

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
import OrganizerCenter from "./pages/organizer/OrganizerCenter/OrganizerCenter";
import ParticipantsPage from "./pages/organizer/ParticipantsPage/ParticipantsPage";

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

      // Login & Onboarding pages
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "onboarding",
        element: <OnboardingPage />,
      },
      
      // Home Navbar pages
      {
        path: "explore",
        element: <ExplorePage />,
      },
      {
        path: "applications",
        element: <MyApplicationsPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      
      // Community Navbar pages
      {
        path: "community",
        children: [
          {
            path: "faq",
            element: <FaqPage />,
          },
          {
            path: "general",
            element: <ChatPage />,
          },
        ],
      },
      
      
      // Account Navbar pages
      {
        path: "account",
        children: [
          {
            path: "profile",
            element: <YourInfoPage />,
          },
          {
            path: "following",
            element: <FollowingPage />
          },
          {
            path: "security",
            element: <SecurityPage />,
          },
          {
            path: "preferences",
            element: <PersonalizationPage />,
          },
        ],
      },

      // Organized Navbar pages
      {
        path: "organizer",
        children: [
          {
            path: "competitions",
            element: <OrganizerCenter />,
          },
          {
            path: "participants",
            element: <ParticipantsPage />,
          },
        ],
      },
      
      // Admin Navbar pages
      {
        path: "admin",
        children: [
          {
            path: "login",
            element: <AdminLoginPage />,
          },
          {
            path: "edit-requests",
            element: <ChangeRequestPage />,
          },
          {
            path: "draft-submissions",
            element: <DraftSubmissionPage />,
          },
        ],
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
