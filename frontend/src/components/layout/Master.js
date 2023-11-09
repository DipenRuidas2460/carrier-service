import React from "react";
import Nav from "../partials/Nav";
import SideBar from "../partials/SideBar";
import Footer from "../partials/Footer";
import Dashboard from "../modules/Dashboard";
import { useNavigate } from "react-router-dom";

function Master({ token, userInfo }) {
  const navigate = useNavigate();
  return (
    <div>
      {token ? (
        <>
          <Nav />
          <div id="layoutSidenav">
            <SideBar />
            <div id="layoutSidenav_content">
              <Dashboard />
              <Footer />
            </div>
          </div>
        </>
      ) : (
        navigate("/404")
      )}
    </div>
  );
}

export default Master;
