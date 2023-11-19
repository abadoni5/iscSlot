import React, { useState } from "react";

const Inventory = (props) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
    props.onInventoryToggle();
    console.log("Inventory toggled");
  };

  return (
    <div className="mb-4">
      <button
        onClick={handleToggle}
        className={`${
          isActive
            ? "bg-amber-400 text-emerald-900 border-emerald-900"
            : "bg-emerald-900 text-amber-400 border-amber-400"
        } hover:${
          isActive
            ? "bg-amber-300 text-emerald-800 border-amber-300"
            : "bg-gray-100 text-amber-400 border-gray-100"
        } font-semibold py-3 px-6 border rounded-xl shadow transition-all duration-300 w-full`}
      >
        {props.itemName}
      </button>
    </div>
  );
};

export default Inventory;
