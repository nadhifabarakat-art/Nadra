import "./styles/About.css";

const About = () => {
  return (
    <section className="about">
      {/* الصف الأول */}
      <div className="about-row">
        <div className="about-text">
          <h2>من نحن</h2>
          <p>
            في مركز ندرا نقدم علاجات ليزر حديثة وآمنة للبشرة والجمال. نحن
            ملتزمون بتقديم تجربة مريحة وفعّالة لكل زبون 🌸
          </p>
        </div>

        <div className="about-img">
          <img src="/abou20.webp" alt="about" />
        </div>
      </div>

      {/* الصف الثاني */}
      <div className="about-row reverse">
        <div className="about-text">
          <h2>مهمتنا</h2>
          <p>
            هدفنا هو تقديم أفضل رعاية باستخدام أحدث التقنيات، ومساعدتك على
            الشعور بالثقة والجمال في كل زيارة.
          </p>
        </div>

        <div className="about-img">
          <img src="/beauty.jpg" alt="beauty" />
        </div>
      </div>
    </section>
  );
};

export default About;
