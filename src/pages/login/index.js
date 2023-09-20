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
<<<<<<< HEAD
            <h1 className="text-5xl font-bold text-tPrimary">
              Login{" "}
              <span className="rounded-lg px-1 inline-block w-fit">
                S
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-11 -mx-4 -mt-2.5 inline"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M270.2 148.9c0 .1-.1.1 0 0v.1-.1z"
                    fill="currentColor"
                  />
                  <path
                    d="M320 166c0-43.2-15-93.2-24-133.7V32h-8l-.2 116.9c0 6.1-2.9 11.1-9 11.1-5.7 0-8-4.3-8.6-9.9-.1-.4 0-.8 0-1.2L259.9 32h-8l-9 117-.1 1.1c-.6 5.6-3.7 9.9-9.5 9.9-6.1 0-9.1-5-9.1-11.1L223.8 32h-8C207 73 192 122.9 192 166.1c0 25.7 14.6 48.1 36.7 58.2 11.2 5.1 11.3 10.3 11.3 10.3s-16 201.7-16 213.1c0 11.4 4 18.5 9.5 24s14.2 8.2 22.4 8.2h.4c8.2 0 16.8-2.7 22.4-8.2 5.5-5.5 9.3-10.9 9.3-24s-16-213.1-16-213.1-1-5 11.4-10.6c21.6-9.8 36.6-32.2 36.6-58z"
                    fill="currentColor"
                  />
                </svg>
                PJ
=======
            <h1 className="text-5xl font-bold text-tPrimary tracking-wider">
              Login{" "}
              <span className="font-serif">
                si
                <span className="bg-black rounded-lg px-1.5">PJ</span>
>>>>>>> 01353f5270a4abb44e873b63f3c9ecdc9a1a6082
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
