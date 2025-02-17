import React from "react";

interface props {
}

const MainSection: React.FC<props> = () => {

    return (
        <>
            <section className="bgimage" id="home">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hero-text">
                            <h2 className="hero_title tk-myriad-pro">Hi, it's our team.</h2>
                            <p className="hero_desc tk-proxima-nova">We are at the Kemppi 2025 hackathon.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainSection;
