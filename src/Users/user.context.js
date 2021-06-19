import React, { createContext, useContext, useState } from "react";
import { createUser, listAllUser } from "./user.service";

const UserContext = createContext();

function UserContextProvider(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const contextValue = {
    users,
    loading,
    getUsers: async () => {
      setLoading(true);
      const newUsers = await listAllUser();
      setUsers(newUsers);
      setLoading(false);
    },
    createUser: async (user) => {
      setLoading(true);
      const newUser = await createUser(user);
      setUsers([...users, newUser]);
      setLoading(false);
    },
  };

  return <UserContext.Provider value={contextValue} {...props}/>;
}

function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  const { users, loading, getUsers, createUser } = context;

  return { users, loading, getUsers, createUser };
}

export { UserContextProvider, useUserContext };
