import { useState } from "react";
import axios from "axios";
import "../style/contact.css";

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    service: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/contact/", form);
      setMessageSent(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="contact">
      {messageSent ? (
        <p className="success-message">
          💖 نحن سعداء برسالتك وسيتواصل معك فريقنا قريباً
        </p>
      ) : (
        <div className="contact-container">
          <div className="contact-left">
            <h1>تواصل معنا</h1>
            <p>هل لديك سؤال أو ترغب بالتواصل معنا؟ لا تتردد في مراسلتنا 💬</p>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name"
                required
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Nummer"
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                placeholder="E-Mail"
                required
                onChange={handleChange}
              />
              <textarea
                name="message"
                placeholder="Nachricht..."
                rows="5"
                required
                onChange={handleChange}
              ></textarea>
              <input
                type="text"
                name="service"
                placeholder="Service (optional)"
                required
                onChange={handleChange}
              />
              <button type="submit">إرسال الرسالة</button>
            </form>
          </div>
          <div className="contact-lift">
            <div className="Uhr">
              <h4>Öffnungszeiten</h4>
              <p>Mo–Fr: 09:00 – 18:00</p>
              <p>Sa: 10:00 – 16:00</p>
              <p>So: Geschlossen</p>
            </div>
            <div className="social">
              <h4>Folge uns</h4>
              <div className="icons">
                <a
                  href="https://www.instagram.com/Nadhifa.-.b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <span>@Nadhifa.-.b</span>
                </a>
                <br />
                <a
                  href="https://www.instagram.com/sidra-alsabasabi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <span>@sidra-alsabasabi</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
