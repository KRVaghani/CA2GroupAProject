import React, { useEffect } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";
const Form = () => {
  let { idData } = useParams();
  const { state, handleFunction } = useContext(GlobalContext);
  const { input, setInput, setCurrentId } = state;

  const { handleInput, handleSubmit } = handleFunction;

  useEffect(() => {
    console.log(idData);
    if (idData !== undefined) {
      setCurrentId(idData);
      axios
        .get(`http://127.0.0.1:5000/existing-property-endpoint/${idData}`)
        .then((res) => {
          console.log(res.data);
          let data = res.data;

          setInput({
            type: data.type,
            description: data.description,
            address: data.address,
            city: data.city,
            bedrooms: data.bedrooms,
            image_url: data.image_url,
            price: data.price,
          });
        });
    }
  }, []);

  return (
    <div className="md:container md:mx-auto p-12">
      <form className="flex flex-col gap-4 mt-6" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="type" value="Type :" />
          </div>
          <TextInput
            id="type"
            name="type"
            type="text"
            value={input.type}
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="house_description" value="Description :" />
          </div>
          <TextInput
            id="House_description"
            name="House_description"
            type="textarea"
            value={input.description}
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="address" value="Address :" />
          </div>
          <TextInput
            id="Address"
            name="Address"
            value={input.address}
            type="textarea"
            onChange={handleInput}
            required={true}
            
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="City" value="City :" />
          </div>
          <TextInput
            id="City"
            name="City"
            value={input.city}
            type="text"
            onChange={handleInput}
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="bedrooms" value="Bedrooms :" />
          </div>
          <TextInput
            id="Bedrooms"
            name="Bedrooms"
            value={input.Bedrooms}
            type="number"
            onChange={handleInput}
            required={true}
          />
        </div>
      
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="image_url" value="Image URL :" />
          </div>
          <TextInput
            id="Image_url"
            name="Image_url"
            value={input.image_url}
            type="text"
            onChange={handleInput}
            required={true}
          />
        </div>
    
        <div>
          <div className="mb-2 block text-left">
            <Label htmlFor="price" value="Price : " />
          </div>
          <TextInput
            id="Price"
            name="Price"
            value={input.price}
            type="number"
            onChange={handleInput}
            required={true}
          />
        </div>

        <Button className="w-32" type={"submit"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Form;
