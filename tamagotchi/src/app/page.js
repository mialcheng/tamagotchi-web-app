"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePetContext } from "./context/PetContext";

export default function Home() {
  const router = useRouter();
  const { idToName } = usePetContext();

  const handleLoginClick = () => {
    router.push("/loginPage");
  };

  const handleCreateAccountClick = () => {
    router.push("/createAccount");
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-gray-100"
      role="main"
    >
      <h1
        className="text-4xl font-bold text-center mb-6 text-darkblue"
        role="heading"
        aria-level="1"
      >
        Welcome to Our Site
      </h1>
      <div className="space-x-4" role="group" aria-label="User actions">
        <button
          className="px-6 py-2 bg-periwinkle text-white rounded hover:scale-110"
          onClick={handleCreateAccountClick}
          aria-label="Create a new user account"
        >
          Create User
        </button>
        <button
          className="px-6 py-2 bg-lightblue text-white rounded hover:scale-110"
          onClick={handleLoginClick}
          aria-label="Log in to your account"
        >
          Login
        </button>
      </div>

      {/* <PetIcon aria-label="Pet icon" /> */}

      {/* Test panel component */}
      {/* <div className="w-full max-w-md">
        <StatsPanel />
      </div> */}

      {/* <PetCard aria-label="Pet card details" /> */}
    </div>
  );
}
