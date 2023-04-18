import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../components/Footer";
import { GlobalContext } from "../../context/GlobalProvider";
import { useContext } from "react";
import { Label, TextInput, Button } from "flowbite-react";

const HouseRentalDetail = () => {
  const { Id } = useParams();
  const [dataHouse, setDataHouse] = useState(null);

  let { idData } = useParams();
  const { state, handleFunction } = useContext(GlobalContext);
  const { input, setInput, setCurrentId } = state;

  const [visible, setVisible] = useState(false);
  const [fullname, setFullName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const { handleInput, handleSubmit } = handleFunction;
  useEffect(() => {
    if (Id !== undefined) {
      axios
        .get(`http://127.0.0.1:5000/existing-property-endpoint/${Id}`)
        .then((res) => {
          console.log(res);
          setDataHouse(res.data);
        });
    }
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  const validateForm = () => {
    if (!fullname.trim()) {
      setError("Please enter your full name.");
      return false;
    }
    if (!number.trim()) {
      setError("Please enter your phone number.");
      return false;
    }
    if (!/^\d{10}$/.test(number)) {
      setError("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!email.trim()) {
      setError("Please enter your email address.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (!description.trim()) {
      setError("Please enter your description.");
      return false;
    }
    return true;
  };

  const handleApply = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      // form input is valid, show success message and close popup
      setSuccess(true);
      setTimeout(() => {
        setVisible(false);
        setSuccess(false);
        setFullName("");
        setNumber("");
        setEmail("");
        setDescription("");
      }, 5000);
    }
  };

  const handleCancel = () => {
    setVisible(false);
  };

  if (dataHouse=== null) {
    return <p>Loading...</p>;
  }

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  };

  const popupStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    zIndex: 2,
  };

  return (
    <div className="bg-[#11275B] p-16">
      <div className="flex flex-col  items-start bg-white border rounded-lg shadow-md md:flex-row  hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover p-5 w-full rounded-t-lg h-96 md:h-auto md:w-80 md:rounded-none md:rounded-l-lg "
          src={dataHouse.company_image_url}
        />
        <div className="flex flex-col justify-between text-left m-4 p-2 leading-normal w-full ">
          <h2 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white text-xl">
            {dataHouse.title + " (" + dataHouse.Rent_tenure + ")"}
          </h2>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataHouse.company_name + " - " + dataHouse.Rent_type}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataHouse.company_city}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataHouse.Rent_status == 1
              ? "Actively Recruiting"
              : "Stop Recruiting"}
          </p>
          <hr />
          <p className="mb-3 mt-3 font-bold text-gray-700 dark:text-gray-400 text-lg">
            Description
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataHouse.Rent_description}
          </p>
          <hr />
          <p className="mb-3 mt-3 font-bold text-gray-700 dark:text-gray-400 text-lg">
            Qualification
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {dataHouse.Rent_qualification}
          </p>
          <hr />
          <p className="mb-3 mt-3 font-bold text-gray-700 dark:text-gray-400 text-lg">
            Salary
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {"ER." + dataHouse.salary_min + " - ER." + dataHouse.salary_max}
          </p>
          <div style={{ display: 'flex' }}>
          <a>
            <button onClick={() => setVisible(true)} className="w-20 p-2 text-white bg-[#1e3a8a] hover:bg-[#3b82f6] rounded-lg ">
              Request
            </button>
          </a>
          <a href="/">
            <button style={{marginLeft:"20px"}}  className="w-20 p-2 text-white bg-[#3b82f6] hover:bg-[#1e3a8a] rounded-lg ">
              Back
            </button>
          </a>
          </div>
        </div>
      </div>
      {visible && (
        <div className="popup-form-container">
          <div style={overlayStyle} className="overlay"></div>
       
        <div style={popupStyle} className="popup popup-form-container">

          <div className="md:container md:mx-auto p-12">
            
        
          <h1 className="text-[#3b82f6] max-w-2xl mb-2 text-2xl font-extrabold tracking-tight leading-none md:text-2xl xl:text-3xl dark:text-white">
              House Request Form
            </h1>
       
            <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
              <div>
                <div className="mb-2 block text-left">
                  <Label htmlFor="fullname" value="Full Name :" />
                </div>
                <TextInput
                  id="fullname"
                  name="fullname"
                  type="text"
                  value={fullname}
                  onChange={(event) => setFullName(event.target.value)}
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block text-left">
                  <Label htmlFor="phone_no" value="Phone Number :" />
                </div>
                <TextInput
                  id="phone_no"
                  name="phone_no"
                  type="tel"
                  value={number}
                  onChange={(event) => setNumber(event.target.value)}
                  required={true}
                />
              </div>
              <div>
                <div className="mb-2 block text-left">
                  <Label htmlFor="email" value="Email :" />
                </div>
                <TextInput
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  onChange={(event) => setEmail(event.target.value)}
                  required={true}
                />
              </div>
              <div>
              <div className="mb-2 block text-left">
                  <Label htmlFor="description_message" value="Description Message :" />
                </div>
                <TextInput
                  id="description_message"
                  name="description_message"
                  value={description}
                  type="description_message"
                  onChange={(event) => setDescription(event.target.value)}
                  required={true}
                />
              </div>
              {error && <div className="error-message">{error}</div>}
            <div style={{ display: 'flex'}}>
            <Button style={{width: '100%'}} onClick={handleApply} className="w-32" type={"submit"}>
                Request
              </Button>
              <Button  style={{marginLeft:"20px", width:"100%"}} onClick={handleCancel} className="w-32" type={"cancel"}>
                Cancel
              </Button>
            </div>
              
            </form>
          </div>
        </div>
        </div>
      )}
        {success && (
        <div className="success-message">Your Request Submitted successfully!</div>
      )}
      <Footer />
    </div>
  );
};

export default HouseRentalDetail;
