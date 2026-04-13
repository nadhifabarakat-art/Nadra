import "./Home.css";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const getSkincare = async () => {
    try {
      const res = await axios.get("http://localhost:3000/skincare");
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getSkincare();
  }, []);

  return (
    <>
      <section className="home">
        <div className="home-content">
          <h1>أهلاً بك في مركز ندرا</h1>

          <p>
            نرحب بكم في مركز ندرا، حيث نقدم خدمات مميزة وبيئة مريحة تلبي
            احتياجاتكم. نسعى دائماً إلى تقديم أفضل تجربة لعملائنا من خلال الجودة
            والاحترافية.
          </p>

          <p>اكتشف خدماتنا المتنوعة وتعرف أكثر على ما نقدمه لكم.</p>
        </div>
      </section>
    </>
  );
};

export default Home;
