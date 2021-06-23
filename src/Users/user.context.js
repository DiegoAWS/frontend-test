import React, { createContext, useContext, useState } from "react";
import { storeUser, listAllUser,deleteUser } from "./user.service";

const UserContext = createContext();

function UserContextProvider(props) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUsers = async () => {
    const newUsers = await listAllUser();
    setUsers(newUsers);

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

  const removeUser= async(id)=>{
    const savedUsers=[...users]
    const tempUsers=users.filter(item=>item.id!==id)
    setUsers(tempUsers)
    try {
      console.log(id)
      const newUser = await deleteUser(id);
      console.log(newUser)
      // setUsers([...users, newUser]);
    } catch (error) {
      setUsers(savedUsers)
    }

  }
  const contextValue = {
    users,
    loading,
    getUsers,
    createUser,
    removeUser
  };

  return <UserContext.Provider value={contextValue} {...props} />;
}

function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  const { users, loading, getUsers, createUser , removeUser} = context;

  return { users, loading, getUsers, createUser , removeUser};
}

export { UserContextProvider, useUserContext };
