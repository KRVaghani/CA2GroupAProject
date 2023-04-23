import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "flowbite-react";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";
import Cookies from 'js-cookie';
const Tables = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const {
    dataHouse,
    setDataHouse,
    fetchStatus,
    setFetchStatus,
    filterHouseType,
    setfilterHouseType,
    filterCity,
    setFilterCity,
    search,
  } = state;

  const {
    handleSearchInput,
    handleSearchSubmit,
    handleChangeFilter,
    handleFilterSubmit,
    handleDelete,
    handleEdit,
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
    let insertfilterHouseType = (param) => {
      let tmp = [];
      param.map((res) => {
        tmp.push({ Rent_type: res.Rent_type });
      });
      return tmp;
    };

    let removeDuplicateRentCategory = (param) => {
      let tmp = [];

      for (let i of param) {
        if (tmp.indexOf(i.Rent_category) === -1) {
          tmp.push(i.Rent_category);
        }
      }

      return tmp;
    };
    let insertFilterStateRentCategory = (param) => {
      let tmp = [];
      param.map((res) => {
        tmp.push({ Rent_category: res.Rent_category });
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
        .get("http://127.0.0.1:5000/my_properties", {headers: {
          Authorization: Cookies.get("token")
        }})
        .then((res) => {
          console.log("kaushik");
          setDataHouse(res.data.properties);
          
          let data = res.data.properties;
          let temp1 = insertfilterHouseType(data);
          let temp2 = removeDuplicatehouseType(temp1);
          setfilterHouseType(temp2);
          temp1 = insertfilterCity(data);
          temp2 = removeDuplicateCity(temp1);
          setFilterCity(temp2);
        });
      setFetchStatus(false);
    }
  }, [fetchStatus, setFetchStatus]);

  return (
    <div className="relative overflow-x-auto w-100% m-10">
      {/* Search Data */}
      <form className="m-5" onSubmit={handleSearchSubmit}>
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
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      {/* Filter DAta */}
      <form className="m-5 text-left" onSubmit={handleFilterSubmit}>
        <div>
          <label
            htmlFor="House_type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          </label>
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
                      <option defaultValue={`${res[2]}`}>{res[2]}</option>
                    </>
                  );
                })}
              </>
            )}
          </select>
        </div>
        <div>
          <label
            htmlFor="House_type"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
          </label>
          <select
            name="city"
            id="city"
            onChange={handleChangeFilter}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="houseType">House Area...</option>
            {filterCity !== null && (
              <>
                {filterCity.map((res) => {
                  return (
                    <>
                      <option defaultValue={`${res[3]}`}>{res[3]}</option>
                    </>
                  );
                })}
              </>
            )}
          </select>
        </div>

        <button
          type="submit"
          className="w-20 p-3 m-5 text-white bg-red-600 rounded-lg "
        >
          Filter
        </button>

        {fetchStatus === true ? <button
          type="submit"
          className="w-20 p-3 m-5 text-white bg-blue-600 rounded-lg "
        >
          Clear
        </button> : null }
        
      </form>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border-solid border-2 border-gray-50">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
          <th scope="col" className="px-2 py-3">
            Image URL
            </th>
            <th scope="col" className="px-2 py-3">
              Type
            </th>
            <th scope="col" className="px-2 py-3">
            Description
            </th>
            <th scope="col" className="px-2 py-3">
            Address
            </th>
            <th scope="col" className="px-2 py-3">
            City
            </th>
            <th scope="col" className="px-2 py-3">
            Bedrooms
            </th>
           
            <th scope="col" className="px-2 py-3">
            Price
            </th>
            <th scope="col" className="px-2 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {dataHouse &&
            dataHouse.map((res, index) => {
              return (
                <tr
                  key={res.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  {/* <td className="px-2 py-4">{res.Url? res.Url.substr(0,10) + "...": ""}</td> */}
                  <td className="px-2 py-4">{res.Url?    <img
                      className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg "
                      src={res.Url}
                      alt=""
                    />: ""}</td>

                  <td className="px-2 py-4">{res.Type}</td>
                  <td className="px-2 py-4">{res.description}</td>
                  <td className="px-2 py-4">
                    {res.address}
                  </td>
                  <td className="px-2 py-4">
                    {res.city}
                  </td>
                  <td className="px-2 py-4">{res.bedrooms}</td>
                  
                  <td className="px-2 py-4">{res.price}</td>
                  
                  <td className="px-2 py-4">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        color="warning"
                        value={res.id}
                        onClick={handleEdit}
                      >
                        Edit
                      </Button>
                      <Button
                        color="failure"
                        value={res.id}
                        onClick={handleDelete}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Tables;
