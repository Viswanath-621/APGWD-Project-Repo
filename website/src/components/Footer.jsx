import React from "react";
import { MDBIcon } from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <footer className="footer">
      <section className="social-section">
        <div className="me-5 d-none d-lg-block">
          <span>Get connected with us on social networks:</span>
        </div>

        <div className="social-links">
          <a href="" className="text-reset">
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href="" className="text-reset">
            <MDBIcon fab icon="twitter" />
          </a>
          <a href="" className="text-reset">
            <MDBIcon fab icon="google" />
          </a>
          <a href="" className="text-reset">
            <MDBIcon fab icon="instagram" />
          </a>
          <a href="" className="text-reset">
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href="" className="text-reset">
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className="footer-content">
        <div className="column">
          <h6 className="text-uppercase">
            <h1 className="Hightt">Andhra Pradesh</h1>Ground Water Department
          </h6>
          <p>
            The Ground Water and Water Audit Department was founded in 1971 as
            the <br />
            Ground Water Department and renamed Ground Water and Water Audit
            Department in 2016. <br /> The Department is a multidisciplinary
            institution with experts in geophysics, hydrometeorology, and
            agronomy.
          </p>
        </div>

        <div className="column">
          <h6 className="text-uppercase">Products</h6>
          <p>
            <a href="#!" className="text-reset">
              Ground Water Levels
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              GEC State Summary
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              Trend Graphs
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              Laravel
            </a>
          </p>
        </div>

        <div className="column">
          <h6 className="text-uppercase">Useful links</h6>
          <p>
            <a href="https://apsgwd.ap.gov.in/home" className="text-reset">
              Official Site
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              Developers
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              About US
            </a>
          </p>
          <p>
            <a href="#!" className="text-reset">
              Contact
            </a>
          </p>
        </div>

        <div className="column">
          <h6 className="text-uppercase">Contact</h6>
          <p>
            <MDBIcon icon="phone" className="me-3" /> &nbsp; +91 08662574673
          </p>

          <p>
            <MDBIcon icon="envelope" className="me-3" /> &nbsp;
            director-apsgwd@rediffmail.com
          </p>

          <p>
            <MDBIcon icon="home" className="me-2" /> &nbsp; 4th & 5th Floor,
            Vysya Bhavan, <br />
            Namboori Gopalrao Street
            <br /> Vijayawada-520013
          </p>

          <p>Monday - Friday: 10:00 AM to 5:30 PM</p>
        </div>
      </section>

      <div className="copyright-section">
        © 2023 Copyright: &nbsp;
        <a className="text-reset fw-bold" href="#">
          VRSEC
        </a>
      </div>
    </footer>
  );
}
