import { useState } from "react";

import "../style/contact.css";

const Contact = () => {
  const [messageSent, setMessageSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
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
              <input type="text" placeholder="Name" required />
              <input type="text" placeholder="Nummer" required />
              <input type="email" placeholder="E-Mail" required />
              <textarea placeholder="Nachricht..." rows="5" required></textarea>
              <dev className="suche">
                <label className="check-item">
                  <input type="checkbox" />
                  Laser
                </label>

                <label className="check-item">
                  <input type="checkbox" />
                  Skincare
                </label>
              </dev>
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
