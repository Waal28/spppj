import React from "react";
import { Link } from "react-router-dom";

export default function CardLocation({ lokasi }) {
  return (
    <main className="w-full mx-auto p-8 bg-white max-w-sm rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition duration-300">
      <iframe
        src={lokasi.embed}
        title="Lontong"
        className="rounded-xl mx-auto w-full"
        loading="lazy"
      ></iframe>
      <div className="grid lg:grid-cols-1 grid-cols-2 gap-4 mt-5 mx-auto">
        <div className="">
          <h1 className="text-sm font-semibold">{lokasi.nama}</h1>
          <p className="mt-2 text-xs">{lokasi.harga}</p>
        </div>
        <div className="flex justify-end items-end">
          <Link
            to={lokasi.link}
            className="btn btn-sm capitalize text-white font-semibold bg-green-400 rounded-lg shadow-md hover:shadow-lg transition duration-500 transform-gpu hover:scale-110 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="fill-current w-4 h-4"
              viewBox="0 0 24 24"
            >
              <path d="M12 12q.825 0 1.413-.588T14 10q0-.825-.588-1.413T12 8q-.825 0-1.413.588T10 10q0 .825.588 1.413T12 12Zm0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2q3.175 0 5.588 2.225T20 10.2q0 2.5-1.988 5.438T12 22Z" />
            </svg>
            Lokasi
          </Link>
        </div>
      </div>
    </main>
  );
}
