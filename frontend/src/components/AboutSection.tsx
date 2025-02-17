import React from "react";

interface props {
}

const AboutSection: React.FC<props> = () => {

    return (
        <>
            <section id="about">
                <div className="container mt-4 pt-4">
                    <h1 className="text-center">Data</h1>
                    <div className="row mt-4 m-auto">
                        <div className="row">
                            <p>
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi eius placeat veritatis commodi odit ipsum hic repellendus tempora reprehenderit voluptates iste dolor similique quos velit accusantium alias tempore beatae, delectus sunt magni optio perferendis dolores! Enim deleniti amet nam quibusdam? Quibusdam nihil autem ad. Fugit molestiae debitis inventore omnis quasi?
                            </p>
                            <div className="progress mt-2 mb-2" role="progressbar" aria-label="Warning striped example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{height: "24px"}}>
                                <div className="progress-bar progress-bar-striped bg-dark" style={{ width: "70%" }}>Lorem</div>
                            </div>
                            <div className="progress mt-2 mb-2" role="progressbar" aria-label="Warning striped example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{height: "24px"}}>
                                <div className="progress-bar progress-bar-striped bg-dark" style={{ width: "85%" }}>Lorem</div>
                            </div>
                            <div className="progress mt-2 mb-2" role="progressbar" aria-label="Warning striped example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{height: "24px"}}>
                                <div className="progress-bar progress-bar-striped bg-dark" style={{ width: "75%" }}>Lorem</div>
                            </div>
                            <div className="progress mt-2 mb-2" role="progressbar" aria-label="Warning striped example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{height: "24px"}}>
                                <div className="progress-bar progress-bar-striped bg-dark" style={{ width: "80%" }}>Lorem</div>
                            </div>
                            <div className="progress mt-2 mb-2" role="progressbar" aria-label="Warning striped example" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100} style={{height: "24px"}}>
                                <div className="progress-bar progress-bar-striped bg-dark" style={{ width: "90%" }}>Lorem</div>
                            </div>
                            <div className="row text-end">
                                <small className="cap">Lorem ipsum dolor sit amet</small>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AboutSection;
