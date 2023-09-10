import React, { useEffect, useState } from "react";
import ParentComp from "../../components/ParentComp";
import ModalChangePJ from "../../components/ModalChangePJ";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export default function PenanggungJawab() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({
    name: "aaaaaa",
    posisi: "ddddd",
  });

  const [pjSarapan, setPjSarapan] = useState([
    { id: 1, name: <Loading /> },
    { id: 2, name: <Loading /> },
  ]);
  const [pjMakanSiang, setPjMakanSiang] = useState([
    { id: 1, name: <Loading /> },
    { id: 2, name: <Loading /> },
  ]);

  async function getDataPJ() {
    axios
      .get("https://blue-green-llama-robe.cyclic.app/user/getAllPJ", {
        headers: {
          Authorization: Cookies.get("user"),
        },
      })
      .then(function (res) {
        const pj = res.data.data;
        setPjSarapan(pj.sarapan);
        setPjMakanSiang(pj.siang);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
  }
  useEffect(() => {
    if (Cookies.get("user")) {
      setUser(jwtDecode(Cookies.get("user")));
    }
    getDataPJ();
  }, []);

  return (
    <ParentComp>
      <main className="lg:w-1/2 md:w-1/2 sm:w-3/4 w-full p-4 mx-auto">
        <h1 className="text-center font-serif text-xl">Penanggung Jawab</h1>
        <hr className="h-1 mx-auto bg-gray-400 border-0 rounded my-3" />
        <section className="mt-8">
          {isLoading ? (
            <div className="animate-pulse grid grid-cols-3 gap-4">
              <div className="w-full h-8 rounded-md col-span-2 bg-gray-300"></div>
              <div className="w-full h-8 rounded-md bg-gray-300"></div>
            </div>
          ) : (
            <div className="flex lg:justify-evenly justify-between items-center">
              <p className="text-sm me-3">Anda penanggung jawab hari ini</p>
              <label
                htmlFor="modal_change_pj"
                className="btn btn-sm capitalize"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="#888888"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M22 12c0 6-4.39 10-9.806 10C7.792 22 4.24 19.665 3 16m-1-4C2 6 6.39 2 11.806 2C16.209 2 19.76 4.335 21 8" />
                    <path d="m7 17l-4-1l-1 4M17 7l4 1l1-4" />
                  </g>
                </svg>
                Ganti
              </label>
            </div>
          )}
          <div className=" grid grid-cols-2 mt-8">
            <div>
              <p className="text-center text-xs p-2 bg-gray-300 font-bold border-b border-e">
                Sarapan
              </p>
              <ul className="capitalize">
                {pjSarapan.map((pj) => (
                  <li
                    key={pj.id}
                    className={
                      pj.name === user.name
                        ? "bg-green-200 text-center text-xs p-2 border-b border-s"
                        : "text-center text-xs p-2 border-b border-e"
                    }
                  >
                    {pj.name}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-center text-xs p-2 bg-gray-300 font-bold border-b border-s">
                Makan Siang
              </p>
              <ul className="capitalize">
                {pjMakanSiang.map((pj) => (
                  <li
                    key={pj.id}
                    className={
                      pj.name === user.name
                        ? "bg-green-200 text-center text-xs p-2 border-b border-s"
                        : "text-center text-xs p-2 border-b border-s"
                    }
                  >
                    {pj.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <ModalChangePJ />
    </ParentComp>
  );
}

const Loading = () => {
  return <span className="loading loading-spinner loading-xs"></span>;
};
