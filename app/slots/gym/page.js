import React from "react";
import Navbar2 from "../../../components/Navbar2";
import "../gym/gym.css";
import Slot from "@/components/slot";

export default function Home() {
  const styling = {
    background: "#FEF7ED",
  };
  return (
    <div style={styling}>
      <Navbar2 />
      <div className="main">
        <div className="left">
          <h1 className="heading">Slots</h1>
          <p className="description">Lorem Ipsum dolor sit</p>
        </div>
        <div className="right">
          <h1 className="heading">Monday</h1>
          <div className="slots">
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            <Slot />
          </div>
          <h1 className="heading">Monday</h1>
          <div className="slots">
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            <Slot />
          </div>
          <h1 className="heading">Monday</h1>
          <div className="slots">
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            <Slot />
          </div>
          <h1 className="heading">Monday</h1>
          <div className="slots">
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            <Slot />
            <Slot />
          </div>
        </div>
      </div>
    </div>
  );
}
