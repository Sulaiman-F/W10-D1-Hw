import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import Nav from "../componetn/Nav";
import Footer from "../componetn/Footer";
import Home from "../page/Home";
import Weather from "../page/Weather";
import Login from "../auth/Login";
import Register from "../auth/Register";
function Layout() {
  return (
    <>
      <Nav />
      <div className=" h-13 lg:h-16"></div>
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },

  {
    path: "/home",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "home", element: <Home /> },
      { path: "weather", element: <Weather /> },
    ],
  },
]);
function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
