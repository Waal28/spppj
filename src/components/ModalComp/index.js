import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";

export default function ModalComp({ title, category }) {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const name = jwtDecode(Cookies.get("user")).name;
  const [order, setOrder] = useState("");
  const [price, setPrice] = useState("");
  const [pay, setPay] = useState("");
  const status = false;
  const [isCheck, setIsCheck] = useState(false);

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const dataBaru = { name, order, price, pay, status, category };
    try {
      await axios.post(
        `https://blue-green-llama-robe.cyclic.app/order/create/${category}`,
        dataBaru,
        {
          headers: {
            Authorization: Cookies.get("user"),
          },
        }
      );
      setOrder("");
      setPrice("");
      setPay("");
      setIsLoading(false);
      setIsCheck(false);
    } catch (error) {
      setMsg(error.response.data.errors);
      setIsLoading(false);
      setIsCheck(true);
    }
  }
  const clickBatal = () => {
    setOrder("");
    setPrice("");
    setPay("");
    setMsg(false);
    setIsCheck(false);
  };
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_1"
        checked={isCheck}
        onChange={() => setIsCheck(!isCheck)}
        className="modal-toggle"
      />
      <div className="modal">
        <form onSubmit={handleSubmit} className="modal-box">
          <h3 className="font-bold text-lg capitalize">Pesan {title}</h3>
          {msg && <AlertComp msg={msg} setMsg={setMsg} />}
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Pesanan</span>
              </label>
              <textarea
                value={order}
                required
                onChange={(e) => setOrder(e.target.value)}
                className="textarea textarea-bordered"
                placeholder="contoh: batagor, balsem"
              ></textarea>
            </div>
            <div className="form-control col-span-2">
              <label className="label">
                <span className="label-text">Harga pesanan</span>
              </label>
              <label className="input-group">
                <span>Rp.</span>
                <input
                  type="number"
                  placeholder="contoh: 8000"
                  value={price}
                  required
                  onChange={(e) => setPrice(e.target.value)}
                  className="input input-md input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Uang diberikan</span>
              </label>
              <label className="input-group">
                <span>Rp.</span>
                <input
                  type="number"
                  placeholder="contoh: 10000"
                  value={pay}
                  required
                  onChange={(e) => setPay(e.target.value)}
                  className="input input-md input-bordered w-full"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <label
              onClick={clickBatal}
              className="btn btn-md shadow-md text-xs"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-xs"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#888888"
                  d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
                />
              </svg>
              Batal
            </label>
            <button className="btn btn-md shadow-md text-xs" type="submit">
              {isLoading ? (
                <Loading />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-xs"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#888888"
                    d="M21 7v12q0 .825-.588 1.413T19 21H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h12l4 4Zm-9 11q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18Zm-6-8h9V6H6v4Z"
                  />
                </svg>
              )}
              Simpan
            </button>
          </div>
        </form>
        <label className="modal-backdrop" htmlFor="my_modal_1">
          Close
        </label>
      </div>
    </>
  );
}
const Loading = () => {
  return <span className="loading loading-spinner loading-xs"></span>;
};
const AlertComp = ({ msg }) => {
  return (
    <div
      className="my-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 text-xs"
      role="alert"
    >
      <p className="font-bold">Error</p>
      <p>{msg}</p>
    </div>
  );
};
