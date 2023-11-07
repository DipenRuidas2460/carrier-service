import React from "react";
import Header from "./Header";
import CustomerDesign from "../modules/CustomerDesign";
import NotFound from "../partials/404";

function CustomerPage({token}) {
  return (
    <div>
      {token ? (
        <>
          <Header />
          <CustomerDesign />
        </>
      ) : (
        <NotFound />
      )}
    </div>
  );
}

export default CustomerPage;
