import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Sarapan from "./pages/sarapan";
import MakanSiang from "./pages/makansiang";
import PenanggungJawab from "./pages/penanggungjawab";
import Tentang from "./pages/tentang";
import "./App.css";
import LoginComp from "./pages/login";
import RegisterComp from "./pages/register";
import { useDispatch } from "react-redux";
import { setUser, setToken } from "./reducer/myReducer";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useEffect } from "react";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get("user")) {
      console.log("login berhasil");
      dispatch(setUser(jwtDecode(Cookies.get("user"))));
      dispatch(setToken(Cookies.get("user")));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get("user")]);
  return (
    <Routes>
      <Route path="/login" element={<LoginComp />} />
      <Route path="/register" element={<RegisterComp />} />
      <Route path="/" element={<Dashboard />} />
      <Route path="/sarapan" element={<Sarapan />} />
      <Route path="/makansiang" element={<MakanSiang />} />
      <Route path="/penanggungjawab" element={<PenanggungJawab />} />
      <Route path="/tentang" element={<Tentang />} />
      <Route path="/*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
}

export default App;
