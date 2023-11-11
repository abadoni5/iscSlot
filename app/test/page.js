import Image from "next/image";
import Navbar2 from "@/components/Navbar2";
import Inventory from "@/components/inventory";

export default function Home() {
  return (
    <div>
      <Navbar2 />
      <Inventory />
    </div>
  );
}
