"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { usePetContext } from "../app/context/PetContext";

const PetCard = ({ pet, userid, img, onClick }) => {
  const router = useRouter();
  const { deletePet } = usePetContext();

  const handlePetCardClick = (e) => {
    onClick(pet);
  };

  const handleDeletePet = (e) => {

    e.stopPropagation(); 
    deletePet(pet, userid);
  };

  return (
    <div
      className="bg-white border rounded-lg p-4 shadow cursor-pointer hover:shadow-md transition-shadow relative"
      onClick={handlePetCardClick}
      role="button"
      tabIndex="0"
      aria-label={`View details for ${pet}`}
    >
      <button
        className="delete-button absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 z-10"
        onClick={handleDeletePet}

        aria-label={`Delete ${pet}`}
      >
        Delete
      </button>
      <h3
        className="text-xl text-darkblue font-semibold mb-2"
        id={`${pet}-title`}
      >
        {pet}
      </h3>
      <img
        src={`/gifs/${img}`}
        alt={`A visual representation of ${pet}`}
        aria-labelledby={`${pet}-title`}
      />

    </div>
  );
};

export default PetCard;
