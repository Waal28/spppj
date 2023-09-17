import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnShow from "../../components/icons/onshow";
import OffShow from "../../components/icons/offshow";

export default function RegisterComp() {
  const [isLoading, setIsLoading] = useState(false);
  const [isMsg, setIsMsg] = useState(false);
  const [type, setType] = useState(false);
  const navigate = useNavigate();
  async function register(e) {
    setIsLoading(true);
    e.preventDefault();

    const user = {
      name: e.target.username.value,
      posisi: e.target.posisi.value,
      email: e.target.email.value,
      password: e.target.password.value,
      confirmpassword: e.target.confpassword.value,
    };

    try {
      await axios.post(
        "https://backendpj-5daf09e9c27c.herokuapp.com/user/register",
        user
      );
      navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setIsMsg(error.response.data.errors);
    }
  }
  return (
    <div className="hero min-h-screen bg-secondary">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold text-tPrimary">Register SPPPJ!</h1>
          <p className="pt-6 text-tPrimary">
            Sistem Pemesanan dan Penentuan Penanggung Jawab
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-primary">
          <form onSubmit={register} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-tPrimary">Nama</span>
              </label>
              <input
                type="text"
                required
                name="username"
                placeholder="nama"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-tPrimary">Posisi</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
                name="posisi"
                required
              >
                <option>Sistem Analis</option>
                <option>Programmer</option>
                <option>Implementator</option>
                <option>Marketing</option>
                <option>Jurnalis</option>
                <option>Iot</option>
                <option>Grafik Desainer</option>
                <option>Content Creator</option>
                <option>Videografer</option>
              </select>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-tPrimary">Email</span>
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-tPrimary">Password</span>
              </label>
              <input
                type={type ? "text" : "password"}
                required
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
              <div
                onClick={() => setType(!type)}
                className="text-gray-400 absolute right-4 bottom-3 hover:text-gray-300 cursor-pointer"
              >
                {type ? (
                  <OffShow className="fill-current h-5 w-5" />
                ) : (
                  <OnShow className="fill-current h-5 w-5" />
                )}
              </div>
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-tPrimary">
                  Confirm password
                </span>
              </label>
              <input
                type={type ? "text" : "password"}
                required
                name="confpassword"
                placeholder="confirm password"
                className="input input-bordered"
              />
              <div
                onClick={() => setType(!type)}
                className="text-gray-400 absolute right-4 bottom-3 hover:text-gray-300 cursor-pointer"
              >
                {type ? (
                  <OffShow className="fill-current h-5 w-5" />
                ) : (
                  <OnShow className="fill-current h-5 w-5" />
                )}
              </div>
            </div>
            {isMsg ? (
              <span className="bg-red-500 p-2 rounded-md text-center text-tPrimary text-xs border-b-4 border-b-red-800">
                {isMsg}
              </span>
            ) : null}
            <div className="form-control mt-6">
              <button className="btn bg-kuarteneri text-tPrimary" type="submit">
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
