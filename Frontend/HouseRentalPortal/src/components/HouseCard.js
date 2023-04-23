import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";
const RentCard = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const {
    dataHouse,
    setDataHouse,
    fetchStatus,
    setFetchStatus,
    filterHouseType,
    setFilterHouseType,
    filterCity,
    setFilterCity,
    search,
  } = state;

  const {
    handleSearchInput,
    handleSearchSubmit,
    handleChangeFilter,
    handleFilterSubmit,
  } = handleFunction;

  useEffect(() => {
    let removeDuplicatehouseType = (param) => {
      let tmp = [];

      for (let i of param) {
        if (tmp.indexOf(i.Rent_type) === -1) {
          tmp.push(i.Rent_type);
        }
      }

      return tmp;
    };
    let insertFilterHouseType = (param) => {
      let tmp = [];
      param.map((res) => {
        tmp.push({ Rent_type: res.Rent_type });
      });
      return tmp;
    };

    let removeDuplicateCity = (param) => {
      let tmp = [];

      for (let i of param) {
        if (tmp.indexOf(i.city) === -1) {
          tmp.push(i.city);
        }
      }

      return tmp;
    };
    let insertfilterCity = (param) => {
      let tmp = [];
      param.map((res) => {
        tmp.push({ city: res.city });
      });
      return tmp;
    };

    if (fetchStatus) {
      axios
        .get("http://127.0.0.1:5000/properties", {headers:{
          Authorization: Cookies.get("token")
        }})
        .then((res) => {
          console.log(res.data.properties);
          setDataHouse(res.data.properties);
          let data = res.data.properties;
          let temp1 = insertFilterHouseType(data);
          let temp2 = removeDuplicatehouseType(temp1);
          setFilterHouseType(temp2);
          temp1 = insertfilterCity(data);
          temp2 = removeDuplicateCity(temp1);
          setFilterCity(temp2);
    
        });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <section className="bg-white dark:bg-[#272043] bg-[#272043] p-16">
      {/* Search Data */}
      <form onSubmit={handleSearchSubmit}>
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            onChange={handleSearchInput}
            value={search}
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search House location, details..."
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-[#3b82f6] hover:bg-[#11275B] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#3b82f6] dark:hover:bg-[#d7180e] dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter DAta */}
      <form className="text-left my-4 space-y-4" onSubmit={handleFilterSubmit}>
        <div>
          
          <select
            name="House_type"
            id="House_type"
            onChange={handleChangeFilter}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="houseType">House Type...</option>
            {filterHouseType !== null && (
              <>
                {filterHouseType.map((res) => {
                  return (
                    <>
                      <option defaultValue={`${res}`}>{res}</option>
                    </>
                  );
                })}
              </>
            )}
          </select>
        </div>

        <div>
          
          <select
            name="city"
            id="city"
            onChange={handleChangeFilter}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="houseArea">House Area...</option>
            {filterCity !== null && (
              <>
                {filterCity.map((res) => {
                  return (
                    <>
                      <option defaultValue={`${res}`}>{res}</option>
                    </>
                  );
                })}
              </>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="w-20 p-3 mt-5 text-white bg-[#3b82f6] hover:bg-[#11275B] rounded-lg "
        >
          Filter
        </button>
      </form>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6 ">
        <div className="grid gap-8 mb-6 lg:mb-16 sm:grid-cols-2">
          {dataHouse &&
            dataHouse.map((res) => {
              console.log(res);
              return (
                <Link
                  to={`/HouseRental/${res.id}`}
                  key={res.id}
                  className="flex flex-col items-center bg-white border rounded-lg shadow-md md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg "
                    src={res.Url}
                    alt=""
                  />
                  <div className="flex flex-col justify-between text-left p-4 leading-normal">
                    <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
                      {res.Type + " (" + res.city + ")"}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {res.address}
                    </p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      {"Bedroom : " +res.bedrooms + "," + " Price " + res.price}
                    </p>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default RentCard;
