import Dashboard from "./pages/dashboard";
import { Route, Routes } from "react-router-dom";
import Sarapan from "./pages/sarapan";
import MakanSiang from "./pages/makansiang";
import PenanggungJawab from "./pages/penanggungjawab";
import Tentang from "./pages/tentang";
import "./App.css";
import LoginComp from "./pages/login";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<LoginComp />} />
      <Route path="/sarapan" element={<Sarapan />} />
      <Route path="/makansiang" element={<MakanSiang />} />
      <Route path="/penanggungjawab" element={<PenanggungJawab />} />
      <Route path="/tentang" element={<Tentang />} />
    </Routes>
  );
}

export default App;
