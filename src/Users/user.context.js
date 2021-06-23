import React, { createContext, useContext, useState } from "react";
import { storeUser, listAllUser } from "./user.service";

const UserContext = createContext();

function UserContextProvider(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    setLoading(true);
    const newUsers = await listAllUser();
    setUsers(newUsers);
    setLoading(false);
  };
  const createUser = async (user) => {
    setLoading(true);

    const tempUser = {
      ...user,
      id: "temporary_id",
      created_at: Date.now(),
    };

    setUsers([...users, tempUser]); // Immediately Update list

    try {
      const newUser = await storeUser(user);
      setUsers([...users, newUser]);
    } catch (error) {}

    setLoading(false);
  };

  const contextValue = {
    users,
    loading,
    getUsers,
    createUser,
  };

  return <UserContext.Provider value={contextValue} {...props} />;
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
