"use client";

import React, { useEffect, useState } from "react";
import Navbar2 from "../../components/Navbar2";
import { createClient } from "@supabase/supabase-js";
import "./booked.css";
import { get } from "http";

const supabaseUrl = "https://uxklmuwfhfwrwfvtjszi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4a2xtdXdmaGZ3cndmdnRqc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3MjM4MDYsImV4cCI6MjAxNTI5OTgwNn0.jOSjVvG_40c-sDKi8wrL_aJQPGMf6M48pwB_NlqhlDU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default function Booked() {
  const [bookings, setBookings] = useState([]);
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    console.log("Fetching bookings...");
    getBookings();
    getInventory();
  }, []);

  async function getInventory() {
    try {
      const userId = document.cookie.replace(
        /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      ); // Replace with the actual user ID

      // Fetch inventory bookings for the user
      const { data: inventoryBookingsData } = await supabase
        .from("inventorybookings")
        .select()
        .eq("user_id", userId);

      // Extract inventory IDs from inventory bookings
      const inventoryIds = inventoryBookingsData.map(
        (inventoryBooking) => inventoryBooking.inventory_id
      );

      // Fetch details for the associated inventory items
      const { data: inventoryData } = await supabase
        .from("inventory")
        .select()
        .in("inventory_id", inventoryIds);

      // Combine data from both tables
      const combinedInventoryData = inventoryBookingsData.map(
        (inventoryBooking) => {
          const associatedInventory = inventoryData.find(
            (inventory) =>
              inventory.inventory_id === inventoryBooking.inventory_id
          );
          return {
            ...inventoryBooking,
            ...associatedInventory,
          };
        }
      );

      // Log or set the state with the combined data
      console.log("Combined Inventory Data:", combinedInventoryData);
      setInventory(combinedInventoryData); // uncomment if using state
    } catch (error) {
      console.error("Error fetching inventory:", error.message);
    }
  }

  async function getBookings() {
    try {
      const userId = document.cookie.replace(
        /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      ); // Replace with the actual user ID

      // Fetch bookings for the user
      const { data: bookingsData } = await supabase
        .from("bookings")
        .select()
        .eq("user_id", userId);

      // Extract slot IDs from the bookings data
      const slotIds = bookingsData.map((booking) => booking.slot_id);

      // Fetch slot information for the extracted slot IDs
      const { data: slotsData } = await supabase
        .from("timeslots")
        .select()
        .in("slot_id", slotIds);

      // Combine bookingsData and slotsData based on the slot_id
      const combinedData = bookingsData.map((booking) => {
        const matchingSlot = slotsData.find(
          (slot) => slot.slot_id === booking.slot_id
        );
        return {
          booking,
          slot: matchingSlot,
        };
      });

      setBookings(combinedData || []);
    } catch (error) {
      console.error("Error fetching bookings:", error.message);
      // Handle error (e.g., display an error message)
    }
  }
  const handleCancelBooking = async (bookingId) => {
    try {
      if (bookingId) {
        // Ensure that bookingId is not undefined before sending the request
        const { data, error } = await supabase
          .from("bookings")
          .delete()
          .eq("booking_id", bookingId);

        if (error) {
          console.error("Error canceling booking:", error.message);
        } else {
          console.log(`Booking ID ${bookingId} canceled successfully!`);
          // After canceling, refresh the bookings
          getBookings();
        }
      } else {
        console.error("Invalid booking ID");
      }
    } catch (error) {
      console.error("Error canceling booking:", error.message);
    }
  };

  const handleReturnEquipment = async (inventoryId) => {
    try {
      // Delete the inventory booking from the 'inventorybookings' table
      const { error: inventoryBookingError } = await supabase
        .from("inventorybookings")
        .delete()
        .eq("booking_id", inventoryId);

      if (inventoryBookingError) {
        console.error(
          "Error returning equipment:",
          inventoryBookingError.message
        );
      } else {
        console.log("Equipment returned successfully!");
        // Fetch updated bookings after returning equipment
        getInventory();
      }
    } catch (error) {
      console.error("Error returning equipment:", error.message);
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-flexstart w-full flex-1 px-20 text-center mt-20">
          <h1 className="text-4xl font-bold mb-8">My Bookings</h1>
          <div className="bookings-container">
            {bookings.map((booking) => (
              <div
                key={booking.booking.booking_id}
                className="booking-item bg-white p-4 mb-4 rounded-md shadow-md"
              >
                <p className="text-xl">
                  Booking ID: {booking.booking.booking_id}
                </p>
                <p>Slot Start Time: {booking.slot.start_time}</p>
                <p>Slot End Time: {booking.slot.end_time}</p>
                <p>Slot Day: {booking.slot.day}</p>
                <button
                  onClick={() =>
                    handleCancelBooking(booking.booking.booking_id)
                  }
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Cancel Booking
                </button>
              </div>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-8 mt-20">My Inventory</h1>
          <div className="bookings-container">
            {inventory.map((booking) => (
              <div className="booking-item bg-white p-4 mb-4 rounded-md shadow-md">
                <p className="text-xl"> {booking.equipment_name}</p>

                {/* <button
                  onClick={() => handleReturnEquipment(booking.booking_id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Return equipment
                </button> */}
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
