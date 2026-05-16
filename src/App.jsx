import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import ExplorePage from "./pages/ExplorePage/ExplorePage"
import MyApplicationsPage from "./pages/MyApplicationsPage/MyApplicationsPage"
import ChangeRequestPage from "./pages/admin/ChangeRequestPage/ChangeRequestPage"
import FaqPage from "./pages/FaqPage/FaqPage";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import DraftSubmissionPage from "./pages/admin/DraftSubmissionPage/DraftSubmissionPage";
import ChatPage from "./pages/ChatPage/ChatPage";
import FollowingPage from "./pages/FollowingPage/FollowingPage";

import CompetitionDetailPage from "./pages/CompetitionDetailPage/CompetitionDetailPage";
import CompetitionCreatePage from "./pages/CompetitionCreatePage/CompetitionCreatePage";
import CompetitionEditPage from "./pages/CompetitionEditPage/CompetitionEditPage";
import FormManagementPage from "./pages/FormManagementPage/FormManagementPage";
import AdminCompetitionReviewPage from "./pages/AdminCompetitionReviewPage/AdminCompetitionReviewPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage/AdminLoginPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import OnboardingPage from "./pages/OnboardingPage/OnboardingPage";
import YourInfoPage from "./pages/YourInfoPage/YourInfoPage";
import React from "react";
import PersonalizationPage from "./pages/PersonalizationPage/PersonalizationPage";
import ToastContainer from "./components/Toast/Toast";
import { useSelector } from "react-redux";
import { selectTheme, selectIsLoggedIn } from "./features/user/userSlice";
import OrganizerCenterPage from "./pages/organizer/OrganizerCenterPage/OrganizerCenterPage";
import ParticipantsPage from "./pages/organizer/ParticipantsPage/ParticipantsPage";
import EventsPage from "./pages/EventsPage/EventsPage";
import HistoryPage from "./pages/HistoryPage/HistoryPage";

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

const HomeRedirect = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return <Navigate to={isLoggedIn ? "/explore" : "/signup"} replace />;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomeRedirect />,
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
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "applications",
        element: <MyApplicationsPage />,
      },
      {
        path: "history",
        element: <HistoryPage />,
      },
      {
        path: "profile",
        element: <ProfilePage />,
      },
      {
        path: "/competition/:id",
        element: <CompetitionDetailPage />
      },
      
      // Community Navbar pages
      {
        path: "community",
        children: [
          {
            path: "announcements",
            element: <h1>Announcements</h1>,
          },
          {
            path: "faq",
            element: <FaqPage />,
          },
          {
            path: "dm",
            element: <h1>Organizer DM</h1>,
          },
          {
            path: "teamchat",
            element: <h1>Team Chat</h1>,
          },
          {
            path: "general",
            element: <ChatPage />,
          },
          {
            path: "public",
            element: <h1>Public Chat</h1>,
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
            element: <OrganizerCenterPage />,
          },
          {
            path: "participants",
            element: <ParticipantsPage />,
          },
          {
            path: "create",
            element: <CompetitionCreatePage />
          },
          {
            path: ":id/edit",
            element: <CompetitionEditPage />
          },
          {
            path: ":id/edit-form",
            element: <FormManagementPage />
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
            path: "dashboard",
            element: <h1>Admin Dashboard</h1>,
          },
          {
            path: "edit-requests",
            element: <ChangeRequestPage />,
          },
          {
            path: "draft-submissions",
            element: <DraftSubmissionPage />,
          },
          {
            path: "competition/:id/review",
            element: <AdminCompetitionReviewPage />
          },
        ],
      },
      {
        path: "django-admin",
        element: <h1>Django Admin</h1>,
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
  return <RouterProvider router={router} />;
}
