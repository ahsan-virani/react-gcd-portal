import React from 'react';
import { FormattedMessage } from 'react-intl';

import Img from './Img';
import Footer from './Footer';
import { FooterBtn } from './FooterClass';
import { Link } from 'react-router';
import FootLogoImg from './foot-logo.png';
import NavBar from './NavBar';
import Ul from './Ul';
import './styles.css';
//
class AppFooter extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Footer>
          <div className="wrapper">
              <div className="footer">
                  <div className="foot1">
                      <div className="foot-logo">
                          <Link to="/">
                            <Img src={FootLogoImg} alt="GlobalCoinDex" />


                            </Link>
                      </div>
                      <div className="foot-social">
                      <ul>
                          <li>
                              <Link to="/"><i className="fa fa-facebook" aria-hidden="true"></i></Link>
                          </li>
                          <li>
                              <Link to="/"><i className="fa fa-twitter" aria-hidden="true"></i></Link>
                          </li>
                          <li>
                              <Link to="/"><i className="fa fa-youtube" aria-hidden="true"></i></Link>
                          </li>
                          <li>
                              <Link to="/"><i className="fa fa-linkedin" aria-hidden="true"></i></Link>
                          </li>
                      </ul>

                  </div>
                  </div>
                  <div className="foot2">
                      <h1>NAVIGATIONS</h1>
                      <ul>
                          <li><Link to="/">Home</Link></li>
                          <li><Link to="/about">About</Link></li>
                          <li><Link to="/features">Features</Link></li>
                          <li><Link to="/security">Security</Link></li>
                      </ul>
                      <ul>
                          <li><Link to="/howitworks">How It Works</Link></li>
                          <li><Link to="/marketstats">Market Statistics</Link></li>
                          <li><Link to="/changelog">Change Log</Link></li>
                          <li><Link to="/contact">Contact Us</Link></li>
                      </ul>
                  </div>
                  <div className="foot3">
                      <h1>Join Our Mailing List</h1>
                      <p>Join us and stay up to date</p>
                      <input type="text" placeholder="Your Email here" />
                      <FooterBtn type="submit" />
                  </div>
                  <div className="clear"></div>
              </div>
          </div>
          <div className="copyright">
              <p>Copyrights © 2017 Global Coindex (GCD.)</p>
          </div>
      </Footer>

    );
  }
}

export default AppFooter;
