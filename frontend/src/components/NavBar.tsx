import React from "react";

interface props {
}

const NavBar: React.FC<props> = () => {

  return (
    <>
      <nav className="navbar navbar-expand-lg fixed-top navbarScroll navbar-dark">
        <div className="container">
          <img className="logo" src="/images/logo.png" alt="" />
          <a className="navbar-brand display-2 tk-myriad-pro" href="#">Team Name</a>
          <button className="navbar-toggler custom-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse text-center" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item active">
                <a className="nav-link tk-proxima-nova" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link tk-proxima-nova" href="#about">Data</a>
              </li>
              <li className="nav-item">
                <a className="nav-link tk-proxima-nova" href="#services">Services</a>
              </li>
              <li className="nav-item">
                <a className="nav-link tk-proxima-nova" href="#contact">Contact service</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavBar;
