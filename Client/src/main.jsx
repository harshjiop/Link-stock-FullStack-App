import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Signup, Admin } from "./pages";
import { Provider } from "react-redux";
import {
  Account,
  Design,
  Links,
  Settings,
  AuthLayout,
} from "./components/index.js";
import store from "./store/store.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
  },
  {
    path: "/admin",
    element: (
      <AuthLayout authentication>
        <Admin />
      </AuthLayout>
    ),
    children: [
      {
        path: "",
        element: (
          <AuthLayout authentication>
            <Admin />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/links",
        element: (
          <AuthLayout authentication>
            <Links />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/design",
        element: (
          <AuthLayout authentication>
            <Design />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/settings",
        element: (
          <AuthLayout authentication>
            <Settings />
          </AuthLayout>
        ),
      },
      {
        path: "/admin/account",
        element: (
          <AuthLayout authentication>
            <Account />
          </AuthLayout>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
