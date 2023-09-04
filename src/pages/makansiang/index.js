import React, { useState } from "react";
import ParentComp from "../../components/ParentComp";
import ModalComp from "../../components/ModalComp";

export default function MakanSiang() {
  const [makanSiang, setMakanSiang] = useState([
    {
      nama: "memei",
      pesanan: "ayam penyet",
      harga: 15000,
      uang: 20000,
      kembalian: 5000,
      sudahBayar: true,
    },
    {
      nama: "joji",
      pesanan: "ikan nila",
      harga: 13000,
      uang: 15000,
      kembalian: 2000,
      sudahBayar: true,
    },
    {
      nama: "meri",
      pesanan: "geprek jagoan",
      harga: 15000,
      uang: 15000,
      kembalian: 0,
      sudahBayar: true,
    },
  ]);
  const [data, setData] = useState(makanSiang);

  const [totalUang, setTotalUang] = useState(
    makanSiang.reduce((acc, curr) => {
      return acc + +curr.uang;
    }, 0)
  );

  const [totalKembalian, setTotalKembalian] = useState(
    makanSiang.reduce((acc, curr) => {
      return acc + +curr.kembalian;
    }, 0)
  );
  function formatCurrency(amount) {
    // Menggunakan metode toLocaleString() dengan opsi 'id-ID' untuk format Rupiah
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  }
  function filterData(value) {
    if (value === "sudah bayar") {
      const diterima = makanSiang.filter((list) => list.sudahBayar === true);
      const ttlUang = diterima.reduce((acc, curr) => {
        return acc + +curr.uang;
      }, 0);
      const ttlKembalian = diterima.reduce((acc, curr) => {
        return acc + +curr.kembalian;
      }, 0);
      setData(diterima);
      setTotalUang(ttlUang);
      setTotalKembalian(ttlKembalian);
    } else if (value === "belum bayar") {
      const belum = makanSiang.filter((list) => list.sudahBayar === false);
      const ttlUang = belum.reduce((acc, curr) => {
        return acc + +curr.uang;
      }, 0);
      const ttlKembalian = belum.reduce((acc, curr) => {
        return acc + +curr.kembalian;
      }, 0);
      setData(belum);
      setTotalUang(ttlUang);
      setTotalKembalian(ttlKembalian);
    } else {
      const ttlUang = makanSiang.reduce((acc, curr) => {
        return acc + +curr.uang;
      }, 0);
      const ttlKembalian = makanSiang.reduce((acc, curr) => {
        return acc + +curr.kembalian;
      }, 0);
      setData(makanSiang);
      setTotalUang(ttlUang);
      setTotalKembalian(ttlKembalian);
    }
  }
  function cari(value) {
    const keyword = value.toLowerCase();
    const dataPencarian = makanSiang.filter(
      (list) =>
        list.nama.toLowerCase().includes(keyword) ||
        list.pesanan.toLowerCase().includes(keyword)
    );
    setData(dataPencarian);
  }
  return (
    <ParentComp>
      <div className="lg:w-1/2 md:w-1/2 sm:w-1.2 w-full mx-auto">
        <h1 className="text-center font-serif text-2xl">
          List Makan Siang Hari ini
        </h1>
        <hr className="h-1 mx-auto bg-gray-400 border-0 rounded my-3" />
        {/* search */}
        <div className="join w-full border mx-auto mt-5">
          <input
            onChange={(e) => cari(e.target.value)}
            className="input input-sm input-bordered join-item lg:w-1/2 w-3/5"
            placeholder="Cari nama atau pesanan"
          />
          <select
            onChange={(e) => filterData(e.target.value)}
            className="select select-sm select-bordered join-item lg:w-1/2 w-2/5"
          >
            <option value="Default">Filter status</option>
            <option value="sudah bayar">Sudah bayar</option>
            <option value="belum bayar">Belum bayar</option>
          </select>
        </div>
        {/* status */}
        <div className="grid grid-cols-2 gap 2 text-xs mt-3">
          <section className="flex items-center">
            <div className="rounded-full me-2 h-3 w-3 bg-green-200 shadow"></div>
            sudah bayar
          </section>
          <section className="flex items-center">
            <div className="rounded-full m-2 h-3 w-3 bg-red-200 shadow"></div>
            belum bayar
          </section>
        </div>
        {/* table */}
        <div className="overflow-x-auto mx-auto lg w-full rounded-lg">
          <table className="table">
            <thead>
              <tr className="bg-gray-300">
                <th></th>
                <th className="text-center">Nama</th>
                <th className="text-center">Pesanan</th>
                <th className="text-center">Harga</th>
                <th className="text-center">Uang</th>
                <th className="text-center">Kembalian</th>
              </tr>
            </thead>
            <tbody>
              {data.length >= 1 ? (
                data.map((list, index) => (
                  <tr
                    key={list.nama}
                    className={list.sudahBayar ? "bg-green-200" : "bg-red-200"}
                  >
                    <th className="text-xs">{index + 1}</th>
                    <td className="text-xs">{list.nama}</td>
                    <td className="text-xs">{list.pesanan}</td>
                    <td className="text-xs">{formatCurrency(list.harga)}</td>
                    <td className="text-xs">{formatCurrency(list.uang)}</td>
                    <td className="text-xs">
                      {formatCurrency(list.kembalian)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="text-xs text-center font-bold" colSpan="6">
                    Tidak ada data
                  </td>
                </tr>
              )}
              <tr className="bg-gray-300">
                <td className="text-xs text-center" colSpan="4">
                  Total :
                </td>
                <th className="text-xs">{formatCurrency(totalUang)}</th>
                <th className="text-xs">{formatCurrency(totalKembalian)}</th>
              </tr>
            </tbody>
          </table>
        </div>
        {/* add button */}
        <div className="flex items-end mt-3">
          <label htmlFor="my_modal_1" className="btn btn-md text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
            >
              <path fill="#888888" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" />
            </svg>
            Tambah
          </label>
        </div>
      </div>
      <ModalComp
        title="Makan Siang"
        list={makanSiang}
        setList={setMakanSiang}
        setData={setData}
      />
    </ParentComp>
  );
}
