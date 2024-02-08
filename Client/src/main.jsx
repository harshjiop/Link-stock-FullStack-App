import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Signup, Admin, Error, Guest } from "./pages";
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
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: (
      <AuthLayout authentication={false}>
        <Login />
      </AuthLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: (
      <AuthLayout authentication={false}>
        <Signup />
      </AuthLayout>
    ),
    errorElement: <Error />,
  },
  {
    path: "/admin",
    element: (
      <AuthLayout authentication>
        <Admin />
      </AuthLayout>
    ),
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: (
          <AuthLayout authentication>
            <Admin />
          </AuthLayout>
        ),
        errorElement: <Error />,
      },
      {
        path: "/admin/links",
        element: (
          <AuthLayout authentication>
            <Links />
          </AuthLayout>
        ),
        errorElement: <Error />,
      },
      {
        path: "/admin/design",
        element: (
          <AuthLayout authentication>
            <Design />
          </AuthLayout>
        ),
        errorElement: <Error />,
      },
      {
        path: "/admin/settings",
        element: (
          <AuthLayout authentication>
            <Settings />
          </AuthLayout>
        ),
        errorElement: <Error />,
      },
      {
        path: "/admin/account",
        element: (
          <AuthLayout authentication>
            <Account />
          </AuthLayout>
        ),
        errorElement: <Error />,
      },
    ],
  },
  {
    path: "/:userName",
    element: <Guest />,
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
