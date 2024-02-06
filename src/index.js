import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import AppProvider from "./App/Provider/AppProvider";
import { HashRouter, Routes, Route } from "react-router-dom";

import Gallery from "./App/Pages/Gallery/Gallery";
import Opinions from "./App/Pages/Opinions/Opinions";
import Login from "./App/Pages/Login/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppProvider>
      <HashRouter>
        <Routes>
          <Route path="*" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<App />}>
            <Route path="gallerysettings" element={<Gallery />} />
            <Route path="opinionssettings" element={<Opinions />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppProvider>
  </React.StrictMode>
);
