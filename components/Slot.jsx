import React from "react";

import { useState, useEffect } from "react";

async function createBooking(userId, slotId, booking_time) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert([
        {
          user_id: userId,
          slot_id: slotId,
          booking_time: booking_time.toISOString(),
        },
      ])
      .select();

    if (error) {
      console.log(error);
    }
    console.log("Booking created:", data);
  } catch (error) {
    console.error("Error creating booking:", error);
  }
}

const Slot = (props) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    console.log("Slot toggled"); // Check if this log is displayed
    
    setIsActive(!isActive);
    props.onSlotToggle();
  };

  return (
    <div>
      <button
        onClick={handleToggle}
        className={`bg-${isActive ? "blue-500" : "white"} hover:bg-${
          isActive ? "blue-900" : "gray-100"
        } text-gray-800 font-semibold py-2 px-4 border border-gray-100 rounded shadow p-10`}
      >
        {props.time1} - {props.time2}
      </button>
    </div>
  );
};

export default Slot;
