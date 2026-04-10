import "./Beauty.css";
import { useNavigate } from "react-router-dom";

const Beauty = () => {
    const navigate = useNavigate();

    return (
        <>

            <div className="beauty">
                <h1>خدمات الجمال</h1>
                <p>اختاري الخدمة المناسبة لك ✨</p>

                <div className="cards">

                    <div className="card" onClick={() => navigate("/laser")}>
                        <h2>Laser</h2>
                        <p>إزالة الشعر بتقنية حديثة وآمنة</p>
                    </div>

                    <div className="card" onClick={() => navigate("/skincare")}>
                        <h2>Skincare</h2>
                        <p>عناية متكاملة لبشرة صحية ونضرة</p>
                    </div>

                </div>
            </div>



        </>
    );
}
export default Beauty;