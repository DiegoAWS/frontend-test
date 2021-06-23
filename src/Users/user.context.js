import React, { createContext, useContext, useState } from "react";
import { sortByCreateDate } from "../helpers/sortByCreateDate";
import { storeUser, listAllUser, deleteUser } from "./user.service";

const UserContext = createContext();

function UserContextProvider(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const storeUsers = (users) => {
    setUsers(sortByCreateDate(users));
  };
  const getUsers = async () => {
    const newUsers = await listAllUser();
    storeUsers(newUsers);
  };
  const createUser = async (user) => {
    setLoading(true);
    const savedUsers = [...users];
    const tempUser = {
      ...user,
      id: "temporary_id",
      created_at: Date.now(),
    };

    storeUsers([...users, tempUser]); // Immediately Update list

    try {
      const newUser = await storeUser(user);
      storeUsers([...users, newUser]);
    } catch (error) {
      storeUsers(savedUsers); // GetBack to original Users List
    }

    setLoading(false);
  };

  const removeUser = async (id) => {
    const savedUsers = [...users];
    const tempUsers = users.filter((item) => item.id !== id);
    storeUsers(tempUsers);
    try {
      console.log(id);
      const newUser = await deleteUser(id);
      console.log(newUser);
      // storeUsers([...users, newUser]);
    } catch (error) {
      storeUsers(savedUsers); //GetBack to original Users List
    }
  };
  const contextValue = {
    users,
    loading,
    getUsers,
    createUser,
    removeUser,
  };

  return <UserContext.Provider value={contextValue} {...props} />;
}

function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  const { users, loading, getUsers, createUser, removeUser } = context;

  return { users, loading, getUsers, createUser, removeUser };
}

export { UserContextProvider, useUserContext };
