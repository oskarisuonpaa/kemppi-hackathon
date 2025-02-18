import React from "react";

const MainSection: React.FC = () => {

    return (
        <>
            <section className="bgimage" id="home">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 hero-text">
                            <h2 className="hero_title tk-myriad-pro" >Kemppi data visualiser.</h2>
                            <p className="hero_desc tk-proxima-nova">Made for Kemppi hackathon 2025, by team spark.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MainSection;
