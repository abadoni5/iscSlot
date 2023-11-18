"use client";

import Image from "next/image";
import Navbar2 from "../../components/Navbar2";
import Inventory from "../../components/Inventory";
import "./inventory.css";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Cookies from "js-cookie";

import Link from "next/link";

const supabaseUrl = "https://uxklmuwfhfwrwfvtjszi.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4a2xtdXdmaGZ3cndmdnRqc3ppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk3MjM4MDYsImV4cCI6MjAxNTI5OTgwNn0.jOSjVvG_40c-sDKi8wrL_aJQPGMf6M48pwB_NlqhlDU";

const supabase = createClient(supabaseUrl, supabaseKey);

async function createInventory(userId, invID) {
  try {
    const { data, error } = await supabase
      .from("inventorybookings")
      .insert([
        {
          user_id: userId,
          inventory_id: invID,
        },
      ])
      .select();

    if (error) {
      console.log(error);
    }
    console.log("Inventory Issued:", data);
  } catch (error) {
    console.error("Error inserting booking:", error);
    // Log more details if available
    console.error("Supabase error details:", error.details);
  }
}

export default function Home() {
  

  const userId = document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
    '$1'
  );
  const [inventory, setInventory] = useState([]);

  //   const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user ID from the cookie using js-cookie
    // const userIdFromCookie = Cookies.get("user_id");
    // setUserId(userIdFromCookie);

    getInventory();
    // createInventory(userId, invID, booking_time); // Move this outside useEffect if needed
    // issueInventory(userId, inventoryId, issued_time);
  }, []);

  async function getInventory() {
    try {
      const { data } = await supabase.from("inventory").select();
      setInventory(data || []);
    } catch (error) {
      console.error("Error fetching Inventory:", error.message);
    }
  }
  const handleItemSelect = (itemName) => {
    // Handle the selection of the inventory item (e.g., update state, perform an action, etc.)
    console.log(`Selected item: ${itemName}`);
  };

  const [selectedInvId, setSelectedInvId] = useState(null);

  const handleSlotToggle = (invID) => {
    setSelectedInvId(invID === selectedInvId ? null : invID);
  };

  const handleConfirm = async () => {
    console.log("Confirm Button Clicked!");
    console.log("User ID:", userId);
    console.log("Selected Slot ID:", selectedInvId);
    if (selectedInvId && userId) {
      const booking_time = new Date(); // replace with the actual start time

      try {
        // Insert booking record into the 'bookings' table
        await createInventory(userId, selectedInvId, booking_time);
        console.log("Booking confirmed successfully!");
      
      } catch (error) {
        console.error("Error confirming booking:", error);
      }
    } else {
      console.error("User ID or selected slot ID is not available.");
    }
  };

  return (
    <div>
      <Navbar2 />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-flexstart w-full flex-1 px-20 text-center mt-40">
          <h1 className="text-6xl font-bold">Available Inventory</h1>
          <div className="inventory-container mt-40">
            {inventory.map((item) => (
              <Inventory
                itemName={item.equipment_name}
                onInventoryToggle={() => handleSlotToggle(item.inventory_id)}
                isActive={item.inventory_id === selectedInvId}
              />
            ))}
          </div>
          <div className="mt-200">
            <Link href="/booked">
              <button
                onClick={handleConfirm}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-48"
              >
                Confirm
              </button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
