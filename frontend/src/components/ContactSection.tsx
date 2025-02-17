import React from "react";

interface props {
}

const ContactSection: React.FC<props> = () => {

  return (
    <>
      <section id="contact">
        <div className="container mt-3 contactContent">
          <h1 className="text-center">Contact Us</h1>
          <div className="row mt-4">
            <div className="col-lg-6 col-md-6 m-auto">
              {/* <!-- form fields --> */}
              <form action="" method="POST">
                <input type="email" className="form-control mt-3" placeholder="Email" name="email"></input>
                <div className="mb-3 mt-4">
                  <textarea className="form-control" rows={5} id="comment" name="message" placeholder="Project Details"></textarea>
                </div>
              </form>
              <div className="d-flex justify-content-lg-start justify-content-center mt-4">
                <button type="submit" className="btn btn-outline-dark btn-lg">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
