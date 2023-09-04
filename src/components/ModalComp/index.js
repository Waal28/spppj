import React, { useState } from "react";

export default function ModalComp({ title, list, setList, setData }) {
  const [nama, setNama] = useState("");
  const [pesanan, setPesanan] = useState("");
  const [harga, setHarga] = useState("");
  const [uang, setUang] = useState("");
  const kembalian = uang - harga;
  const sudahBayar = false;
  const [isCheck, setIsCheck] = useState(false);

  function handleSubmit(e) {
    const dataBaru = [
      ...list,
      { nama, pesanan, harga, uang, kembalian, sudahBayar },
    ];
    setList(dataBaru);
    setData(dataBaru);
    setNama("");
    setPesanan("");
    setHarga("");
    setUang("");
    setIsCheck(false);
    e.preventDefault();
  }

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
          <h3 className="font-bold text-lg">Pesan {title}</h3>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Nama</span>
              </label>
              <input
                type="text"
                placeholder="contoh: iwal"
                value={nama}
                required
                onChange={(e) => setNama(e.target.value)}
                className="input input-md input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Pesanan</span>
              </label>
              <textarea
                value={pesanan}
                required
                onChange={(e) => setPesanan(e.target.value)}
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
                  value={harga}
                  required
                  onChange={(e) => setHarga(e.target.value)}
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
                  value={uang}
                  required
                  onChange={(e) => setUang(e.target.value)}
                  className="input input-md input-bordered w-full"
                />
              </label>
            </div>
          </div>
          <div className="flex justify-between mt-8">
            <label htmlFor="my_modal_1" className="btn btn-md text-xs">
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
            <button className="btn btn-md text-xs" type="submit">
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
