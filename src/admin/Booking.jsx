import { useState, useEffect } from "react";
import "./style/sidebar.css";
import axios from "axios";

const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/contact/");
        setBookings(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBookings();
  }, []);

  const deleteBooking = (id) => {
    if (window.confirm("متأكدة تحذفي؟")) {
      const updated = bookings.filter((b) => b.id !== id);
      setBookings(updated);
      localStorage.setItem("bookings", JSON.stringify(updated));
    }
  };

  return (
    <div className="booking-container">
      <h2>الحجوزات</h2>

      {bookings.length === 0 ? (
        <p className="no-bookings">لا يوجد حجوزات بعد</p>
      ) : (
        bookings.map((b) => (
          <div key={b.id} className="booking-card">
            <p>
               <strong>{b.name}</strong>
            </p>
            <p> {b.phone}</p>
            <p> {b.email}</p>
            <p> {b.session}</p>
            <p> {b.date}</p>
            <button className="btn-delete" onClick={() => deleteBooking(b.id)}>
              حذف
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Booking;
