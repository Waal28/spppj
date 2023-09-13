import React, { useEffect, useState } from "react";
import ParentComp from "../ParentComp";
import ConfirmComp from "../ConfirmComp";
import axios from "axios";
import ModalComp from "../ModalComp";
import AlertComp from "../AlertComp";
import { useSelector } from "react-redux";

export default function TempPageList({ title, category, icon }) {
  const user = useSelector((state) => state.myReducer.user);
  const token = useSelector((state) => state.myReducer.token);
  const catatan = [
    "Ampera: ayam bakar gk pakai nasi aja bla bla bla...",
    "Batagor: somay aja gk pakai batagor bla bla bla...",
    "Geprek: bagian dada bla bla bla...",
  ];

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
  const [dataModal, setDataModal] = useState({
    children: null,
    isClick: false,
  });
  const [totalUang, setTotalUang] = useState(0);
  const [totalKembalian, setTotalKembalian] = useState(0);

  function clickTambah() {
    setDataModal({
      children: (
        <ChildModalTambah
          title={title}
          category={category}
          dataModal={dataModal}
          setDataModal={setDataModal}
          getAll={getAll}
          user={user}
          token={token}
        />
      ),
      isClick: true,
    });
  }
  function clickHapusAll() {
    const dataConfirm = {
      title: `Hapus semua`,
      text: `Hapus semua list ${category}?`,
      titleNbutton: "Batal",
      titleYbutton: "Hapus",
      isCheck: true,
    };
    setConfirm({
      ...dataConfirm,
      funcYbutton: async () => {
        setConfirm({ ...dataConfirm, titleYbutton: <Loading /> });
        try {
          await axios.delete(
            "https://blue-green-llama-robe.cyclic.app/order/delete-all",
            {
              headers: {
                Authorization: token,
              },
            }
          );
          getAll(false);
          setConfirm((confirm) => ({ ...confirm, isCheck: false }));
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
  function clickBelum(name, id) {
    const dataConfirm = {
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
    };
    setConfirm({
      ...dataConfirm,
      funcYbutton: async () => {
        setConfirm({ ...dataConfirm, titleYbutton: <Loading /> });
        try {
          await axios.put(
            "https://blue-green-llama-robe.cyclic.app/order/set-bayar",
            {
              id,
              status: "proses",
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          getAll(false);
          setConfirm((confirm) => ({ ...confirm, isCheck: false }));
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
  function clickProses(name, id) {
    const dataConfirm = {
      title: "Konfirmasi Pesanan",
      text: (
        <p>
          Apakah <span className="font-medium capitalize">{name}</span> sudah
          menerima pesanan?
        </p>
      ),
      titleNbutton: "Belum",
      titleYbutton: "Sudah",
      isCheck: true,
    };
    setConfirm({
      ...dataConfirm,
      funcYbutton: async () => {
        setConfirm({ ...dataConfirm, titleYbutton: <Loading /> });
        try {
          await axios.put(
            "https://blue-green-llama-robe.cyclic.app/order/set-bayar",
            {
              id,
              status: "sudah",
            },
            {
              headers: {
                Authorization: token,
              },
            }
          );
          getAll(false);
          setConfirm((confirm) => ({ ...confirm, isCheck: false }));
        } catch (error) {
          console.log(error);
        }
      },
    });
  }
  function clickHapus(name, id) {
    const dataConfirm = {
      title: "Hapus Pesanan",
      text: (
        <p>
          Hapus pesanan <span className="font-medium capitalize">{name}</span>?
        </p>
      ),
      titleNbutton: "Batal",
      titleYbutton: "Hapus",
      isCheck: true,
    };
    setConfirm({
      ...dataConfirm,
      funcYbutton: async () => {
        setConfirm({ ...dataConfirm, titleYbutton: <Loading /> });
        try {
          await axios.delete(
            `https://blue-green-llama-robe.cyclic.app/order/delete-one/${id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          getAll(false);
          setConfirm((confirm) => ({ ...confirm, isCheck: false }));
        } catch (error) {
          console.log(error);
        }
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
        return list.status === value;
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
            Authorization: token,
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
      console.log(error.response.data.errors);
    }
  }

  useEffect(() => {
    if (token) {
      getAll(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <ParentComp>
      <main className="lg:w-1/2 md:w-1/2 sm:w-3/4 w-full p-4 mx-auto">
        <div className="font-serif text-xl flex justify-center">
          List {title} Hari Ini {icon}
        </div>
        <hr className="h-1 mx-auto bg-primary border-0 rounded my-3" />
        {/* search */}
        <div className="join w-full border mx-auto mt-5">
          <input
            onChange={(e) => cari(e.target.value)}
            className="input input-sm input-bordered join-item lg:w-1/2 w-3/5"
            placeholder="Cari nama atau pesanan"
          />
          <select
            onChange={(e) => filterData(e.target.value)}
            disabled={isLoading}
            className="select select-sm select-bordered join-item lg:w-1/2 w-2/5"
          >
            <option value="Default">Filter status</option>
            <option value="sudah">Sudah bayar</option>
            <option value="proses">Diproses</option>
            <option value="belum">Belum bayar</option>
          </select>
        </div>
        {/* status */}
        <div className="grid grid-cols-3 gap 2 text-xs m-3">
          <section className="flex items-center justify-start">
            <div className="rounded-full me-2 h-3 w-3 bg-red-200 shadow"></div>
            belum bayar
          </section>
          <section className="flex items-center justify-center">
            <div className="rounded-full me-2 h-3 w-3 bg-blue-200 shadow"></div>
            diproses
          </section>
          <section className="flex items-center justify-end">
            <div className="rounded-full me-2 h-3 w-3 bg-green-200 shadow"></div>
            sudah bayar
          </section>
        </div>
        {/* table */}
        <div className="overflow-x-auto mx-auto w-full rounded-lg">
          <table className="table table-sm">
            <thead>
              <tr className="bg-tertiary text-center text-xs text-black">
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
                  clickProses={clickProses}
                  user={user}
                />
              )}
              <tr className="bg-tertiary">
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
        <div className="flex items-center justify-between mt-5">
          <button
            onClick={clickTambah}
            className="btn btn-sm capitalize bg-secondary text-tPrimary text-xs shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2v-6Z" />
            </svg>
            Tambah
          </button>
          {user.role !== "USER" ? (
            <button
              onClick={clickHapusAll}
              className="btn btn-sm capitalize bg-secondary text-tPrimary text-xs shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M5 21V6H4V4h5V3h6v1h5v2h-1v15H5Zm2-2h10V6H7v13Zm2-2h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z" />
              </svg>
              Hapus Semua
            </button>
          ) : null}
        </div>
        <div className="text-xs mt-5 ">
          <span>Catatan: Kalau mau request buat input seperti ini contoh:</span>
          <ul className="menu text-xs">
            {catatan.map((cat) => (
              <li key={cat} className="p-1 border-s">
                {cat}
              </li>
            ))}
          </ul>
        </div>
      </main>
      <ModalComp dataModal={dataModal} setDataModal={setDataModal} />
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
  clickProses,
  user,
}) => {
  const bgClass = {
    belum: "bg-red-200 capitalize",
    proses: "bg-blue-200 capitalize",
    sudah: "bg-green-200 capitalize",
  };

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
      <tr key={list.id} className={bgClass[list.status]}>
        {user.role !== "USER" ? (
          <td className="p-2 border-e border-white">
            <ButtonStatus
              clickBelum={clickBelum}
              clickHapus={clickHapus}
              clickProses={clickProses}
              list={list}
            />
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

const ChildModalTambah = ({
  title,
  category,
  dataModal,
  setDataModal,
  getAll,
  user,
  token,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState(false);
  const name = user.name;
  const [formData, setFormData] = useState({
    name: name,
    order: "",
    price: "",
    pay: "",
    status: "belum",
    category: category,
  });

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    if (Number(formData.price) > Number(formData.pay)) {
      setMsg("Uang tidak cukup");
      setIsLoading(false);
    } else {
      try {
        await axios.post(
          `https://blue-green-llama-robe.cyclic.app/order/create/${category}`,
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        getAll(false);
        setFormData({
          ...formData,
          order: "",
          price: "",
          pay: "",
        });
        setIsLoading(false);
        setDataModal({ children: null, isClick: false });
      } catch (error) {
        setMsg(error.response.data.errors);
        setIsLoading(false);
      }
    }
  }
  const clickBatal = () => {
    setFormData({
      ...formData,
      order: "",
      price: "",
      pay: "",
    });
    setMsg(false);
    setDataModal({ ...dataModal, isClick: false });
  };
  return (
    <form onSubmit={handleSubmit} className="modal-box">
      <h3 className="font-bold text-lg capitalize">Pesan {title}</h3>
      {msg && <AlertComp msg={msg} setMsg={setMsg} />}
      <div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Pesanan</span>
          </label>
          <textarea
            value={formData.order}
            required
            onChange={(e) =>
              setFormData({ ...formData, order: e.target.value })
            }
            className="textarea textarea-bordered"
            placeholder="contoh: batagor, balsem"
          ></textarea>
        </div>
        <div className="form-control col-span-2">
          <label className="label">
            <span className="label-text">Harga pesanan</span>
          </label>
          <label className="input-group">
            <span className="text-sm bg-secondary text-tPrimary">Rp.</span>
            <input
              type="number"
              placeholder="contoh: 8000"
              value={formData.price}
              required
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
              className="input input-md input-bordered w-full"
            />
          </label>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Uang diberikan</span>
          </label>
          <label className="input-group">
            <span className="text-sm bg-secondary text-tPrimary">Rp.</span>
            <input
              type="number"
              placeholder="contoh: 10000"
              value={formData.pay}
              required
              onChange={(e) =>
                setFormData({ ...formData, pay: e.target.value })
              }
              className="input input-md input-bordered w-full"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={clickBatal}
          type="button"
          className="btn btn-sm capitalize bg-secondary text-tPrimary shadow-md text-xs"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="m12 13.4l2.9 2.9q.275.275.7.275t.7-.275q.275-.275.275-.7t-.275-.7L13.4 12l2.9-2.9q.275-.275.275-.7t-.275-.7q-.275-.275-.7-.275t-.7.275L12 10.6L9.1 7.7q-.275-.275-.7-.275t-.7.275q-.275.275-.275.7t.275.7l2.9 2.9l-2.9 2.9q-.275.275-.275.7t.275.7q.275.275.7.275t.7-.275l2.9-2.9Zm0 8.6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z" />
          </svg>
          Batal
        </button>
        <button
          className="btn btn-sm capitalize bg-secondary text-tPrimary shadow-md text-xs"
          type="submit"
        >
          {isLoading ? (
            <Loading />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M21 7v12q0 .825-.588 1.413T19 21H5q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h12l4 4Zm-9 11q1.25 0 2.125-.875T15 15q0-1.25-.875-2.125T12 12q-1.25 0-2.125.875T9 15q0 1.25.875 2.125T12 18Zm-6-8h9V6H6v4Z" />
            </svg>
          )}
          Simpan
        </button>
      </div>
    </form>
  );
};

const ButtonStatus = ({ clickBelum, clickHapus, clickProses, list }) => {
  if (list.status === "belum") {
    return (
      <button
        onClick={() => clickBelum(list.name, list.id)}
        className="cursor-pointer mx-auto flex justify-center items-center w-11/12 bg-red-500 hover:bg-red-700 text-white font-bold py-1.5 px-4 rounded-full"
      >
        <span className="h-5 text-xs">Belum</span>
      </button>
    );
  } else if (list.status === "proses") {
    return (
      <button
        onClick={() => clickProses(list.name, list.id)}
        className="cursor-pointer mx-auto flex justify-center items-center w-11/12 bg-blue-500 hover:bg-blue-700 text-white font-medium py-1.5 px-4 rounded-full"
      >
        <span className="h-5 text-xs">Proses</span>
      </button>
    );
  } else {
    return (
      <button
        onClick={() => clickHapus(list.name, list.id)}
        className="cursor-pointer mx-auto flex justify-center items-center w-11/12 bg-white hover:bg-kuarteneri font-medium py-1.5 px-4 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 fill-current text-center"
          viewBox="0 0 24 24"
        >
          <path d="M5 21V6H4V4h5V3h6v1h5v2h-1v15H5Zm2-2h10V6H7v13Zm2-2h2V8H9v9Zm4 0h2V8h-2v9ZM7 6v13V6Z" />
        </svg>
      </button>
    );
  }
};
