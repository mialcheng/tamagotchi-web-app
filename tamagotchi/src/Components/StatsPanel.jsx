"use client";
import React, { useState, useEffect } from "react";
import { usePetContext } from "@/app/context/PetContext";
import Bar from "./BarTracker";

const StatsPanel = ({ userId, petName }) => {
  const { userFiles, updatePet } = usePetContext();

  const initialPet = userFiles[userId]?.[petName] || {
    hunger: 50,
    happiness: 50,
    energy: 50,
    growth_stage: 0,
  };

  const [pet, setPet] = useState(initialPet);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const currentPetData = userFiles[userId]?.[petName] || initialPet;
    setPet(currentPetData);
  }, [userFiles, userId, petName, initialPet]);

  useEffect(() => {
    const decreaseInterval = setInterval(() => {
      const newAlerts = [];
      const updatedPet = { ...pet };

      ["hunger", "happiness", "energy"].forEach((stat) => {
        updatedPet[stat] = Math.max(0, updatedPet[stat] - 1);

        if (updatedPet[stat] < 20) {
          const alertMessage = {
            hunger: `${petName} is hungry!`,
            happiness: `${petName} is sad!`,
            energy: `${petName} is tired!`,
          }[stat];
          if (!newAlerts.includes(alertMessage)) {
            newAlerts.push(alertMessage);
          }
        }
      });

      setPet(updatedPet);
      setAlerts(newAlerts);
      updatePet(petName, userId, "hunger", updatedPet.hunger);
      updatePet(petName, userId, "happiness", updatedPet.happiness);
      updatePet(petName, userId, "energy", updatedPet.energy);
    }, 1000);

    return () => {
      clearInterval(decreaseInterval);
    };
  }, [pet, petName, userId, updatePet]);

  useEffect(() => {
    const currentAlerts = [];
    ["hunger", "happiness", "energy"].forEach((stat) => {
      if (pet[stat] < 20) {
        const alertMessage = {
          hunger: `${petName} is hungry!`,
          happiness: `${petName} is sad!`,
          energy: `${petName} is tired!`,
        }[stat];
        currentAlerts.push(alertMessage);
      }
    });
    setAlerts(currentAlerts);
  }, [pet, petName]);

  const stats = [
    { label: "Hunger", value: pet.hunger, maxValue: 100, color: "#89CFF0" },
    {
      label: "Happiness",
      value: pet.happiness,
      maxValue: 100,
      color: "#FFD1DC",
    },
    { label: "Energy", value: pet.energy, maxValue: 100, color: "#8F99FB" },
    {
      label: "Growth Stage",
      value: pet.growth_stage,
      maxValue: 100,
      color: "#1D3461",
    },
  ];

  return (
    <div
      className="w-[300px] p-6 bg-[#F8F7FF] rounded-lg shadow-lg flex flex-col space-y-4"
      role="region"
      aria-labelledby="stats-panel-title"
    >
      <h2 id="stats-panel-title" className="text-lg font-bold text-darkblue">
        {petName}&apos;s Stats
      </h2>
      {stats.map((stat, index) => (
        <Bar
          key={index}
          label={stat.label}
          value={stat.value}
          maxValue={stat.maxValue}
          color={stat.color}
        />
      ))}
      {alerts.length > 0 && (
        <div className="mt-4 space-y-2">
          {alerts.map((alert, index) => (
            <div
              key={index}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative"
              role="alert"
              tabIndex="0"
            >
              {alert}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatsPanel;
