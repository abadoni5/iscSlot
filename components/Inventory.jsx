"use client";
import React from "react";
import { useState } from "react";

const Inventory = (props) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    console.log("Inventory item toggled"); // Check if this log is displayed

    setIsActive(!isActive);
    props.onInventoryToggle(); // Use the correct prop name here
  };

  return (
    <button
      onClick={handleToggle}
      className={`bg-${isActive ? "lime-400" : "blue-500"} hover:bg-${
        isActive ? "blue-900" : "gray-100"
      } text-${
        isActive ? "-black" : "gray-200"
      } font-semibold py-2 px-4 border border-gray-100 rounded shadow p-10`}
    >
      {props.itemName}
    </button>
  );
};

export default Inventory;
