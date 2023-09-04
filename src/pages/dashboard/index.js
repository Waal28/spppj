import React from "react";
import ParentComp from "../../components/ParentComp";

export default function Dashboard() {
  const pjSarapan = ["iwal", "ferdi"];
  const pjMakanSiang = ["agung", "maul"];
  return (
    <ParentComp>
      <h1 className="text-center font-serif text-2xl">
        Penanggung Jawab Hari ini
      </h1>
      <hr className="lg:w-1/4 w-1/2 h-1 mx-auto bg-gray-400 border-0 rounded my-3" />
      <div className="mx-auto lg:w-1/2 md:w-1/2 w-full grid grid-cols-2 mt-8">
        <div>
          <p className="text-lg text-center p-2 bg-gray-300 font-bold border-b border-e">
            Sarapan
          </p>
          <ul>
            {pjSarapan.map((pj) => (
              <li key={pj} className="text-center p-2 border-b border-e">
                {pj}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-lg text-center p-2 bg-gray-300 font-bold border-b border-s">
            Makan Siang
          </p>
          <ul>
            {pjMakanSiang.map((pj) => (
              <li key={pj} className="text-center p-2 border-b border-s">
                {pj}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ParentComp>
  );
}
