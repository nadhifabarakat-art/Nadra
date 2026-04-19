import { useEffect, useState } from "react";
import axios from "axios";
import "../style/offers.css";

function Offers() {
  const [offers, setOffers] = useState([]);

  const getOffers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/offers");
      setOffers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOffers();
  }, []);

  return (
    <div className="offers-page">
      <h1 className="offers-title">عروض رمضان 🌙</h1>

      <div className="offers-container">
        {offers.map((offer) => (
          <div key={offer._id || offer.id} className="offer-card">
            <h3>{offer.name}</h3>

            <div className="offer-content">
              <p>الجلسات:</p>
              <ul>
                {offer.sessions?.map((s, index) => (
                  <li key={index}>{s}</li>
                ))}
              </ul>
            </div>

            <div className="offer-bottom">
              <p>السعر القديم: {offer.oldPrice}€</p>
              <p>السعر الجديد: {offer.newPrice}€</p>
            </div>

            <button className="termine-button">احجز الآن</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offers;
