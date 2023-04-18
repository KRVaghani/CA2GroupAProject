import React from "react";
import { Navbar } from "flowbite-react";
import Cookies from "js-cookie";
import Logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

function Navigation() {
  let navigate = useNavigate();
  return (
    <Navbar fluid={true} rounded={true} className= "sticky top-0 w-full justify-between px-4" style={{ backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity))" }}>
      <div className="container flex flex-wrap items-center justify-between mx-auto" >
        <Navbar.Brand>
          
          {/* #3b82f6 */}
          {/* <a href="/" >
          <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
          </a> */}
          <h5 className="text-[#11275B] max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl dark:text-white">
              HouseRental
            </h5>
            
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/">Home</Navbar.Link>
          {/* <Navbar.Link href="/HouseRental">HouseRental</Navbar.Link> */}
          
          {!Cookies.get("token") && (
            <Navbar.Link href="/Login">Login</Navbar.Link>
          )}
          {Cookies.get("token") && (
            <Navbar.Link href="/Dashboard">Dashboard</Navbar.Link>
          )}
          {Cookies.get("token") && (
            <Navbar.Link
              onClick={() => {
                Cookies.remove("token");
                navigate("/Login");
              }}
            >
              Logout
            </Navbar.Link>
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default Navigation;
