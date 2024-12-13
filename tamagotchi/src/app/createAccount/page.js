"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { usePetContext } from "../context/PetContext";

export default function CreateAccount() {
  const [username, setUsername] = useState("");
  const [nameError, setNameError] = useState("");
  const { createUser, idToName } = usePetContext();

  const router = useRouter();

  const validateUsername = (name) => {
    const lowercasedName = name.toLowerCase();
    if (!name.trim()) {
      return "Username cannot be empty.";
    }
    if (!/^[a-zA-Z]+$/.test(name)) {
      return "Username can only contain letters.";
    }

    if (Object.values(idToName).map((u) => u.toLowerCase()).includes(lowercasedName)) {
      return "A user with this name already exists. Please choose a different name.";
    }
    return "";
  };

  const handleUsernameChange = (e) => {
    const name = e.target.value;
    setUsername(name);
    setNameError(validateUsername(name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      createUser(username);
      setUsername("");
      router.push("/");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      role="main"
    >
      <div
        className="bg-white p-8 rounded-lg shadow-md w-96"
        role="form"
        aria-labelledby="create-account-header"
      >
        <h1
          id="create-account-header"
          className="text-2xl text-darkblue font-bold mb-6 text-center"
        >
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            aria-required="true"
            aria-invalid={!!nameError}
            aria-describedby={nameError ? "username-error" : undefined}
            className={`mt-1 block w-full text-darkblue rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
              nameError ? "border-red-500" : "border-gray-300"
            }`}
            required
          />
          {nameError && (
            <p
              id="username-error"
              className="mt-1 text-sm text-red-600"
              role="alert"
            >
              {nameError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-darkblue text-white rounded-md py-2 px-2 hover:scale-110"
            disabled={!!nameError || !username}
            aria-disabled={!!nameError || !username}

          >
            Done
          </button>
          <button
              type="button"
              onClick={handleCancel}
              className=" w-full bg-lightblue text-white rounded-md py-2 px-2 hover:scale-110"
            >
              Cancel
            </button>
        </form>
      </div>
    </div>
  );
}
