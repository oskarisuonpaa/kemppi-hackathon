import React from "react";

interface props {
}

const FooterSection: React.FC<props> = () => {

    return (
        <>
            <footer id="footer">
                <div className="container-fluid">
                    {/* <!-- social media icons --> */}
                    <div className="social-icons mt-4">
                        <a href="https://www.linkedin.com/" target="_blank"><i className="footer-icon bi bi-linkedin ms-3 me-3"></i></a>
                        <a href="https://github.com/" target="_blank"><i className="footer-icon bi bi-github ms-3 me-3"></i></a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterSection;
