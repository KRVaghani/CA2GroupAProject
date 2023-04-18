import React, { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  let navigate = useNavigate();

  // Handle Login
  const [inputLogin, setInputLogin] = useState({
    email: "",
    password: "",
  });

  const handleChangeLogin = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputLogin({ ...inputLogin, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    let { email, password } = inputLogin;
    axios
      .post(`http://127.0.0.1:5000/login`, {
        email,
        password,
      })
      .then((res) => {

        console.log(res.data.token);
        let { token } = res.data;
        Cookies.set("token", token);

        navigate("/Dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //Handle Registration
  const [inputRegistration, setInputRegistration] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleChangeRegistration = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputRegistration({ ...inputRegistration, [name]: value });
  };

  const handleRegistration = (event) => {
    event.preventDefault();
    let { name, phone, email, password } = inputRegistration;
    axios
      .post(`http://127.0.0.1:5000/register`, {
        name,
        phone,
        email,
        password,
      })
      .then((res) => {
        navigate("/Login");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  //Handle Search and Filter

  const [dataHouse, setdataHouse] = useState(null);
  const [fetchStatus, setFetchStatus] = useState(true);
  const [filterHouseType, setFilterHouseType] = useState(null);
  const [filterCity, setFilterCity] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    type: "",
    city: "",
  });

  const handleSearchInput = (event) => setSearch(event.target.value);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

  console.log(search)

    axios
      .get("http://127.0.0.1:5000/search_properties?q=" + search)
      .then((res) => {
        setdataHouse(res.data);
        // console.log(res.data);
        // let searchData = res.data.filter((res) => {
        //   return Object.values(res)
        //     .join(" ")
        //     .toLowerCase()
        //     .includes(search.toLowerCase());
        // });
        // setdataHouse([...searchData]);
      })
      .catch((error) => {
        console.error(error);
        // Handle the error here
      });
  };

  const handleChangeFilter = (event) => {
    if (event.target.value !== "houseType") {
      setFilter({ ...filter, [event.target.name]: event.target.value });
    } else {
      setFilter({ ...filter, [event.target.name]: "" });
    }
  };

  const handleFilterSubmit = (event) => {
    event.preventDefault();
    axios
      .get("http://127.0.0.1:5000/property")
      .then((res) => {
        setdataHouse(res.data);
        console.log("kaushik",res.data);
        let filterData = res.data.filter((res) => {
          console.log(filter.type);
          return (
            res.type === filter.type ||
            res.city === filter.city
          );
        });

        console.log(filterData);
        setdataHouse([...filterData]);
      });
  };

  // Edit and Delete

  const handleDelete = (event) => {
    let idData = parseInt(event.currentTarget.value);
    console.log(event.target.value);
    axios
      .delete(`http://127.0.0.1:5000/delete_property/${idData}`, {
        headers: { Authorization: "Bearer " + Cookies.get("token") },
      })
      .then((res) => {
        setFetchStatus(true);
      });
  };

  const handleEdit = (event) => {
    let idData = parseInt(event.currentTarget.value);
    navigate(`/Dashboard/HouseRental/Form/${idData}`);
  };

  // Form
  const [currentId, setCurrentId] = useState(-1);

  const [input, setInput] = useState({
   
    type: "",
    description: "",
    address: "",
    city: "",
    bedrooms: "",
    image_url: "",
    price: "",
  });

  const handleInput = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    if (name === "type") {
      setInput({ ...input, type: value });
    } else if (name === "House_description") {
      setInput({ ...input, House_description: value });
    } else if (name === "Address") {
      setInput({ ...input, Address: value });
    } else if (name === "City") {
      setInput({ ...input, City: value });
    } else if(name === "Bedrooms") {
      setInput({ ...input, Bedrooms: value });
    } else if (name === "Image_url") {
      setInput({ ...input, Image_url: value });
    } else if (name === "Price") {
      setInput({ ...input, Price: value });
    } 
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let {
      type,
      description,
      address,
      city,
      bedrooms,
      image_url,
      price,
    } = input;
    if (currentId === -1) {
      axios
        .post(
          "http://127.0.0.1:5000/property",
          {
            type,
            description,
            address,
            city,
            bedrooms,
            image_url,
            price,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
          navigate("/Dashboard/HouseRental");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      axios
        .put(
          `http://127.0.0.1:5000/update_property/${currentId}`,
          {
            type,
            description,
            address,
            city,
            bedrooms,
            image_url,
            price,
          },
          { headers: { Authorization: "Bearer " + Cookies.get("token") } }
        )
        .then((res) => {
          console.log(res);
          setFetchStatus(true);
          navigate("/Dashboard/HouseRental");
        })
        .catch((error) => {
          alert(error);
        });

      setCurrentId(-1);
    }
  };

  // Handle Reset Password

  const [inputResetPassword, setInputResetPassword] = useState({
    current_password: "",
    new_password: "",
    new_confirm_password: "",
  });

  const handleChangeResetPassword = (event) => {
    let value = event.target.value;
    let name = event.target.name;

    setInputResetPassword({ ...inputResetPassword, [name]: value });
  };

  const handleResetPassword = (event) => {
    event.preventDefault();
    let { current_password, new_password, new_confirm_password } =
      inputResetPassword;
    axios
      .post(
        `http://127.0.0.1:5000/change_password`,
        {
          current_password,
          new_password,
          new_confirm_password,
        },
        { headers: { Authorization: "Bearer " + Cookies.get("token") } }
      )
      .then((res) => {
        navigate("/Dashboard");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  let state = {
    inputLogin,
    setInputLogin,
    inputRegistration,
    setInputRegistration,
    dataHouse,
    setdataHouse,
    fetchStatus,
    setFetchStatus,
    filterHouseType,
    setFilterHouseType,
    filterCity,
    setFilterCity,
    search,
    setSearch,
    filter,
    setFilter,
    input,
    setInput,
    currentId,
    setCurrentId,
    inputResetPassword,
    setInputResetPassword,
  };

  let handleFunction = {
    handleChangeLogin,
    handleLogin,
    handleChangeRegistration,
    handleRegistration,
    handleSearchInput,
    handleSearchSubmit,
    handleChangeFilter,
    handleFilterSubmit,
    handleDelete,
    handleEdit,
    handleInput,
    handleSubmit,
    handleChangeResetPassword,
    handleResetPassword,
  };
  return (
    <GlobalContext.Provider
      value={{
        state,
        handleFunction,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
