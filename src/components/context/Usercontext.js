/** @format */

import React from "react";
import { useState } from "react";

export const Usercontextobj = React.createContext();

export const Usercontext = ({ children }) => {
  const [selUser, setSelUser] = useState("");

  return (
    <Usercontextobj.Provider
      value={{
        val: selUser,
        setValue: setSelUser,
      }}>
      {children}
    </Usercontextobj.Provider>
  );
};
