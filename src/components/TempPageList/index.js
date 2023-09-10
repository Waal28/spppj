import React, { useEffect, useState } from "react";
import ParentComp from "../ParentComp";
import ModalComp from "../ModalComp";
import ConfirmComp from "../ConfirmComp";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

export default function TempPageList({ title, category, icon }) {
  const user = jwtDecode(Cookies.get("user"));
  const [confirm, setConfirm] = useState({
    title: "",
    text: "",
    titleNbutton: "",
    titleYbutton: "",
    isCheck: false,
    funcYbutton: () => {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  const [totalUang, setTotalUang] = useState(0);
  const [totalKembalian, setTotalKembalian] = useState(0);

  function clickBelum(name) {
    setConfirm({
      title: "Konfirmasi Pembayaran",
      text: (
        <p>
          Apakah <span className="font-medium capitalize">{name}</span> sudah
          membayar pesanan?
        </p>
      ),
      titleNbutton: "Belum",
      titleYbutton: "Sudah",
      isCheck: true,
      funcYbutton: () => {
        setConfirm((confirm) => ({ ...confirm, isCheck: false }));
        alert("ok");
      },
    });
  }
  function clickHapus(name) {
    setConfirm({
      title: "Hapus Pesanan",
      text: (
        <p>
          Hapus pesanan <span className="font-medium capitalize">{name}</span>?
        </p>
      ),
      titleNbutton: "Batal",
      titleYbutton: "Hapus",
      isCheck: true,
      funcYbutton: () => {
        setConfirm((confirm) => ({ ...confirm, isCheck: false }));
        alert("ok");
      },
    });
  }
  function formatCurrency(amount) {
    // Menggunakan metode toLocaleString() dengan opsi 'id-ID' untuk format Rupiah
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  }
  async function filterData(value) {
    setIsLoading(true);
    const { resData } = await getAll(false);

    let dataFilter = [];
    if (value === "Default") {
      dataFilter = await resData;
    } else {
      dataFilter = await resData.filter((list) => {
        return list.status === JSON.parse(value);
      });
    }

    const ttlUang = await dataFilter.reduce((acc, curr) => {
      return acc + +curr.pay;
    }, 0);
    const ttlKembalian = await dataFilter.reduce((acc, curr) => {
      return acc + +curr.payback;
    }, 0);
    setData(dataFilter);
    setTotalUang(ttlUang);
    setTotalKembalian(ttlKembalian);
  }
  async function cari(value) {
    setIsLoading(true);
    const keyword = value.toLowerCase();
    const { resData } = await getAll(true);

    const dataPencarian = await resData.filter((list) => {
      setIsLoading(false);
      return (
        list.name.toLowerCase().includes(keyword) ||
        list.order.toLowerCase().includes(keyword)
      );
    });

    const ttlUang = await dataPencarian.reduce((acc, curr) => {
      return acc + +curr.pay;
    }, 0);
    const ttlKembalian = await dataPencarian.reduce((acc, curr) => {
      return acc + +curr.payback;
    }, 0);
    setData(dataPencarian);
    setTotalUang(ttlUang);
    setTotalKembalian(ttlKembalian);
  }
  async function getAll(loadValue) {
    try {
      const res = await axios.get(
        `https://blue-green-llama-robe.cyclic.app/order/getAll/${category}`,
        {
          headers: {
            Authorization: Cookies.get("user"),
          },
        }
      );
      const resData = await res.data.data.data;
      const total_uang = await res.data.data.total_uang;
      const total_kembalian = await res.data.data.total_kembalian;

      setIsLoading(loadValue);
      setData(resData);
      setTotalUang(total_uang);
      setTotalKembalian(total_kembalian);

      return { resData, total_uang, total_kembalian };
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAll(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ParentComp>
      <main className="lg:w-1/2 md:w-1/2 sm:w-3/4 w-full p-4 mx-auto">
        <div className="font-serif text-xl flex justify-center">
          List {title} Hari Ini {icon}
        </div>
        <hr className="h-1 mx-auto bg-gray-400 border-0 rounded my-3" />
        {/* search */}
        <div className="join w-full border mx-auto mt-5">
          <input
            onChange={(e) => cari(e.target.value)}
            className="input input-sm input-bordered join-item lg:w-1/2 w-3/5"
            placeholder="Cari name atau pesanan"
          />
          <select
            onChange={(e) => filterData(e.target.value)}
            disabled={isLoading}
            className="select select-sm select-bordered join-item lg:w-1/2 w-2/5"
          >
            <option value="Default">Filter status</option>
            <option value="true">Sudah bayar</option>
            <option value="false">Belum bayar</option>
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
        <div className="overflow-x-auto mx-auto w-full rounded-lg">
          <table className="table table-sm">
            <thead>
              <tr className="bg-gray-300 text-center text-xs">
                {user.role !== "USER" ? <th>Status</th> : null}
                <th>#</th>
                <th>Nama</th>
                <th>Pesanan</th>
                <th>Harga</th>
                <th>Bayar</th>
                <th>Kembalian</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="text-center font-bold" colSpan="7">
                    <Loading />
                  </td>
                </tr>
              ) : (
                <ViewDataList
                  data={data}
                  formatCurrency={formatCurrency}
                  clickBelum={clickBelum}
                  clickHapus={clickHapus}
                  user={user}
                />
              )}
              <tr className="bg-gray-300">
                <td
                  className="text-center text-xs"
                  colSpan={user.role !== "USER" ? "5" : "4"}
                >
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
          <label htmlFor="my_modal_1" className="btn btn-sm shadow-md text-xs">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
            >
              <path fill="#888888" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" />
            </svg>
            Tambah
          </label>
        </div>
      </main>
      <ModalComp title={title} category={category} />
      <ConfirmComp confirm={confirm} setConfirm={setConfirm} />
    </ParentComp>
  );
}

const Loading = () => {
  return <span className="loading loading-spinner loading-xs"></span>;
};

const ViewDataList = ({
  data,
  formatCurrency,
  clickBelum,
  clickHapus,
  user,
}) => {
  if (data.length < 1) {
    return (
      <tr>
        <td
          className="text-xs text-center font-bold"
          colSpan={user.role !== "USER" ? "7" : "6"}
        >
          Tidak ada data
        </td>
      </tr>
    );
  } else {
    const viewData = data.map((list, index) => (
      <tr
        key={list.id}
        className={
          list.status ? "bg-green-200 capitalize" : "bg-red-200 capitalize"
        }
      >
        {user.role !== "USER" ? (
          <td className="p-2 border-e border-white">
            {list.status ? (
              <button
                onClick={() => clickHapus(list.name)}
                className="cursor-pointer mx-auto flex justify-center items-center w-11/12 bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold py-1.5 px-4 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 fill-current text-center"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 21V6H4V4h5V3h6v1h5v2h-1v15H5Zm2-2h10V6H7v13Zm2-2h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={() => clickBelum(list.name)}
                className="cursor-pointer mx-auto flex justify-center items-center w-11/12 bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded-full"
              >
                <span className="h-5">Belum</span>
              </button>
            )}
          </td>
        ) : null}
        <th className="text-xs">{index + 1}</th>
        <td className="text-xs">{list.name}</td>
        <td className="text-xs">{list.order}</td>
        <td className="text-xs">{formatCurrency(list.price)}</td>
        <td className="text-xs">{formatCurrency(list.pay)}</td>
        <td className="text-xs">{formatCurrency(list.payback)}</td>
      </tr>
    ));

    return viewData;
  }
};
