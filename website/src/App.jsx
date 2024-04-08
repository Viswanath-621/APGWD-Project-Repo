import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Mainn from "./Mainn";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Welcome from "./pages/Welcome";
import Admin from "./pages/Admin";
import FormDetails from "./pages/FormDetails";
import Jdmail from './Jointdirector/Jdmail';
import NotFoundPage from "./pages/NotFoundPage";
import NetworkMap from "./components/NetworkMap";
import Data from "./data/NTR.json"
import VillageSearch from "./components/Villagesearch";

function App() {

  // imp notes:  

  // Render Temp Backend api: "https://apgwdback.onrender.com"
  // Render Temp Fronend temp link: "https://apgwdfron.onrender.com/"

  //Render Temp2 Backend api: "https://apgwd-backend-server.onrender.com"
  
  //Render Final Backend api: "https://apgwd-backend-service.onrender.com"
  
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mainn />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/employee" element={<Welcome />} />
        <Route path="/admin" element={<Admin />} />
        <Route path='/jd' element={<Jdmail/>}/>
        <Route path="/filldetails" element= {<FormDetails/>} />
        <Route path="/netmap" element={<NetworkMap/>} />
        <Route path="/village" element={<VillageSearch/>} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
