import React from "react";

export const UserContext = React.createContext({
  loggedUser: null,
  fetchUser: () => {},
});