"use client";

import {React, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PetCard from "@/Components/PetCard";
import { usePetContext } from "../../context/PetContext";

export default function UserPage({ params: paramsPromise }) {
  const router = useRouter();
  const { userFiles, idToName, createPet } = usePetContext();

  const [params, setParams] = useState(null);
  const [user, setUser] = useState(null);
  const [pets, setPets] = useState([]);
  const [newPetName, setNewPetName] = useState("");
  const [isAddingPet, setIsAddingPet] = useState(false);
  const [newPetIcon, setNewPetIcon] = useState("");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    paramsPromise.then((resolvedParams) => {
      setParams(resolvedParams);
    });
  }, [paramsPromise]);

  useEffect(() => {
    if (!params) return;
    const userId = params.userId;
    const currentUser = idToName[userId];
    setUser(currentUser);

    const userPets = userFiles[userId] || {};
    setPets(
      Object.keys(userPets).map((petName) => ({
        id: petName,
        ...userPets[petName],
      }))
    );
  }, [params, userFiles, idToName]);

  const validatePetName = (name) => {
    const lowercasedName = name.toLowerCase();
    if (!name.trim()) {
      return "Pet name cannot be empty";
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
      return "Pet name can only contain letters";
    }
    if (
      params &&
      userFiles[params.userId] &&
      Object.keys(userFiles[params.userId])
        .map((existingName) => existingName.toLowerCase())
        .includes(lowercasedName)
    ) {
      return "You already have a pet with this name. Please choose a different name.";
    }

    return "";
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setNewPetName(name);
    setNameError(validatePetName(name));
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    createPet(newPetName, params.userId, newPetIcon);
    setNewPetName("");
    setIsAddingPet(false);
    setNewPetIcon("");
  };


  const handlePetCardClick = (petId) => {
    router.push(`/user/${params.userId}/pet/${petId}`);
  };

  if (!params || !user) {
    return (
      <div
        className="min-h-screen bg-gray-100 flex items-center justify-center"
        role="main"
      >
        <div className="text-xl" role="status" aria-live="polite">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100" role="main">
      <div className="p-4">
        <button
          className="h-100 w-200 bg-darkblue text-white hover:scale-110 cursor-pointer px-4 rounded"
          onClick={() => router.push("/")}
          aria-label="Go to Home page"
        >
          Home
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1
          className="text-3xl text-darkblue font-bold mb-8 text-center"
          id="user-pets-heading"
        >
          {user}&apos;s Pets
        </h1>

        {!isAddingPet ? (
          <button
            onClick={() => setIsAddingPet(true)}
            className="mb-8 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            aria-expanded={isAddingPet}
            aria-controls="add-pet-form"
          >
            Add New Pet
          </button>
        ) : (
          <form
            onSubmit={handleAddPet}
            className="mb-8 space-y-4"
            id="add-pet-form"
            aria-labelledby="add-pet-heading"
          >
            <h2 id="add-pet-heading" className="sr-only">
              Add a New Pet
            </h2>

            <div>
              <label
                htmlFor="petName"
                className="block text-sm font-medium text-darkblue"
              >
                Pet Name (letters only)
              </label>
              <input
                type="text"
                id="petName"
                value={newPetName}
                onChange={handleNameChange}
                aria-required="true"
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "pet-name-error" : undefined}

                className={`mt-1 block w-full text-darkblue rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                  nameError ? "border-red-500" : "border-gray-300"
                }`}
                required
              />
              {nameError && (
                <p
                  id="pet-name-error"
                  className="mt-1 text-sm text-red-600"
                  role="alert"
                >
                  {nameError}
                </p>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-darkblue">
                Choose a Pet Icon
              </p>
              <div className="mt-4 grid grid-cols-4 gap-4">
                {["angry_cat.gif", "bunny.gif", "dog.gif", "lovey_cat.gif"].map(
                  (gif, index) => (
                    <div
                      key={index}
                      className={`border-2 rounded-md p-2 cursor-pointer ${
                        newPetIcon === gif
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setNewPetIcon(gif)}
                      role="button"
                      tabIndex="0"
                      aria-pressed={newPetIcon === gif}
                      aria-label={`Select pet icon ${index + 1}`}
                    >
                      <img
                        src={`/gifs/${gif}`}
                        alt={`Pet Icon ${index + 1}`}
                        className="w-full h-auto"
                      />
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="space-x-4">
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                disabled={!!nameError || !newPetName || !newPetIcon}
                aria-disabled={!!nameError || !newPetName || !newPetIcon}
              >
                Save Pet
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingPet(false);
                  setNameError("");
                  setNewPetName("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                aria-label="Cancel adding a new pet"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          aria-labelledby="user-pets-heading"
        >
          {pets.map((pet) => {
            const petImg = userFiles[params.userId]?.[pet.id]?.img;

            return petImg ? (
              <PetCard
                key={pet.id}
                pet={pet.id}
                userid={params.userId}
                img={petImg}
                onClick={handlePetCardClick}
                aria-label={`View details for pet ${pet.id}`}
              />
            ) : null;
          })}

        </div>

        {pets.length === 0 && (
          <div
            className="text-center text-darkblue mt-8"
            role="alert"
            aria-live="polite"
          >
            No pets added yet. Click &quot;Add New Pet&quot; to get started!
          </div>
        )}
      </div>
    </div>
  );
}
