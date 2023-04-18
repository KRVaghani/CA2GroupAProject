import React from "react";
import DashboardFooter from "../components/DashboardFooter";
import NavigationDashboard from "../components/NavigationDashboard";
import SideNavbar from "../components/SideNavbar";

const Admin = (props) => {
  return (
    <div className="flex flex-row">
      <SideNavbar />
      <div className="grow flex flex-col ">
        <NavigationDashboard />
        {props.children}
        <div className="mt-auto">
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
};

export default Admin;
