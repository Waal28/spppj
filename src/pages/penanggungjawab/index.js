import React, { useEffect, useState } from "react";
import ParentComp from "../../components/ParentComp";
import ModalChangePJ from "../../components/ModalChangePJ";
import axios from "axios";
import { useSelector } from "react-redux";

export default function PenanggungJawab() {
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.myReducer.user);
  const token = useSelector((state) => state.myReducer.token);

  const [pjSarapan, setPjSarapan] = useState([
    { id: 1, name: <Loading /> },
    { id: 2, name: <Loading /> },
    { id: 3, name: <Loading /> },
    { id: 4, name: <Loading /> },
  ]);
  const [pjMakanSiang, setPjMakanSiang] = useState([
    { id: 1, name: <Loading /> },
    { id: 2, name: <Loading /> },
    { id: 3, name: <Loading /> },
    { id: 4, name: <Loading /> },
  ]);

  async function getDataPJ() {
    axios
      .get("https://backendpj-5daf09e9c27c.herokuapp.com/user/getAllPJ", {
        headers: {
          Authorization: token,
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
    if (token) {
      getDataPJ();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <ParentComp>
      <main className="lg:w-1/2 md:w-1/2 sm:w-3/4 w-full p-4 mx-auto">
        <h1 className="text-center font-serif text-xl">Penanggung Jawab</h1>
        <hr className="h-1 mx-auto bg-primary border-0 rounded my-3" />
        <section className="mt-8">
          {isLoading ? (
            <div className="animate-pulse grid grid-cols-3 gap-4">
              <div className="w-full h-8 rounded-md col-span-2 bg-tertiary"></div>
              <div className="w-full h-8 rounded-md bg-tertiary"></div>
            </div>
          ) : (
            <div className="flex lg:justify-evenly justify-between items-center">
              <p className="text-sm me-3">Anda penanggung jawab hari ini</p>
              <label
                htmlFor="modal_change_pj"
                className="btn btn-sm capitalize bg-secondary text-tPrimary text-xs shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 fill-current"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="M21 12a9 9 0 0 0-9-9a9.75 9.75 0 0 0-6.74 2.74L3 8" />
                    <path d="M3 3v5h5m-5 4a9 9 0 0 0 9 9a9.75 9.75 0 0 0 6.74-2.74L21 16" />
                    <path d="M16 16h5v5" />
                  </g>
                </svg>
                Ganti
              </label>
            </div>
          )}
          <div className=" grid grid-cols-2 mt-8 shadow-lg rounded-lg">
            <div>
              <p className="text-center text-xs p-2 rounded-t-lg bg-kuarteneri font-bold border-b border-e">
                Sarapan
              </p>
              <ul className="capitalize">
                {pjSarapan.length < 1 ? (
                  <li className="capitalize text-center text-xs p-2 border-b border-e rounded-b-lg">
                    -
                  </li>
                ) : (
                  pjSarapan.map((pj) => (
                    <li
                      key={pj.id}
                      className={
                        pj.name === user.name
                          ? "bg-green-200 capitalize text-center text-xs p-2 border-b border-e rounded-b-lg"
                          : "capitalize text-center text-xs p-2 border-b border-e rounded-b-lg"
                      }
                    >
                      {pj.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
            <div>
              <p className="text-center text-xs p-2 rounded-t-lg bg-kuarteneri font-bold border-b border-e">
                Makan Siang
              </p>
              <ul className="capitalize">
                {pjMakanSiang.length < 1 ? (
                  <li className="capitalize text-center text-xs p-2 border-b border-e rounded-b-lg">
                    -
                  </li>
                ) : (
                  pjMakanSiang.map((pj) => (
                    <li
                      key={pj.id}
                      className={
                        pj.name === user.name
                          ? "bg-green-200 capitalize text-center text-xs p-2 border-b border-e rounded-b-lg"
                          : "capitalize text-center text-xs p-2 border-b border-e rounded-b-lg"
                      }
                    >
                      {pj.name}
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
          <div className="text-xs mt-8">
            <span>
              Catatan: Anda hanya bisa mengganti PJ hanya pada hari minggu
            </span>
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
