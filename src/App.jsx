import './App.css'
import SectionedLayout from './layouts/SectionedLayout'
import BoxLayout from './layouts/BoxLayout'

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Sandbox } from "./pages/Sandbox";

/**
 * A layout component that wraps the main content of the application.
 * It uses the `Outlet` component from `react-router-dom` to render nested routes.
 *
 * @returns {JSX.Element} The rendered layout with a `main` element and an `Outlet`.
 */
const RootLayout = () => (
  <main>
    <Outlet /> {}
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
    ],
  },
]);

/**
 * The main application component.
 * It sets up the router and renders the `RouterProvider`.
 *
 * @returns {JSX.Element} The `RouterProvider` component with the configured router.
 */
function App() {
  function selectSectionedLayout(){
    return false
  }
  return (
    <>
      <RouterProvider router={router} />
      {/* <div className="screen">
        {selectSectionedLayout()? <SectionedLayout/>: <BoxLayout/>}
      </div> */}
    </>
  );

}

export default App
