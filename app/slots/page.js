import Image from "next/image";
import Navbar2 from "@/components/Navbar2";

export default function Home() {
  return (
    <div>
      <Navbar2 />
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <h1 className="text-6xl font-bold">
            Select the slot you want to book
          </h1>
          <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
            <a
              href="/slots/gym"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Gym &rarr;</h3>
              <p className="mt-4 text-xl">Book a slot for the gym</p>
            </a>
            <a
              href="/slots/pool"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Badminton &rarr;</h3>
              <p className="mt-4 text-xl">
                Book a slot for the Badminton court
              </p>
            </a>
            <a
              href="/slots/tennis"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Pool &rarr;</h3>
              <p className="mt-4 text-xl">Book a slot for the pool table</p>
            </a>
            <a
              href="/slots/squash"
              className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">Squash &rarr;</h3>
              <p className="mt-4 text-xl">Book a slot for the squash court</p>
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
