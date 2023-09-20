import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OffShow from "../../components/icons/offshow";
import OnShow from "../../components/icons/onshow";

export default function LoginComp() {
  const [msg, setMsg] = useState(false);
  const [type, setType] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  function login(e) {
    e.preventDefault();

    const email_ = e.target.email.value;
    const password_ = e.target.password.value;
    setIsLoading(true);
    axios
      .post("https://backendpj-5daf09e9c27c.herokuapp.com/user/login", {
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

  useEffect(() => {
    if (Cookies.get("user")) {
      navigate("/");
    } else {
      setTampil(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("user")]);

  if (tampil)
    return (
      <div className="hero min-h-screen bg-secondary">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-tPrimary tracking-wider">
              Login{" "}
              <span className="font-serif">
                si
                <span className="bg-black rounded-lg px-1.5">PJ</span>
              </span>
            </h1>
            <p className="pt-6 text-tPrimary">
              Sistem Pemesanan dan Penentuan Penanggung Jawab
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-primary">
            <form onSubmit={login} className="card-body">
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
              {msg && (
                <span className="bg-red-500 p-2 rounded-md text-center text-white text-xs border-b-4 border-b-red-800">
                  {msg}
                </span>
              )}
              <div className="form-control mt-6">
                <button
                  className="btn bg-kuarteneri text-tPrimary"
                  type="submit"
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
              <div className="text-center text-tPrimary">
                <Link to="/register">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}
