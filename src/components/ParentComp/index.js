import React, { useEffect, useState } from "react";
import NavComp from "../NavComp";
import FooterComp from "../FooterComp";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ParentComp({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("user");

    if (!token) {
      navigate("/login");
    } else {
      setIsLogin(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLogin) {
    return (
      <div className="w-screen min-h-screen">
        <NavComp />
        <div className="p-5 min-h-screen w-screen">{children}</div>
        <FooterComp />
      </div>
    );
  }
}
