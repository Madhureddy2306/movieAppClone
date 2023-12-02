import {FaGoogle, FaInstagram, FaTwitter, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <>
    <div className="icons-div">
      <FaGoogle className="icons" />
      <FaTwitter className="icons" />
      <FaInstagram className="icons" />
      <FaYoutube className="icons" />
    </div>
    <p className="contact-us">Contact Us</p>
  </>
)

export default Footer
