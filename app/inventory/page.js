"use client";
import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/Navbar2";
import Inventory from "../../components/Inventory";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

import "tailwindcss/tailwind.css";

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
    console.error("Error issuing inventory:", error);
    console.error("Supabase error details:", error.details);
  }
}

export default function Home() {
  const userId = document.cookie.replace(
    /(?:(?:^|.*;\s*)userId\s*=\s*([^;]*).*$)|^.*$/,
    "$1"
  );
  const [inventory, setInventory] = useState([]);
  const [selectedInvId, setSelectedInvId] = useState(null);

  useEffect(() => {
    getInventory();
  }, []);

  async function getInventory() {
    try {
      const { data } = await supabase.from("inventory").select();
      setInventory(data || []);
    } catch (error) {
      console.error("Error fetching Inventory:", error.message);
    }
  }

  const handleSlotToggle = (invID) => {
    setSelectedInvId((prevSelectedInvId) =>
      prevSelectedInvId === invID ? null : invID
    );
  };

  const handleConfirm = async () => {
    console.log("Confirm Button Clicked!");
    console.log("User ID:", userId);
    console.log("Selected Inventory ID:", selectedInvId);
    if (selectedInvId && userId) {
      try {
        await createInventory(userId, selectedInvId);
        console.log("Inventory confirmed successfully!");
      } catch (error) {
        console.error("Error confirming inventory:", error);
      }
    } else {
      console.error("User ID or selected inventory ID is not available.");
    }
  };
  const styling = {
    background: "#FEF7ED",
    height: "100vh",
  };
  return (
    <div style={styling}>
      <Navbar2 />
      <div className="flex flex-col items-center justify-center mt-16 py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center mt-10">
          <h1 className="text-6xl font-bold text-zinc-700 mb-6">
            Available Inventory
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {inventory.map((item) => (
              <Inventory
                key={item.inventory_id}
                itemName={item.equipment_name}
                onInventoryToggle={() => handleSlotToggle(item.inventory_id)}
                isActive={item.inventory_id === selectedInvId}
                className="p-6 bg-emerald-900 text-amber-400 rounded-lg hover:bg-emerald-700 hover:text-white transition-all duration-300"
              />
            ))}
          </div>
          <div className="mt-6">
            <a href="/booked">
              <button
                onClick={handleConfirm}
                className="bg-emerald-900 hover:bg-emerald-700 text-amber-400 font-bold py-3 px-6 rounded-lg mt-6 flex items-center space-x-2 transition-all duration-300"
              >
                Confirm &nbsp;
                <i className="fas fa-check"></i>
              </button>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
