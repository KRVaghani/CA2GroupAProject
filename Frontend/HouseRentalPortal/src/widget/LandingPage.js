import React from "react";
import Navigation from "../components/Navigation";

const LandingPage = (props) => {
  return (
    <div>
      <Navigation />
      {props.children}
    </div>
  );
};

export default LandingPage;
