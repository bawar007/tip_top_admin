import { useEffect, useState, useContext, useCallback } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AppProviderContext } from "./App/Provider/AppProvider";
import axios from "axios";

import {
  deletePassCookie,
  getSesionPasCookie,
} from "./App/Pages/Login/helpers/SetCookie";

import Navigation from "./App/components/navigation/Navigation";
import LogoItem from "./App/components/LogoItem";

const App = () => {
  const { HOST } = useContext(AppProviderContext);
  const [isMatch, setIsMatch] = useState(null);

  const SESION_TOKEN = sessionStorage.getItem("accessToken");

  const checkSesionToken = useCallback(async () => {
    let accessToken = !SESION_TOKEN
      ? getSesionPasCookie("SESION_TOKEN")
      : SESION_TOKEN;

    if (accessToken.length === 0) setIsMatch(false);

    await axios
      .get(`${HOST}/verify`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Cache-Control": "no-cache",
        },
      })
      .then((response) => {
        if (response.status === 201) setIsMatch(true);
      })
      .catch((error) => {
        deletePassCookie();
        sessionStorage.clear();
        setIsMatch(false);
        console.error(error.response.data.msg);
      });
  }, [HOST, SESION_TOKEN]);

  useEffect(() => {
    checkSesionToken();
  }, [checkSesionToken, SESION_TOKEN]);

  if (isMatch === null) return <LogoItem color="black" />;
  return (
    <>
      {isMatch ? (
        <div className="AdminPanelContent">
          <Navigation />
          <div className="AdminPanelContent--setings">
            <Outlet />
          </div>
        </div>
      ) : (
        <Navigate to="/login" replace={true} />
      )}
    </>
  );
};

export default App;
