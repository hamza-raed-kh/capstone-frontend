import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Sandbox } from "./pages/Sandbox";
import BoxLayout from './layouts/BoxLayout/BoxLayout'
import ExplorePage from "./pages/ExplorePage/ExplorePage"
import MyApplicationsPage from "./pages/MyApplicationsPage/MyApplicationsPage"
import ChangeRequestPage from "./pages/admin/ChangeRequestPage/ChangeRequestPage"
import FaqPage from "./pages/FaqPage/FaqPage";
import SecurityPage from "./pages/SecurityPage/SecurityPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage"
import DraftSubmissionPage from "./pages/admin/DraftSubmissionPage/DraftSubmissionPage";

/**
 * A layout component that wraps the main content of the application.
 * It uses the `Outlet` component from `react-router-dom` to render nested routes.
 *
 * @returns {JSX.Element} The rendered layout with a `main` element and an `Outlet`.
 */
const RootLayout = () => (
  <main>
    <Outlet />
  </main>
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
        element: <BoxLayout />
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
