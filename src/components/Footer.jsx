import React from 'react'
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  return (
    <footer>
  <section className="ft-main">
    <div className="ft-main-item">
      <h2 className="ft-title">About</h2>
      <ul>
        <li><Link to="drinks">Shop</Link></li>
        <li><Link to="about">Our story</Link></li>
        <li><Link to="*">Careers</Link></li>
        <li><Link to="">Services</Link></li>
      </ul>
    </div>
    <div className="ft-main-item">
      <h2 className="ft-title">Resources</h2>
      <ul>
        <li><Link to="drinks">Docs</Link></li>
        <li><Link to="drinks">Shop</Link></li>
      </ul>
    </div>
    <div className="ft-main-item">
      <h2 className="ft-title">Contact</h2>
      <ul>
        <li><Link to="">Help</Link></li>
        <li><Link to="">Contact us</Link></li>
      </ul>
    </div>
    <div class="ft-main-item">
      <h2 class="ft-title">Stay Updated</h2>
      <p>Subscribe to our newsletter to get our latest news.</p>
      <form>
        <input className="input text-primary mx-5" type="email" name="email"/ >
        <button className="form-button">Subscribe</button>
      </form>
    </div>
  </section>
  <section class="ft-social">
    <ul class="ft-social-list">
      <li><i class="fab fa-facebook"></i></li>
      <li><i class="fab fa-twitter"></i></li>
      <li><i class="fab fa-instagram"></i></li>
      <li><i class="fab fa-github"></i></li>
      <li><i class="fab fa-linkedin"></i></li>
      <li><i class="fab fa-youtube"></i></li>
    </ul>
  </section>
  <section className="ft-legal">
    <ul className="ft-legal-list">
      <li><Link to="">Terms &amp; Conditions</Link></li>
      <li><Link to="">Privacy Policy</Link></li>
      <li>&copy; 2022 Copyright Vitalcool Inc.</li>
    </ul>
  </section>
</footer>
  )
}

export default Footer