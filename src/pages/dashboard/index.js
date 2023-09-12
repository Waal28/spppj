import React, { useEffect, useState } from "react";
import ParentComp from "../../components/ParentComp";
import CardLocation from "../../components/CardLocation";
import axios from "axios";
import { useSelector } from "react-redux";
import lokasi from "../../data/lokasi.json";

export default function Dashboard() {
  const token = useSelector((state) => state.myReducer.token);
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
          Authorization: token,
        },
      })
      .then(function (res) {
        const pj = res.data.data;
        setPjSarapan(pj.sarapan);
        setPjMakanSiang(pj.siang);
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
        <h1 className="text-center font-serif text-xl">
          Penanggung Jawab Hari Ini
        </h1>
        <hr className="h-1 mx-auto bg-primary border-0 rounded my-3" />
        <div className=" grid grid-cols-2 mt-8 shadow-lg rounded-lg">
          <div>
            <p className="text-center text-xs p-2 rounded-t-lg bg-kuarteneri font-bold border-b border-e">
              Sarapan
            </p>
            <ul>
              {pjSarapan.length < 1 ? (
                <li className="capitalize text-center text-xs p-2 border-b border-e rounded-b-lg">
                  -
                </li>
              ) : (
                pjSarapan.map((pj) => (
                  <li
                    key={pj.id}
                    className="capitalize text-center text-xs p-2 border-b border-e rounded-b-lg"
                  >
                    {pj.name}
                  </li>
                ))
              )}
            </ul>
          </div>
          <div>
            <p className="text-center text-xs p-2 rounded-t-lg bg-kuarteneri font-bold border-b border-s">
              Makan Siang
            </p>
            <ul>
              {pjMakanSiang.length < 1 ? (
                <li className="capitalize text-center text-xs p-2 border-b border-s rounded-b-lg">
                  -
                </li>
              ) : (
                pjMakanSiang.map((pj) => (
                  <li
                    key={pj.id}
                    className="capitalize text-center text-xs p-2 border-b border-s rounded-b-lg"
                  >
                    {pj.name}
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
        <section className="mt-10">
          <h1 className="text-center font-serif text-xl">Lokasi Makanan</h1>
          <hr className="h-1 mx-auto bg-primary border-0 rounded my-3" />
          <div className="grid lg:grid-cols-2 grid-cols-1 mx-auto gap-4">
            {lokasi.data.map((lok) => (
              <CardLocation key={lok.id} lokasi={lok} />
            ))}
          </div>
        </section>
      </main>
    </ParentComp>
  );
}

const Loading = () => {
  return <span className="loading loading-spinner loading-xs"></span>;
};
