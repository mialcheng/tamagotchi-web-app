"use client";
import React, { useState, useEffect } from "react";
import UserCard from "@/components/UserCard";
import { useRouter } from "next/navigation";
import { usePetContext } from "../context/PetContext";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { userFiles, deleteUser, idToName } = usePetContext();

  useEffect(() => {
    const users = Object.keys(userFiles);
    setIsLoading(false);
  }, [userFiles]);

  const handleDeleteUser = (userId) => {
    deleteUser(userId);
  };

  const handleCardClick = (userId) => {
    router.push(`/user/${userId}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100" role="main">
        <div className="p-4">
          <button
            className="h-8 w-8 text-gray-600 hover:text-gray-800 cursor-pointer"
            onClick={() => router.push("/")}
            aria-label="Go to Home page"
          >
            Home
          </button>
        </div>
        <div
          className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]"
          role="status"
          aria-live="polite"
        >
          <div className="text-xl">Loading...</div>
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
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <h1
          className="text-2xl text-darkblue font-bold mb-6"
          id="select-user-heading"
        >
          Select User
        </h1>
        <div
          className="space-y-4 w-96"
          role="region"
          aria-labelledby="select-user-heading"
        >
          {Object.keys(userFiles).length === 0 ? (
            <div
              className="text-center text-gray-500"
              role="alert"
              aria-live="polite"
            >
              No users found
            </div>
          ) : (
            Object.keys(userFiles).map((user) => (
              <UserCard
                key={user}
                user={user} // username
                onDelete={handleDeleteUser}
                onClick={handleCardClick}
                aria-label={`User card for ${idToName[user] || user}`}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
