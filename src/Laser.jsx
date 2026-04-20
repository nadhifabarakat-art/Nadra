import { Link } from "react-router-dom";
import "./styles/laser.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Api from "./Api.jsx";
const Laser = () => {
  const [laser, setLaser] = useState([]);

  const getLaser = async () => {
    try {
      const res = await Api.get("/laser");
      setLaser(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getLaser();
  }, []);

  return (
    <>
      <section className="Laser">
        {laser.map((item) => (
          <div key={item._id || item.id} className="laser-card">
            <img src={item.url} alt={item.title} />

            <div className="Laser-content">
              <h3>{item.title}</h3>
              <p>{item.shortContent}</p>
              <p>{item.content}</p>

              <p className="price">{item.price} €</p>

              <Link to="/contact">
                <button className="termine-button">احجز الآن</button>
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Laser;
