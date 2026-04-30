import { useState, useEffect } from "react";
import "./style/sidebar.css";
import axios from "axios";
const Booking = () => {
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await axios.get("https://nadra-kr80.onrender.com/contact/");
        setBookings(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getBookings();
  }, []);
  const deleteBooking = async (id) => {
    if (window.confirm("متأكدة تحذفي؟")) {
      try {
        await axios.delete(`https://nadra-kr80.onrender.com/Booking/${id}`);
        setBookings(bookings.filter((p) => p._id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="booking-container">
      <h2>الحجوزات</h2>
      {bookings.length === 0 ? (
        <p className="no-bookings">لا يوجد حجوزات بعد</p>
      ) : (
        bookings.map((b) => (
          <div key={b._id} className="booking-card">
            <p>
              <strong>{b.name}</strong>
            </p>
            <p> {b.phone}</p>
            <p> {b.email}</p>
            <p> {b.session}</p>
            <p> {b.date}</p>
            <button className="btn-delete" onClick={() => deleteBooking(b._id)}>
              حذف
            </button>
          </div>
        ))
      )}
    </div>
  );
};
export default Booking;
