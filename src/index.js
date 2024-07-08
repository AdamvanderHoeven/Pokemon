import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import Kabutops from "./components/Kabutops";
import PokemonDetails from "./components/PokemonDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/happy",
    element: <Kabutops />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/pokemon/:name",
    element: <PokemonDetails />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
