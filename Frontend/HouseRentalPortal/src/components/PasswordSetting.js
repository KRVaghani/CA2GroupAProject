import React from "react";
import { TextInput, Label, Button } from "flowbite-react";

import { GlobalContext } from "../context/GlobalProvider";
import { useContext } from "react";
const PasswordSetting = () => {
  const { state, handleFunction } = useContext(GlobalContext);

  const { inputResetPassword } = state;

  const { handleChangeResetPassword, handleResetPassword } = handleFunction;

  return (
    <div className="min-h-screen">
      <div className="md:container md:mx-auto p-12">
        <form
          className="flex flex-col gap-4 mt-6"
          onSubmit={handleResetPassword}
        >
          <div>
            <div className="mb-2 block text-left">
              <Label htmlFor="current_password" value="Current Password :" />
            </div>
            <TextInput
              id="current_password"
              name="current_password"
              type="password"
              value={inputResetPassword.current_password}
              onChange={handleChangeResetPassword}
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block text-left">
              <Label htmlFor="new_password" value="New Password :" />
            </div>
            <TextInput
              id="new_password"
              name="new_password"
              type="password"
              value={inputResetPassword.new_password}
              onChange={handleChangeResetPassword}
              required={true}
            />
          </div>
          <div>
            <div className="mb-2 block text-left">
              <Label
                htmlFor="new_confirm_password"
                value="Confirm New Password :"
              />
            </div>
            <TextInput
              id="new_confirm_password"
              name="new_confirm_password"
              value={inputResetPassword.new_confirm_password}
              type="password"
              onChange={handleChangeResetPassword}
              required={true}
            />
          </div>
          <Button className="w-32" type={"submit"}>
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordSetting;
