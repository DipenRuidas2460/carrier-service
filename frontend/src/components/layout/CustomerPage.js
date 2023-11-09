import React from "react";
import Header from "./Header";
import CustomerDesign from "../modules/CustomerDesign";
import { useNavigate } from "react-router-dom";

function CustomerPage({ token, userInfo }) {
  const navigate = useNavigate();
  return (
    <div>
      {token ? (
        <>
          <Header />
          <CustomerDesign />
        </>
      ) : (
        navigate("/404")
      )}
    </div>
  );
}

export default CustomerPage;
