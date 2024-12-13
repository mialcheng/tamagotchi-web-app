"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const PetContext = createContext();

export const usePetContext = () => useContext(PetContext);

export const PetProvider = ({ children }) => {
  const [userFiles, setUserFiles] = useState({}); // create local state containing all the users and their pets (each key for a different recipe)
  const [idToName, setIdToName] = useState({});


  useEffect(() => { 
    if (localStorage.getItem("users")) {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || {};
      const storedIds = JSON.parse(localStorage.getItem("ids")) || {};
      setUserFiles(storedUsers);
      setIdToName(storedIds);
    }
  }, []);

  useEffect(() => {

    localStorage.setItem('users', JSON.stringify(userFiles));
    localStorage.setItem('ids', JSON.stringify(idToName));
  }, [userFiles, idToName]); // triggers effect only when userFiles or idToName changes

  const createPet = (petName, userId, img) => {
    const temp = { ...userFiles };
    if (!temp[userId]) {
      temp[userId] = {};
    }
    temp[userId][petName] = {
      img: img,
      hunger: 30,
      happiness: 90,
      energy: 90,
      growth_stage: 20,
      interaction: 0,
    };

    setUserFiles(temp);
    // localStorage.setItem("users", JSON.stringify(userFiles)); // save updated info to local storage
  };

  const createUser = (username) => {
    const newId = Date.now();
    setIdToName((prev) => {
      const updatedIdToName = { ...prev, [newId]: username };
      // localStorage.setItem("ids", JSON.stringify(updatedIdToName));
      return updatedIdToName;
    });

    setUserFiles((prev) => {
      const updatedUserFiles = { ...prev, [newId]: {} };
      // localStorage.setItem("users", JSON.stringify(updatedUserFiles));
      return updatedUserFiles;
    });
  };

  const updatePet = (petName, userId, attribute, newValue, source = "system") => {
    const temp = { ...userFiles };
    if (!temp[userId]) {
      console.error(`User ${userId} not found`);
      return;
    }
    if (!temp[userId][petName]) {
      console.error(`Pet ${petName} not found for user ${userId}`);
      return;
    }

    const temp2 = temp[userId][petName];

    if (newValue !== temp2[attribute]) {
      temp2[attribute] = newValue;

      if (source === "user" && newValue < 100) {
        temp2["interaction"] += 1;

        if (temp2['interaction']%10 === 0){
          temp2['growth_stage'] += 10;
        }
      }
    }
    setUserFiles(temp);
    // localStorage.setItem("users", JSON.stringify(userFiles)); // save updated info to local storage
  };

  const deleteUser = (username) => {
    const userid = Object.keys(userFiles).find(
      (key) => idToName[key] === username
    );

    const temp = { ...userFiles };
    delete temp[userid];

    const temp2 = { ...idToName };
    delete temp2[userid];
    setUserFiles(temp);
    setIdToName(temp2);

    // localStorage.setItem("users", JSON.stringify(userFiles));
    // localStorage.setItem("ids", JSON.stringify(idToName));
  };

  const deletePet = (petName, userId) => {
    const temp = { ...userFiles };
    if (temp[userId] && temp[userId][petName]) {
      delete temp[userId][petName];
      setUserFiles(temp);
      // localStorage.setItem("users", JSON.stringify(temp));
    }
  };

  return (
    <PetContext.Provider
      value={{
        userFiles,
        idToName,
        createPet,
        createUser,
        updatePet,
        deleteUser,
        deletePet,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};
