import Image from "next/image";
import Navbar2 from "../../components/Navbar2";

export default function Home() {
  return (
    <div>
      <Navbar2 />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">Available Inventory</h1>
        </main>
      </div>
    </div>
  );
}
