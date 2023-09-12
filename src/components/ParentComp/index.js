import React, { useEffect, useState } from "react";
import NavComp from "../NavComp";
import FooterComp from "../FooterComp";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "../../reducer/myReducer";
import jwtDecode from "jwt-decode";

export default function ParentComp({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (Cookies.get("user")) {
      dispatch(setUser(jwtDecode(Cookies.get("user"))));
      dispatch(setToken(Cookies.get("user")));
      setIsLogin(true);
    } else {
      navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("user")]);

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
