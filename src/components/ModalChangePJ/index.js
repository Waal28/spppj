import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ModalChangePJ() {
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      name: <Loading />,
      posisi: <Loading />,
    },
  ]);
  const babi = [
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
    {
      id: Math.random(),
      name: "aaaaaaaaaaaaa",
      posisi: "bbbbbbb",
    },
  ];
  const [isCheck, setIsCheck] = useState(false);

  function confirmChange(e, id, name) {
    e.preventDefault();
    if (window.confirm(`Ganti ${name} sebagai PJ?`) === true) {
      setIsCheck(false);
      navigate("/");
    } else {
      return null;
    }
  }
  async function getDataSetPJ() {
    try {
      const res = await axios.get(
        "https://blue-green-llama-robe.cyclic.app/user/getAllSetPJ",
        {
          headers: {
            Authorization: Cookies.get("user"),
          },
        }
      );
      setData(res.data.data);
    } catch (error) {
      console.log(error.response.data.errors);
    }
  }
  useEffect(() => {
    getDataSetPJ();
  }, []);

  return (
    <>
      <input
        type="checkbox"
        id="modal_change_pj"
        checked={isCheck}
        onChange={() => setIsCheck(!isCheck)}
        className="modal-toggle"
      />
      <div className="modal">
        <main className="modal-box">
          <h3 className="font-bold text-lg">Pilih Pengganti</h3>
          <section className="my-4">
            <div className="grid grid-cols-2 gap-4 text-xs px-4 py-2 bg-gray-200 text-gray-500 rounded-t-lg">
              <span className="text-center ">Nama</span>
              <span className="text-center ">Posisi</span>
            </div>
            <div className="max-h-96 overflow-auto">
              <ul className="w-full rounded-b-lg">
                {data.map((user) => (
                  <li key={user.id}>
                    <div
                      onClick={(e) => confirmChange(e, user.id, user.name)}
                      className="px-4 py-2 grid grid-cols-2 gap-4 border-b capitalize text-xs hover:bg-gray-100"
                    >
                      <span className="">{user.name}</span>
                      <span className="">{user.posisi}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </main>
        <label className="modal-backdrop" htmlFor="modal_change_pj">
          Close
        </label>
      </div>
    </>
  );
}

const Loading = () => {
  return <span className="loading loading-spinner loading-xs"></span>;
};
