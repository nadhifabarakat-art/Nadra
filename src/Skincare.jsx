import { Link } from "react-router-dom";
import "./Skincare.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Skincare = () => {
  const [skincare, setSkincare] = useState([]);

  const getSkincare = async () => {
    try {
      const res = await axios.get("http://localhost:3000/skincare");
      setSkincare(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSkincare();
  }, []);

  return (
    <section className="skincare-container">
      {skincare.map((item) => (
        <div key={item._id || item.id} className="skincare-card">
          <div className="skincare-content">
            <h3>{item.name}</h3>

            <p className="content">{item.content}</p>

            <p className="duration">⏱ {item.duration}</p>

            <p className="price">{item.price} €</p>

            <Link to="/contact">
              <button className="termine-button">احجز الآن</button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Skincare;
