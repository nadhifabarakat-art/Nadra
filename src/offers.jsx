import { useEffect, useState } from "react";

function Offers() {
  const [offers, setOffers] = useState([]);

  return (
    <div>
      <h1>عروض رمضان 🌙</h1>
      {offers.map((offer) => (
        <div key={offer.id}>
          <h3>{offer.name}</h3>
          <p>الجلسات:</p>
          <ul>
            {offer.sessions.map((s, index) => (
              <li key={index}>{s}</li>
            ))}
          </ul>
          <p>السعر القديم: {offer.oldPrice}$</p>
        </div>
      ))}
    </div>
  );
}
export default Offers;
