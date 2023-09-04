import React from "react";
import { Link } from "react-router-dom";

export default function NavComp() {
  return (
    <div className="navbar bg-gray-400">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm text-white dropdown-content mt-3 z-[1] p-2 shadow bg-gray-400 rounded-box w-52"
          >
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <div>Pesan Makanan</div>
              <ul className="p-2">
                <li>
                  <Link to="/sarapan">Sarapan</Link>
                </li>
                <li>
                  <Link to="/makansiang">Makan siang</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/">Penanggung Jawab</Link>
            </li>
            <li>
              <Link to="/tentang">Tentang</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-white normal-case text-xl">
          SPPPJ
        </Link>
      </div>
      <div className="navbar-center text-white hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li tabIndex={0}>
            <details>
              <summary>Pesan Makanan</summary>
              <ul className="p-2 text-black">
                <li>
                  <Link to="/sarapan">Sarapan</Link>
                </li>
                <li>
                  <Link to="/makansiang">Makan Siang</Link>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <Link to="/">Penanggung Jawab</Link>
          </li>
          <li>
            <Link to="/tentang">Tentang</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
