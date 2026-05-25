import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import ExplorePage from "./pages/explore/ExplorePage/ExplorePage"
import MyApplicationsPage from "./pages/explore/MyApplicationsPage/MyApplicationsPage"
import ChangeRequestPage from "./pages/admin/ChangeRequestPage/ChangeRequestPage"
import FaqPage from "./pages/community/FaqPage/FaqPage";
import SecurityPage from "./pages/account/SecurityPage/SecurityPage";
import ProfilePage from "./pages/explore/ProfilePage/ProfilePage"
import DraftSubmissionPage from "./pages/admin/DraftSubmissionPage/DraftSubmissionPage";
import ChannelPage from "./pages/community/ChannelPage/ChannelPage";
import FollowingPage from "./pages/account/FollowingPage/FollowingPage";
import NotFoundPage from "./pages/error/NotFoundPage/NotFoundPage";

import CompetitionDetailPage from "./pages/competition/CompetitionDetailPage/CompetitionDetailPage";
import CompetitionCreatePage from "./pages/organizer/CompetitionCreatePage/CompetitionCreatePage";
import CompetitionEditPage from "./pages/organizer/CompetitionEditPage/CompetitionEditPage";
import FormManagementPage from "./pages/organizer/FormManagementPage/FormManagementPage";
import AdminCompetitionReviewPage from "./pages/admin/AdminCompetitionReviewPage/AdminCompetitionReviewPage";
import AdminEditRequestReviewPage from "./pages/admin/AdminEditRequestReviewPage/AdminEditRequestReviewPage";
import LoginPage from "./pages/auth/LoginPage/LoginPage";
import AdminLoginPage from "./pages/auth/AdminLoginPage/AdminLoginPage";
import SignupPage from "./pages/auth/SignupPage/SignupPage";
import OnboardingPage from "./pages/auth/OnboardingPage/OnboardingPage";
import YourInfoPage from "./pages/account/YourInfoPage/YourInfoPage";
import React from "react";
import PersonalizationPage from "./pages/account/PersonalizationPage/PersonalizationPage";
import ToastContainer from "./components/ui/Toast/Toast";
import { useSelector, useDispatch } from "react-redux";
import { selectTheme, selectIsLoggedIn, setUser, setTheme } from "./features/user/userSlice";
import { useGetMeQuery } from "./features/api/authApi";
import OrganizerCenterPage from "./pages/organizer/OrganizerCenterPage/OrganizerCenterPage";
import ParticipantsPage from "./pages/organizer/ParticipantsPage/ParticipantsPage";
import EventsPage from "./pages/explore/EventsPage/EventsPage";
import HistoryPage from "./pages/explore/HistoryPage/HistoryPage";
import CompetitionDashboard from "./pages/organizer/CompetitionDashboard/CompetitionDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard/AdminDashboard";
import CommunityLayout from "./layouts/CommunityLayout/CommunityLayout";
import AccountCenterLayout from "./layouts/AccountCenterLayout/AccountCenterLayout";
import OrganizerCenterLayout from "./layouts/OrganizerCenterLayout/OrganizerCenterLayout";
import SectionedLayout from "./layouts/SectionedLayout/SectionedLayout";

/**
 * A layout component that wraps the main content of the application.
 * It uses the `Outlet` component from `react-router-dom` to render nested routes.
 *
 * @returns {JSX.Element} The rendered layout with a `main` element and an `Outlet`.
 */
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return children;
};

const RootLayout = () => {
  const theme = useSelector(selectTheme);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const { data: userData } = useGetMeQuery(undefined, { skip: !isLoggedIn });

  React.useEffect(() => {
    if (userData) {
      dispatch(setUser(userData));
      if (userData.theme) dispatch(setTheme(userData.theme));
    }
  }, [userData, dispatch]);

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

const AdminRedirect = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return <Navigate to={isLoggedIn ? "/admin/dashboard" : "/admin/login"} replace />;
};

const AdminRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { data: userData, isLoading, isSuccess } = useGetMeQuery(undefined, { skip: !isLoggedIn });

  if (!isLoggedIn) return <Navigate to="/admin/login" replace />;
  if (isLoading) return null;
  if (isSuccess && !userData?.is_staff) return <Navigate to="/admin/login" replace />;
  return <SectionedLayout preset="admin">{children}</SectionedLayout>;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // Public routes
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "admin/login",
        element: <AdminLoginPage />,
      },
      {
        path: "admin",
        element: <AdminRedirect />,
      },

      // Everything else requires auth
      {
        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
        children: [
          {
            index: true,
            element: <HomeRedirect />,
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
            path: "profile/:id",
            element: <ProfilePage />,
          },
          {
            path: "competition/:id",
            element: <CompetitionDetailPage />
          },
          
          // Community Navbar pages
          {
            path: "community/:eventId",
            element: <CommunityLayout />,
            children: [
              {
                path: "faq",
                element: <FaqPage />,
              },
              {
                path: ":channelId",
                element: <ChannelPage />,
              },
            ],
          },
          
          // Account Navbar pages
          {
            path: "account",
            element: <AccountCenterLayout />,
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

          // Organizer Navbar pages
          {
            path: "organizer",
            element: <OrganizerCenterLayout />,
            children: [
              {
                index: true,
                element: <OrganizerCenterPage />,
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
                path: ":id/dashboard",
                element: <CompetitionDashboard />
              },
              {
                path: ":id/preview",
                element: <CompetitionDetailPage />
              },
              {
                path: ":id/form",
                element: <FormManagementPage />
              },
              {
                path: ":id/participants",
                element: <ParticipantsPage />
              },
            ],
          },
          
          // Admin Navbar pages (except login)
          {
            path: "admin",
            element: <AdminRoute><Outlet /></AdminRoute>,
            children: [
              {
                path: "dashboard",
                element: <AdminDashboard />
              },
              {
                path: "edit-requests",
                element: <ChangeRequestPage />,
              },
              {
                path: "edit-requests/:id",
                element: <AdminEditRequestReviewPage />,
              },
              {
                path: "draft-submissions",
                element: <DraftSubmissionPage />,
              },
              {
                path: "draft-submissions/:id",
                element: <AdminCompetitionReviewPage />,
              },
            ],
          },
        ],
      },
      {
        path: "404",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
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
