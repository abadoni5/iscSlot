import Image from "next/image";
import Navbar from "@/components/Navbar";
import Inventory from "@/components/inventory";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Inventory />
    </div>
  );
}
