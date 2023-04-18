import React, { useState, useEffect }  from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./widget/LandingPage";

import HouseRental from "./pages/HouseRental/HouseRental";
import LoginPage from "./pages/Loginpage/LoginPage";
import Registration from "./pages/Loginpage/Registration";
import Admin from "./widget/Admin";
import HouseRentalTable from "./pages/Adminpage/HouseRentalTable";
import InputHouseRental from "./pages/Adminpage/InputHouseRental";
import DashboardPage from "./pages/Adminpage/DashboardPage";
import Cookies from "js-cookie";
import HouseRentalDetail from "./pages/HouseRental/HouseRentalDetail";
import ChangePassword from "./pages/Adminpage/ChangePassword";
import { GlobalProvider } from "./context/GlobalProvider";
import Preloader from './components/Preloader';
// import WithAuth from './context/WithAuth';
import LoginGuard from './context/LoginGuard';

function App() {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate loading
    setTimeout(() => setLoading(false), 800);
  }, []);

  const LoginRoute = (props) => {
    console.log(Cookies.get("token"));
    if (Cookies.get("token") !== undefined) {
      return props.children;
    } else if (Cookies.get("token") === undefined) {
      return <Navigate to={"/"} />;
    }

  };

  return (
    <div className="App">
      
      {loading && <Preloader />}
      {!loading && 
      <BrowserRouter>
        <GlobalProvider>
          <Routes>
            

            <Route
              path="/"
              element={
                <LandingPage>
                  <HouseRental />
                </LandingPage>
              }
            />

            <Route
              path="/HouseRental/:Id"
              element={
                <LandingPage>
                  <HouseRentalDetail />
                </LandingPage>
              }
            />

            <Route
              path="/Login"
              element={
             
                <LoginGuard element={<LoginPage/>}/>
                // <LoginRoute element={<LoginPage />} />
               
              }
            />

            <Route
              path="/Registration"
              element={
                
                <LandingPage>
                  <Registration />
                </LandingPage>
                
              }
            />

            <Route
              path="/Dashboard/"
              element={
                <LoginRoute>
                  <Admin>
                    <DashboardPage />
                  </Admin>
                </LoginRoute>
              }
            />
            <Route
              path="/Dashboard/HouseRental"
              element={
                <LoginRoute>
                  <Admin>
                    <HouseRentalTable />
                  </Admin>
                </LoginRoute>
              }
            />
            <Route
              path="/Dashboard/HouseRental/Form"
              element={
                <LoginRoute>
                  <Admin>
                    <InputHouseRental />
                  </Admin>
                </LoginRoute>
              }
            />
            <Route
              path="/Dashboard/HouseRental/Form/:idData"
              element={
                <LoginRoute>
                  <Admin>
                    <InputHouseRental />
                  </Admin>
                </LoginRoute>
              }
            />

            <Route
              path="/Dashboard/HouseRental/ChangePassword"
              element={
                <LoginRoute>
                  <Admin>
                    <ChangePassword />
                  </Admin>
                </LoginRoute>
              }
            />
          </Routes>
        </GlobalProvider>
      </BrowserRouter>
    }
    </div>
  );
}

export default App;
