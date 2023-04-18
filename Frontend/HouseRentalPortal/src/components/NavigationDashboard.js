import React from "react";

const NavigationDashboard = () => {
  return (
    <nav className="bg-gray-100 border-gray-200 px-2 sm:px-4 py-2.5  dark:bg-gray-900">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/Dashboard" className="flex items-center">
          
          <h5 className="text-[#11275B] max-w-2xl mb-2 text-2xl font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl dark:text-white">
              HouseRental
            </h5>
        </a>
      </div>
    </nav>
  );
};

export default NavigationDashboard;
