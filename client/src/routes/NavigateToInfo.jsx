import React from "react";
import { Navigate } from "react-router";

const NavigateToInfo = ({ data }) => {
  return <Navigate to="/info" state={data} />;
};

export default NavigateToInfo;
