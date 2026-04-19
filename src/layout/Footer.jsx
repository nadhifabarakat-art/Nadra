const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-left">
                    <h2 className="logo">Nadra🌸 </h2>
                    <p> البشرة الجميلة تبدأ من هنا </p>
                </div>

                <div className="footer-center">
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/beauty">Beauty</a>
                    <a href="/contact">Contact</a>
                </div>

                <div className="footer-right">
                    <a href="https://www.instagram.com/Nadhifa.-.b" target="_blank">📸 @Nadhifa.-.b</a>
                    <a href="https://www.instagram.com/sidra-alsabasabi" target="_blank">📸 @sidra-alsabasabi</a>
                    <a href="tel:+49123456789">📞 +49 123 456789</a>
                    <a href="mailto:info@nadhifa.de">✉️ info@nadhifa.de</a>
                    <a href="mailto:info@sidra.de">✉️ info@sidra.de</a>

                </div>

            </div>

            <p className="copyright">
                © 2026 Nadra Beauty. Alle Rechte vorbehalten.            </p>

        </footer>
    );
}

export default Footer;