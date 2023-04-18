import React from "react";
import { Navbar } from "flowbite-react";
const Footer = () => {
  return (
    <div>
      <footer className="p-4 bg-[#11275B] md:p-8 lg:p-10 dark:bg-[#11275B]">
        <div className="mx-auto max-w-screen-xl text-center">
          <a
            href="/"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <Navbar.Brand>
              {/* <img src={Logo} className="mr-3 h-10 sm:h-9" alt="Logo" /> */}
              <h4 className="text-[#3b82f6] max-w-2xl mb-2 text-2xl font-extrabold tracking-tight leading-none md:text-1xl xl:text-2xl dark:text-white">
              About Our Site
            </h4>
            </Navbar.Brand>
          </a>
          <p className="my-6 text-white ">
          It is a House Rental site that allows student view houses at specific location and upcoming releases across all filter.
          </p>
          <p className="my-6 text-white ">
          GROUP "A" PYTHON CA2 PROJECT
          </p>
          
          <a
            href="/"
            className="flex justify-center items-center text-2xl font-semibold text-gray-900 dark:text-white"
          >
              <h4 className="text-[#3b82f6] max-w-2xl mb-2 text-2xl font-extrabold tracking-tight leading-none md:text-1xl xl:text-1xl dark:text-white">
              By
            </h4>
            </a>
          
          <span className="text-sm text-white sm:text-center ">
            Kaushik Vaghani, 
            Ankur Viradiya, 
            Vaibhav, 
            Obi Victor 
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
