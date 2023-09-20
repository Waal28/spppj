import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AvatarComp from "../Avatar";
import Cookies from "js-cookie";
import ConfirmComp from "../ConfirmComp";
import { useSelector } from "react-redux";

export default function NavComp() {
  const user = useSelector((state) => state.myReducer.user);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState({
    title: "",
    text: "",
    titleNbutton: "",
    titleYbutton: "",
    isCheck: false,
    funcYbutton: () => {},
  });

  function logout() {
    setConfirm({
      title: "Logout",
      text: "Yakin keluar aplikasi? Anda harus login ulang!",
      titleNbutton: "Batal",
      titleYbutton: "Yakin",
      isCheck: true,
      funcYbutton: () => {
        Cookies.remove("user");
        navigate("/login");
      },
    });
  }
  return (
    <div className="navbar bg-primary">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden text-tPrimary">
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
            className="menu menu-sm text-tPrimary dropdown-content mt-3 z-[1] p-2 shadow bg-primary rounded-box w-64"
          >
            <li>
              <Link className="flex" to="/">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h4 w-4 fill-current"
                    viewBox="0 0 16 16"
                  >
                    <path d="M13.545 2.1a.75.75 0 0 1 .274 1.025l-3.472 6.007a3 3 0 1 1-1.208-.908l1.759-3.042a6.5 6.5 0 0 0-2.148-.639V5a.75.75 0 1 1-1.5 0v-.457a6.5 6.5 0 0 0-1.829.49l.229.396a.75.75 0 1 1-1.3.75l-.228-.396a6.5 6.5 0 0 0-1.339 1.34l.396.227a.75.75 0 0 1-.75 1.3l-.396-.229a6.5 6.5 0 0 0-.498 1.905a.75.75 0 0 1-1.492-.155A8 8 0 0 1 11.65 3.88l.87-1.506a.75.75 0 0 1 1.025-.274Zm-.107 4.047a.75.75 0 0 1 1.047.169a8 8 0 0 1 1.51 4.963a.75.75 0 1 1-1.499-.052a6.5 6.5 0 0 0-1.227-4.033a.75.75 0 0 1 .17-1.047ZM9.5 11a1.5 1.5 0 1 1-3 0a1.5 1.5 0 0 1 3 0Z" />
                  </svg>
                </div>
                <div>Dashboard</div>
              </Link>
            </li>
            <li>
              <ul className="p-2">
                <li>
                  <Link className="flex" to="/sarapan">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h4 w-4 fill-current"
                        viewBox="0 0 32 32"
                      >
                        <path d="M26.861 5.14c-2.853-2.854-7.477-2.852-10.336-.002L5.139 16.524a7.314 7.314 0 0 0 0 10.337a7.314 7.314 0 0 0 10.337 0l11.385-11.385a7.314 7.314 0 0 0 0-10.337Zm-8.924 1.414a5.314 5.314 0 0 1 7.51 0a5.314 5.314 0 0 1 0 7.508L14.062 25.447a5.314 5.314 0 0 1-7.509 0a5.314 5.314 0 0 1 0-7.51l.128-.127l3.732 3.731a1.556 1.556 0 0 0 2.206 0a1.556 1.556 0 0 0 0-2.206l-3.732-3.731l2.255-2.255l3.736 3.736a1.556 1.556 0 0 0 2.207 0a1.572 1.572 0 0 0 0-2.207l-3.736-3.736l2.255-2.255l3.731 3.732a1.556 1.556 0 0 0 2.207 0a1.556 1.556 0 0 0 0-2.207l-3.732-3.73l.127-.128Z" />
                      </svg>
                    </div>
                    <div>Sarapan</div>
                  </Link>
                </li>
                <li>
                  <Link className="flex" to="/makansiang">
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h4 w-4 fill-current"
                        viewBox="0 0 512 512"
                      >
                        <circle cx="263.872" cy="263.558" r="168.193" />
                        <circle cx="263.872" cy="263.558" r="132.504" />
                        <path d="M503.859 40.27v65.76l.084 67.404l.049 38.018l-.062 39.251l-.184 77.268l-.089 35.552l.007 16.466l.107 15.387l.116 14.154l.245 12.767c.103 8.015.397 15.002.603 20.756c.171 5.754.487 10.275.625 13.358l.295 4.727c.657 10.519-7.337 19.579-17.856 20.236c-10.519.657-19.579-7.337-20.236-17.856a19.534 19.534 0 0 1-.034-1.583l.019-.797l.027-1.207c.023-.796.031-1.978.1-3.519c.144-3.083.227-7.604.592-13.358c.325-5.754.671-12.741 1.328-20.756l.957-12.767c.388-4.495.807-9.222 1.414-14.154c.269-2.466.604-4.983.958-7.549c.33-2.566.729-5.179 1.13-7.838c.809-5.317 1.755-10.814 2.666-16.466c.907-5.651 1.921-11.457 2.754-17.39c.802-5.934 1.578-11.996 1.988-18.161c.286-3.083.342-6.191.517-9.321l.077-4.712c.027-1.576.058-3.158.008-4.744c-.055-3.172-.09-6.364-.298-9.572l-.257-4.823c-.129-1.611-.249-3.227-.441-4.845c-.673-6.473-2.003-12.998-3.793-19.548c-1.79-6.55-4.175-13.126-6.692-19.702c-2.494-6.576-5.118-13.152-7.277-19.702c-.585-1.638-1.036-3.274-1.558-4.908c-.531-1.634-.96-3.266-1.397-4.895c-.926-3.259-1.65-6.509-2.306-9.745c-.664-3.237-1.129-6.46-1.632-9.668c-.482-3.208-1.019-6.399-1.448-9.572c-.92-6.345-1.781-12.613-2.283-18.778c-.521-6.165-.71-12.227-.521-18.161c.182-5.934.724-11.739 1.464-17.39c.749-5.651 1.725-11.148 2.787-16.466l.766-3.954c.27-1.306.585-2.601.871-3.884c.605-2.566 1.113-5.083 1.765-7.549c2.43-9.864 5.295-18.906 8.139-26.921c2.861-8.015 5.776-15.002 8.492-20.756c2.702-5.754 5.117-10.275 6.919-13.358c.922-1.541 1.608-2.723 2.105-3.519l.783-1.207l2.836-4.372a8.033 8.033 0 0 1 11.112-2.368c2.351 1.524 3.639 4.127 3.659 6.737zM69.417 60.721c-2.48 0-4.417 1.719-5.417 4.029v78.922c0 2.281-1.719 4.13-4 4.13s-4-1.849-4-4.13V65.049c-1-2.46-3.094-4.328-5.681-4.328c-2.18 0-4.319 1.326-5.319 3.216v79.735c0 2.281-1.621 4.13-3.902 4.13c-2.169 0-3.699-1.677-3.869-3.803H37V65.981c0-2.905-2.095-5.26-5-5.26s-5 2.355-5 5.26V144h-.284c-.17 2.125-2.172 3.803-4.341 3.803c-2.281 0-4.375-1.849-4.375-4.13V63.817c0-1.824-2.612-3.096-4.744-3.096A5.257 5.257 0 0 0 8 65.981V185h.023c-.005 1-.018.693-.018.937c0 13.789 8.419 25.753 20.387 30.813c.037 4.868-.016 10.343-.02 16.228c-.018 6.336-.141 13.227-.214 20.487l-.461 22.85l-.723 24.427c-.106 4.158-.308 8.353-.476 12.56c-.177 4.208-.332 8.433-.581 12.658c-.423 8.448-.963 16.897-1.519 25.214l-1.727 24.421c-.556 7.92-1.125 15.577-1.535 22.837c-.474 7.26-.775 14.125-1.103 20.461c-.306 6.336-.508 12.145-.585 17.293c-.098 5.148-.08 9.636-.02 13.332c.055 3.696.17 6.6.264 8.58l.182 3.036c.63 10.716 9.188 19.512 20.169 20.169c11.849.709 22.029-8.321 22.738-20.169l.182-3.036c.094-1.98.21-4.884.264-8.58c.06-3.696.077-8.184-.02-13.332c-.077-5.148-.279-10.956-.585-17.293c-.328-6.336-.628-13.2-1.103-20.461c-.41-7.26-.979-14.917-1.535-22.837l-1.727-24.421c-.556-8.316-1.096-16.765-1.519-25.213c-.25-4.224-.405-8.448-.581-12.656c-.169-4.208-.37-8.399-.476-12.557l-.723-24.421l-.461-22.837c-.073-7.26-.196-14.125-.214-20.461c-.004-5.885-.057-11.307-.02-16.175c11.968-5.06 20.387-17.129 20.387-30.918c0-.244-.013.063-.018-.937H75V65.981c0-2.905-2.678-5.26-5.583-5.26z" />
                      </svg>
                    </div>
                    <div>Makan siang</div>
                  </Link>
                </li>
              </ul>
            </li>
            {user.role !== "USER" ? (
              <li>
                <Link className="flex" to="/penanggungjawab">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h4 w-4 fill-current"
                      viewBox="0 0 28 28"
                    >
                      <path d="M8.5 9.5a3.75 3.75 0 1 0 0-7.5a3.75 3.75 0 0 0 0 7.5ZM2 12.982C2 11.887 2.887 11 3.982 11h5.6a4.75 4.75 0 0 0 2.294 6H9.483a2.983 2.983 0 0 0-2.758 1.847c-2.005-.371-3.207-1.372-3.894-2.49C2 15.01 2 13.618 2 13.378v-.395ZM16.123 17h2.395c1.245 0 2.312.763 2.758 1.847c2.005-.371 3.207-1.372 3.894-2.49c.83-1.348.83-2.74.83-2.98v-.395A1.982 1.982 0 0 0 24.018 11h-5.6a4.75 4.75 0 0 1-2.294 6ZM23.25 5.75a3.75 3.75 0 1 1-7.5 0a3.75 3.75 0 0 1 7.5 0ZM7.5 19.982C7.5 18.887 8.387 18 9.482 18h9.036c1.095 0 1.982.887 1.982 1.982v.395c0 .24 0 1.632-.83 2.98C18.8 24.773 17.106 26 14 26s-4.8-1.228-5.67-2.642c-.83-1.349-.83-2.74-.83-2.981v-.395ZM14 16.5A3.75 3.75 0 1 0 14 9a3.75 3.75 0 0 0 0 7.5Z" />
                    </svg>
                  </div>
                  <div>Penanggung Jawab</div>
                </Link>
              </li>
            ) : null}
            <li>
              <Link className="flex" to="/tentang">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    className="h4 w-4 fill-current"
                    viewBox="0 0 48 48"
                  >
                    <path d="M24,4C12.972,4,4,12.972,4,24c0,3.186,0.77,6.343,2.232,9.172l-2.139,7.657c-0.242,0.867,0.003,1.802,0.64,2.439	c0.475,0.475,1.115,0.732,1.771,0.732c0.224,0,0.449-0.03,0.67-0.092l7.661-2.139C17.662,43.23,20.817,44,24,44	c11.028,0,20-8.972,20-20S35.028,4,24,4z M22.5,14.5c0-0.828,0.671-1.5,1.5-1.5s1.5,0.672,1.5,1.5v12c0,0.828-0.671,1.5-1.5,1.5	s-1.5-0.672-1.5-1.5V14.5z M24,35c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C26,34.105,25.105,35,24,35z"></path>
                  </svg>
                </div>
                <div>Tentang</div>
              </Link>
            </li>
            <li>
              <button onClick={logout} className="flex">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h4 w-4 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z" />
                  </svg>
                </div>
                <div>Logout</div>
              </button>
            </li>
          </ul>
        </div>
        <Link
          to="/"
          className="font-medium font-serif text-xl text-tPrimary tracking-wide px-3"
        >
          si
          <span className="bg-black rounded px-1">PJ</span>
        </Link>
      </div>
      <div className="navbar-center text-tPrimary hidden lg:flex">
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
          {user.role !== "USER" ? (
            <li>
              <Link to="/penanggungjawab">Penanggung Jawab</Link>
            </li>
          ) : null}
          <li>
            <Link to="/tentang">Tentang</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <AvatarComp />
      </div>
      <ConfirmComp confirm={confirm} setConfirm={setConfirm} />
    </div>
  );
}
