"use client";

import React from "react";
import Navbar2 from "@/components/Navbar2";
import "../gym/gym.css";
import Slot from "@/components/slot";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import react from "@heroicons/react";
import Link from "next/link";

const supabaseUrl = "https://uxklmuwfhfwrwfvtjszi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4a2xtdXdmaGZ3cndmdnRqc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3MjM4MDYsImV4cCI6MjAxNTI5OTgwNn0.jOSjVvG_40c-sDKi8wrL_aJQPGMf6M48pwB_NlqhlDU";

const supabase = createClient(supabaseUrl, supabaseKey);

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
    console.error("Error inserting booking:", error);
    // Log more details if available
    console.error("Supabase error details:", error.details);
  }
}

export default function Home() {
  const styling = {
    background: "#FEF7ED",
  };

  const [timeslots, setTimeslots] = useState([]);

  useEffect(() => {
    getTimeslots();
    // createBooking(userId, slotId, booking_time); // Move this outside useEffect if needed
    // issueInventory(userId, inventoryId, issued_time);
  }, []);

  async function getTimeslots() {
    try {
      const { data: timeslotsData, error: timeslotsError } = await supabase
        .from("timeslots")
        .select();
      const { data: slotsData, error: slotsError } = await supabase
        .from("slots")
        .select();

      if (timeslotsError || slotsError) {
        console.error(
          "Error fetching data:",
          timeslotsError?.message || slotsError?.message
        );
        return;
      }

      // Combine timeslotsData and slotsData based on slot_id
      const combinedData = timeslotsData.map((timeslot) => {
        const matchingSlot = slotsData.find(
          (slot) => slot.slot_id === timeslot.slot_id
        );
        return {
          ...timeslot,
          ...matchingSlot,
        };
      });

      setTimeslots(combinedData || []);
    } catch (error) {
      console.error("Error fetching Timeslots:", error.message);
    }
  }

  const userId = document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const [selectedSlotId, setSelectedSlotId] = useState(null);

  const handleSlotToggle = (slotId) => {
    setSelectedSlotId(slotId === selectedSlotId ? null : slotId);
  };

  const handleConfirm = async () => {
    console.log("Confirm Button Clicked!");
    console.log("User ID:", userId);
    console.log("Selected Slot ID:", selectedSlotId);
    if (selectedSlotId && userId) {
      const booking_time = new Date(); // replace with the actual start time

      try {
        // Insert booking record into the 'bookings' table
        await createBooking(userId, selectedSlotId, booking_time);
        console.log("Booking confirmed successfully!");
      } catch (error) {
        console.error("Error confirming booking:", error);
      }
    } else {
      console.error("User ID or selected slot ID is not available.");
    }
  };

  return (
    <div style={styling}>
      <Navbar2 />
      <div className="main">
        <div className="left">
          <h1 className="heading">Available Slots</h1>
          <p className="description">
            Press the button below to confirm your slot
          </p>
          <Link href="/booked">
            <button
              onClick={handleConfirm}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-12"
            >
              Confirm
            </button>
          </Link>
        </div>
        <div className="right">
          {timeslots
            .map((timeslot) => timeslot.day) // Extract unique days
            .filter((day, index, self) => self.indexOf(day) === index) // Filter unique days
            .map((day) => {
              const daySlots = timeslots.filter(
                (timeslot) => timeslot.day === day && timeslot.sport_id === 2
              );
              if (daySlots.length > 0) {
                return (
                  <React.Fragment key={day}>
                    <h1 className="heading">{day}</h1>
                    <div className="slots">
                      {daySlots.map((timeslot, index) => (
                        <Slot
                          key={index}
                          time1={timeslot.start_time}
                          time2={timeslot.end_time}
                          onSlotToggle={() =>
                            handleSlotToggle(timeslot.slot_id)
                          }
                          isActive={timeslot.slot_id === selectedSlotId}
                        />
                      ))}
                    </div>
                  </React.Fragment>
                );
              } else {
                return null; // Skip rendering if no slots for the day
              }
            })}
        </div>
      </div>
    </div>
  );
}
