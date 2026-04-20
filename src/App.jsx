import Home from "./Home";
import About from "./About";
import Contact from "./contact.jsx";
import Laser from "./Laser";
import Offers from "./Offers";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import "./styles/App.css";
import Beauty from "./Beauty.jsx";
import Skincare from "./Skincare.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/laser" element={<Laser />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
