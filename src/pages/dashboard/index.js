import React, { useEffect, useState } from "react";
import ParentComp from "../../components/ParentComp";
import CardLocation from "../../components/CardLocation";
import axios from "axios";
import Cookies from "js-cookie";

export default function Dashboard() {
  const [pjSarapan, setPjSarapan] = useState([
    { id: 1, name: <Loading /> },
    { id: 2, name: <Loading /> },
  ]);
  const [pjMakanSiang, setPjMakanSiang] = useState([
    { id: 1, name: <Loading /> },
    { id: 2, name: <Loading /> },
  ]);
  const lokasi = [
    {
      id: 1,
      nama: "Lontong | Lotek | Soto",
      harga: "5k | 8k | 7k",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127669.67434730375!2d101.4202368!3d0.4816896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a9347b153e01%3A0xcb644449e8a62d2!2sMal%20SKA!5e0!3m2!1sid!2sid!4v1694075518880!5m2!1sid!2sid",
      link: "https://goo.gl/maps/qgYCsB2ironUGFKf9",
    },
    {
      id: 2,
      nama: "Batagor",
      harga: "5k",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127669.67434730375!2d101.4202368!3d0.4816896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a9347b153e01%3A0xcb644449e8a62d2!2sMal%20SKA!5e0!3m2!1sid!2sid!4v1694075518880!5m2!1sid!2sid",
      link: "https://goo.gl/maps/qgYCsB2ironUGFKf9",
    },
    {
      id: 3,
      nama: "Bubur",
      harga: "10k",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127669.67434730375!2d101.4202368!3d0.4816896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a9347b153e01%3A0xcb644449e8a62d2!2sMal%20SKA!5e0!3m2!1sid!2sid!4v1694075518880!5m2!1sid!2sid",
      link: "https://goo.gl/maps/qgYCsB2ironUGFKf9",
    },
    {
      id: 4,
      nama: "Mie Ayam",
      harga: "10k",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127669.67434730375!2d101.4202368!3d0.4816896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a9347b153e01%3A0xcb644449e8a62d2!2sMal%20SKA!5e0!3m2!1sid!2sid!4v1694075518880!5m2!1sid!2sid",
      link: "https://goo.gl/maps/qgYCsB2ironUGFKf9",
    },
    {
      id: 5,
      nama: "Mie, Kwetiau, Nasgor Balap",
      harga: "6k",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127669.67434730375!2d101.4202368!3d0.4816896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a9347b153e01%3A0xcb644449e8a62d2!2sMal%20SKA!5e0!3m2!1sid!2sid!4v1694075518880!5m2!1sid!2sid",
      link: "https://goo.gl/maps/qgYCsB2ironUGFKf9",
    },
    {
      id: 6,
      nama: "Geprek",
      harga: "13k",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127669.67434730375!2d101.4202368!3d0.4816896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a9347b153e01%3A0xcb644449e8a62d2!2sMal%20SKA!5e0!3m2!1sid!2sid!4v1694075518880!5m2!1sid!2sid",
      link: "https://goo.gl/maps/qgYCsB2ironUGFKf9",
    },
    {
      id: 7,
      nama: "Ampera",
      harga: "13k",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127669.67434730375!2d101.4202368!3d0.4816896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a9347b153e01%3A0xcb644449e8a62d2!2sMal%20SKA!5e0!3m2!1sid!2sid!4v1694075518880!5m2!1sid!2sid",
      link: "https://goo.gl/maps/qgYCsB2ironUGFKf9",
    },
    {
      id: 8,
      nama: "Jus | Teh Es",
      harga: "6k | 4k",
      embed:
        "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d127669.67434730375!2d101.4202368!3d0.4816896!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d5a9347b153e01%3A0xcb644449e8a62d2!2sMal%20SKA!5e0!3m2!1sid!2sid!4v1694075518880!5m2!1sid!2sid",
      link: "https://goo.gl/maps/qgYCsB2ironUGFKf9",
    },
  ];
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
      })
      .catch(function (error) {
        console.log(error.response.data.errors);
      });
  }
  useEffect(() => {
    getDataPJ();
  }, []);
  return (
    <ParentComp>
      <main className="lg:w-1/2 md:w-1/2 sm:w-3/4 w-full p-4 mx-auto">
        <h1 className="text-center font-serif text-xl">
          Penanggung Jawab Hari Ini
        </h1>
        <hr className="h-1 mx-auto bg-gray-400 border-0 rounded my-3" />
        <div className=" grid grid-cols-2 mt-8">
          <div>
            <p className="text-center text-xs p-2 bg-gray-300 font-bold border-b border-e">
              Sarapan
            </p>
            <ul>
              {pjSarapan.map((pj) => (
                <li
                  key={pj.id}
                  className="capitalize text-center text-xs p-2 border-b border-e"
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
            <ul>
              {pjMakanSiang.map((pj) => (
                <li
                  key={pj.id}
                  className="capitalize text-center text-xs p-2 border-b border-s"
                >
                  {pj.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <section className="mt-10">
          <h1 className="text-center font-serif text-xl">Lokasi</h1>
          <hr className="h-1 mx-auto bg-gray-400 border-0 rounded my-3" />
          <div className="grid lg:grid-cols-2 grid-cols-1 mx-auto gap-4">
            {lokasi.map((lok) => (
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
