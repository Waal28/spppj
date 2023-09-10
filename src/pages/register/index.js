import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterComp() {
  const [isMsg, setIsMsg] = useState(false);
  const confpassword = "123";
  const password = "123";
  const navigate = useNavigate();
  function register(e) {
    const confpassword_ = e.target.confpassword.value;
    const password_ = e.target.password.value;
    e.preventDefault();
    if (confpassword_ === confpassword && password_ === password) {
      navigate("/login");
    }
    setIsMsg(true);
  }
  return (
    <div className="hero min-h-screen bg-gray-400">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register SPPPJ!</h1>
          <p className="pt-6">
            Sistem Pemesanan dan Penentuan Penanggung Jawab
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-400">
          <form onSubmit={register} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                required
                name="username"
                placeholder="username"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Posisi</span>
              </label>
              <select
                className="select select-bordered w-full max-w-xs"
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
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                required
                name="email"
                placeholder="email"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                required
                name="password"
                placeholder="password"
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm password</span>
              </label>
              <input
                type="password"
                required
                name="confpassword"
                placeholder="confirm password"
                className="input input-bordered"
              />
            </div>
            {isMsg ? (
              <span className="bg-red-500 p-2 rounded-md text-center text-white text-xs border-b-4 border-b-red-800">
                password dan confirm password tidak sesuai
              </span>
            ) : null}
            <div className="form-control mt-6">
              <button className="btn btn-primary" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
