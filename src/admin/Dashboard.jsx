import { useEffect, useState } from "react";
import axios from "axios";
import "./style/sidebar.css";

const Dashboard = () => {
  const [laserCount, setLaserCount] = useState(0);
  const [skincareCount, setSkincareCount] = useState(0);
  const [offersCount, setOffersCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const laser = await axios.get("http://localhost:3000/laser/");
        setLaserCount(laser.data.length);

        const skincare = await axios.get("http://localhost:3000/skincare/");
        setSkincareCount(skincare.data.length);

        const offers = await axios.get("http://localhost:3000/offers/");
        setOffersCount(offers.data.length);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCounts();
  }, []);

  const cards = [
    {
      title: "Laser Posts",
      count: laserCount,
      desc: "عدد خدمات الليزر المتاحة حالياً للزبائن",
    },
    {
      title: "Skincare Posts",
      count: skincareCount,
      desc: "عدد خدمات العناية بالبشرة المتاحة حالياً",
    },
    {
      title: "Offer Posts",
      count: offersCount,
      desc: "عدد العروض والتخفيضات المتاحة حالياً",
    },
  ];

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome To Dashboard</h1>
      <div className="dashboard-cards">
        {cards.map((card, index) => (
          <div key={index} className="dashboard-card">
            <h2 className="dashboard-card-title">{card.title}</h2>
            <p className="dashboard-card-count">{card.count}</p>
            <p className="dashboard-card-desc">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
