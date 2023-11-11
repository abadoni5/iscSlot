import Image from "next/image";
import Navbar2 from "../../components/Navbar2";
import "./booked.css";

export default function Home() {
  const styling = {
    background: "#FEF7ED",
    height: "100vh",
  };
  return (
    <div style={styling}>
      <Navbar2 />
      <div className="maindiv">
        <div className="flex flex-col items-center justify-center py-2">
          <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
            <h1 className="text-6xl font-bold mb-20">
              Your slot has been booked
            </h1>
            <a
              href="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Home
            </a>
          </main>
        </div>
      </div>
    </div>
  );
}
