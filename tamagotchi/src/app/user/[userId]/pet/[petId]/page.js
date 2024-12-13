"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsPanel from "@/Components/StatsPanel";
import PetIcon from "@/Components/PetIcon";
import { usePetContext } from "../../../../context/PetContext";

export default function PetPage({ params: paramsPromise }) {
  const router = useRouter();
  const { userFiles, updatePet } = usePetContext();
  const [params, setParams] = useState(null);
  const [pet, setPet] = useState(null);

  useEffect(() => {
    paramsPromise.then((resolvedParams) => {
      setParams(resolvedParams);
    });
  }, [paramsPromise]);

  useEffect(() => {
    if (!params) return;
    const { userId, petId } = params;

    const userPets = userFiles[userId];
    if (userPets && userPets[petId]) {
      setPet({
        name: petId,
        ...userPets[petId],
      });
    }
  }, [params, userFiles]);

  const handleStatUpdate = (attribute, value) => {
    if (!params || !pet) return;
    const { userId, petId } = params;

    updatePet(petId, userId, attribute, value);

    setPet((prev) => ({
      ...prev,
      [attribute]: value,
    }));
  };

  if (!params || !pet) {
    return (
      <div
        className="min-h-screen bg-gray-100 flex items-center justify-center"
        role="main"
        aria-labelledby="loading-message"
      >
        <div
          id="loading-message"
          className="text-xl"
          role="status"
          aria-live="polite"
        >
          Loading...
        </div>
      </div>
    );
  }
  const { userId } = params;

  return (
    <div className="min-h-screen bg-gray-100" role="main">
      <div className="p-4">
        <button
          className="h-100 w-200 bg-darkblue text-white hover:scale-110 cursor-pointer px-4 rounded"
          onClick={() => router.push(`/user/${userId}`)}
          aria-label={`Go back to ${userId}'s user page`}
        >
          Back
        </button>
      </div>

      <div
        className="max-w-4xl mx-auto flex flex-col items-center space-y-8"
        aria-labelledby="pet-name-heading"
      >
        <h1
          id="pet-name-heading"
          className="text-3xl text-darkblue font-bold"
          role="heading"
          aria-level="1"
        >
          {pet.name}
        </h1>

        <PetIcon
          petGif={`/gifs/${pet.img}`}
          petAlt={`Icon for pet ${pet.name}`}
          userId={userId}
          petName={pet.name}
          aria-label={`Display of pet ${pet.name}`}
        />
        <StatsPanel
          userId={userId}
          petName={pet.name}
          petStats={pet}
          onStatUpdate={handleStatUpdate}
          aria-label={`Stats panel for pet ${pet.name}`}
        />
      </div>
    </div>
  );
}
