import React from "react";

interface props {
}

const ServicesSection: React.FC<props> = () => {

    return (
        <>
            <section id="services">
                <div className="container">
                    <h1 className="text-center">Services</h1>
                    <div className="row">
                        <div className="col-lg-4 col-md-6 mt-4">
                            <div className="card servicesText">
                                <div className="card-body">
                                    <i className="servicesIcon bi bi-clock-fill"></i>
                                    <h4 className="card-title mt-3">Lorem ipsum</h4>
                                    <p className="card-text mt-3 h6">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, deleniti a. Harum veniam in sunt ipsum officiis reiciendis unde! Minima ab velit temporibus numquam, tempora iure libero autem error cum.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4">
                            <div className="card servicesText">
                                <div className="card-body">
                                    <i className="servicesIcon bi bi-stack"></i>
                                    <h4 className="card-title mt-3">Lorem ipsum</h4>
                                    <p className="card-text mt-3 h6">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore facere praesentium laudantium animi voluptatem, odit fugiat quae iusto et asperiores nam! Fuga id corrupti asperiores praesentium dolorem, tempore recusandae libero!
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4">
                            <div className="card servicesText">
                                <div className="card-body">
                                    <i className="servicesIcon bi bi-check-circle"></i>
                                    <h4 className="card-title mt-3">Lorem ipsum</h4>
                                    <p className="card-text mt-3 h6">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia reprehenderit consectetur, in consequuntur molestias, voluptas voluptatem hic porro provident rerum perferendis perspiciatis soluta distinctio, doloremque aperiam quod voluptatibus aliquam necessitatibus?
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4">
                            <div className="card servicesText">
                                <div className="card-body">
                                    <i className="servicesIcon bi bi-search"></i>
                                    <h4 className="card-title mt-3">Lorem ipsum</h4>
                                    <p className="card-text mt-3 h6">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum quae aliquid, quis repellat qui similique magni, magnam dolores eveniet porro quod veniam accusantium non exercitationem, fugiat minus reprehenderit dolorem pariatur?
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4">
                            <div className="card servicesText">
                                <div className="card-body">
                                    <i className="servicesIcon bi bi-shield-shaded"></i>
                                    <h4 className="card-title mt-3">Lorem ipsum</h4>
                                    <p className="card-text mt-3 h6">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi voluptatem voluptatum esse et voluptatibus doloremque. Quisquam odio, corrupti alias optio eius corporis facere rem officia laborum quis quod cum harum.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 mt-4">
                            <div className="card servicesText">
                                <div className="card-body">
                                    <i className="servicesIcon bi bi-wrench-adjustable-circle"></i>
                                    <h4 className="card-title mt-3">Lorem ipsum</h4>
                                    <p className="card-text mt-3 h6">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Adipisci porro quae neque corrupti, cumque autem laboriosam minima eveniet, a similique perspiciatis ab deserunt quibusdam itaque est harum delectus asperiores dolor.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default ServicesSection;
