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
  const [isCheck, setIsCheck] = useState(false);

  function confirmChange(e, name) {
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
        <main className="overflow-x-auto modal-box pt-0">
          <h3 className="font-bold text-lg my-3">Pilih Pengganti</h3>
          <table className="table table-xs table-pin-rows table-pin-cols border">
            <thead>
              <tr>
                <th className="bg-gray-200">#</th>
                <th className="bg-gray-200 text-center">Nama</th>
                <th className="bg-gray-200 text-center">Posisi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d, index) => (
                <tr
                  key={d.id}
                  className="hover:bg-gray-100"
                  onClick={(e) => confirmChange(e, d.name)}
                >
                  <td className="font-bold">{index + 1}</td>
                  <td className="capitalize">{d.name}</td>
                  <td className="capitalize text-center">{d.posisi}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
