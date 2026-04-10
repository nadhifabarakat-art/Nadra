import { Link } from "react-router-dom";
import "./skincare.css";
import skincare from "./skincare.json";

const Skincare = () => {
    return (
        <section className="skincare-container">

            {skincare.map((item) => (
                <div key={item.id} className="skincare-card">

                    <div className="skincare-content">
                        <h3>{item.name}</h3>

                        {/* content */}
                        <p className="content">
                            {item.content}
                        </p>

                        {/* duration + price تحت content */}
                        <p className="duration">
                            ⏱ {item.duration}
                        </p>

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
    );
};

export default Skincare;