import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainn from "./Mainn";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";
import FormDetails from "./pages/FormDetails";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainn />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/employee" element={<Welcome />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/filldetails" element= {<FormDetails/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
