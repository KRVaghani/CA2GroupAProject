import React from "react";
import images from "../assets/images/Admin.svg";
const Dashboard = () => {
  return (
    <div>
      <section className="min-h-screen dark:bg-gray-900">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Welcome to Admin Dashboard
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              You can insert, edit, delete House, and setting
            </p>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src="https://www.guesty.com/wp-content/uploads/2019/09/Asset-3.svg" alt="mockup" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
