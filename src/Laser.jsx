import { Link } from "react-router-dom";
import "./laser.css";
import laser from "./laser.json";

const Laser = () => {
    return (
        <>
            <section className="Laser">
                {laser.map((item) => (
                    <div key={item.id} className="laser-card">
                        <img src={item.url} alt={item.title} />

                        <div className="Laser-content">
                            <h3>{item.title}</h3>
                            <p>{item.shortContent}</p>
                            <p>{item.content}</p>

                            <p className="price">
                                {item.price} €
                            </p>

                            <Link to="/contact">
                                <button className="termine-button">
                                    احجز الآن
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </section>
        </>

    );
};

export default Laser;