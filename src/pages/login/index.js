import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginComp() {
  const [msg, setMsg] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  async function login(e) {
    e.preventDefault();

    const email_ = e.target.email.value;
    const password_ = e.target.password.value;
    setIsLoading(true);
    axios
      .post("https://blue-green-llama-robe.cyclic.app/user/login", {
        email: email_,
        password: password_,
      })
      .then(function (res) {
        setIsLoading(false);
        Cookies.set("user", res.data.data);
        navigate("/");
      })
      .catch(function (error) {
        setIsLoading(false);
        console.log(error.response.data.errors);
        setMsg(error.response.data.errors);
      });
  }
  const [tampil, setTampil] = useState(false);
  const token = Cookies.get("user");

  useEffect(() => {
    if (token) {
      navigate("/");
    } else {
      setTampil(true);
    }
  }, []);

  if (tampil)
    return (
      <div className="hero min-h-screen bg-gray-400">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login SPPPJ!</h1>
            <p className="pt-6">
              Sistem Pemesanan dan Penentuan Penanggung Jawab
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-400">
            <form onSubmit={login} className="card-body">
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
                  type="text"
                  required
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
              </div>
              {msg && (
                <span className="bg-red-500 p-2 rounded-md text-center text-white text-xs border-b-4 border-b-red-800">
                  {msg}
                </span>
              )}
              <div className="form-control mt-6">
                <button className="btn btn-primary" type="submit">
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="text-blue-700 text-center">
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
