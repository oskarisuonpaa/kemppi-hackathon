import React from "react";

interface props {
}

const FooterSection: React.FC<props> = () => {

    return (
        <>
            <footer id="footer">
                <div className="container-fluid">
                    {/* <!-- social media icons --> */}
                    <div className="social-icons mt-0 pt-1">
                        <a href="https://fi.linkedin.com/showcase/kemppi-careers/" target="_blank"><i className="footer-icon bi bi-linkedin ms-3 me-3"></i></a>
                        <a href="https://github.com/oskarisuonpaa/kemppi-hackathon" target="_blank"><i className="footer-icon bi bi-github ms-3 me-3"></i></a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterSection;
