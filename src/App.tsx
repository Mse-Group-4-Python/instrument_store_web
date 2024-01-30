import "./styles/global.scss";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import Footer from "./components/footer/Footer";
import { Home } from "./pages/home/Home";
import { Instrument } from "./pages/instrument/Instrument";
import { InstrumentItem } from "./pages/instrument_item/InstrumentItem";
import Login from "./pages/login/Login";
import Menu from "./components/menu/Menu";
import Navbar from "./components/navbar/Navbar";
import { Orders } from "./pages/order/Order";
import Product from "./pages/product/Product";
import Register from "./pages/register/Register";
import User from "./pages/user/User";
import { Users } from "./pages/users/Users";

function App() {
  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Users />,
        },
        {
          path: "/instruments",
          element: <Instrument />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/instrument-items",
          element: <InstrumentItem />,
        },
        {
          path: "/instrument-items/:id",
          element: <Product />,
        },
      ],
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "register",
      element: <Register />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
