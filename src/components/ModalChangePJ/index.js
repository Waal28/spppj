import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmSetPj from "../ConfirmSetPJ";

export default function ModalChangePJ() {
  const [confirm, setConfirm] = useState({
    title: "Ganti Penanggung Jawab",
    text: "Ganti name sebagai PJ?",
    titleNbutton: "Batal",
    titleYbutton: "Ganti",
    isCheck: true,
    funcYbutton: () => {},
  });
  const [msg, setMsg] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      id: 1,
      name: <Loading />,
      posisi: <Loading />,
    },
  ]);

  const [isClick, setIsClick] = useState(false);

  function confirmChange(e, id, name) {
    e.preventDefault();

    setConfirm({
      ...confirm,
      text: `Ganti ${name} sebagai PJ?`,
      isCheck: true,
      funcYbutton: async () => {
        setConfirm({
          ...confirm,
          text: `Ganti ${name} sebagai PJ?`,
          titleYbutton: <Loading />,
          isCheck: true,
        });
        try {
          await axios.get(
            `https://blue-green-llama-robe.cyclic.app/user/set-pj/${id}`,
            {
              headers: {
                Authorization: Cookies.get("user"),
              },
            }
          );
          setIsClick(false);
          setConfirm({ ...confirm, isCheck: false });
          navigate("/");
        } catch (error) {
          setConfirm({
            ...confirm,
            text: `Ganti ${name} sebagai PJ?`,
            isCheck: true,
          });
          setMsg(error.response.data.errors);
        }
      },
    });
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
        checked={isClick}
        onChange={() => setIsClick(!isClick)}
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
        <ConfirmSetPj
          confirm={confirm}
          setConfirm={setConfirm}
          msg={msg}
          setMsg={setMsg}
          setIsClick={setIsClick}
        />
      </div>
    </>
  );
}

const Loading = () => {
  return <span className="loading loading-spinner loading-xs"></span>;
};
