import React, { useEffect, useState } from "react";
import NavComp from "../NavComp";
import FooterComp from "../FooterComp";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ParentComp({ children }) {
  const [tampil, setTampil] = useState(false);
  const token = Cookies.get("user");
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      setTampil(true);
    } else {
      navigate("/login");
    }
  }, []);

  if (tampil)
    return (
      <div className="w-screen min-h-screen">
        <NavComp />
        <div className="p-5 min-h-screen w-screen">{children}</div>
        <FooterComp />
      </div>
    );
}
