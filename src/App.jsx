import Home from "./Home";
import About from "./About";
import Contact from "./contact.jsx";
import Laser from "./Laser";
import "./style.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import "./laser.css";
import "./Contact.css";
import Beauty from "./Beauty.jsx";
import Skincare from "./Skincare.jsx";


function App() {
  return (
    <>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="laser" element={<Laser />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="skincare" element={<Skincare />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;