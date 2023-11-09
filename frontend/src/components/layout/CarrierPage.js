import React from "react";
import { useNavigate } from "react-router-dom";

function CarrierPage({ token, userInfo }) {
  const navigate = useNavigate();
  return token ? <div>CarrierPage</div> : navigate("/404");
}

export default CarrierPage;
