import { useState } from "react";
import "../style/contact.css";
const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    laser: false,
    skincare: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(localStorage.getItem("bookings") || "[]");
    const newBooking = {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
      session:
        form.laser && form.skincare
          ? "Laser & Skincare"
          : form.laser
            ? "Laser"
            : "Skincare",
      date: new Date().toLocaleDateString("de-DE"),
    };
    localStorage.setItem("bookings", JSON.stringify([...existing, newBooking]));
    setMessageSent(true);
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
                placeholder="Name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Nummer"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <input
                type="email"
                placeholder="E-Mail"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <textarea
                placeholder="Nachricht..."
                rows="5"
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <div className="suche">
                <input
                  type="checkbox"
                  id="Laser"
                  checked={form.laser}
                  onChange={(e) =>
                    setForm({ ...form, laser: e.target.checked })
                  }
                />
                <label htmlFor="Laser">Laser</label>
                <br />
                <input
                  type="checkbox"
                  id="Skincare"
                  checked={form.skincare}
                  onChange={(e) =>
                    setForm({ ...form, skincare: e.target.checked })
                  }
                />
                <label htmlFor="Skincare">Skincare</label>
              </div>

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
                  href="https://www.instagram.com/<Nadhifa.-.b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram"
                >
                  <span>@Nadhifa.-.b</span>
                </a>
                <br />
                <a
                  href="https://www.instagram.com/<sidra-alsabasabi"
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
