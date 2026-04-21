import { Route, Routes } from "react-router-dom";
import MainLayout from "./layout/MainLayout.jsx";
import AdminLayout from "./admin/AdminLayout.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/contact.jsx";
import Laser from "./pages/Laser.jsx";
import Offers from "./pages/Offers.jsx";
import Skincare from "./pages/Skincare.jsx";
import Beauty from "./pages/Beauty.jsx";
import Dashboard from "./admin/Dashboard";
import LaserPost from "./admin/LaserPost.jsx";
import SkincarePost from "./admin/SkincarePost.jsx";
<<<<<<< HEAD
import OfferPost from "./admin/OfferPost.jsx";
=======
import Booking from "./admin/Booking.jsx";
>>>>>>> b64e4b1cc34b817b2fea1ee9718200c80e5b04cb
import "./style/app.css";
import Booking from "./admin/Booking.jsx";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="laser" element={<Laser />} />
        <Route path="skincare" element={<Skincare />} />
        <Route path="offers" element={<Offers />} />

        <Route path="beauty">
          <Route index element={<Beauty />} />
          <Route path="laser" element={<Laser />} />
          <Route path="skincare" element={<Skincare />} />
          <Route path="offers" element={<Offers />} />
        </Route>
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="laser" element={<LaserPost />} />
        <Route path="skincare" element={<SkincarePost />} />
<<<<<<< HEAD
        <Route path="Offer" element={<OfferPost />} />
=======
>>>>>>> b64e4b1cc34b817b2fea1ee9718200c80e5b04cb
        <Route path="booking" element={<Booking />} />
      </Route>
    </Routes>
  );
};

export default App;
