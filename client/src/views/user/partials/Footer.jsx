import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";



function Footer() {
  return (
    <footer>
    <nav>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebookF} /> 
        </a> 
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
        </a> 
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
        </a>
        </nav>
        <div>
          <Link to="/TermOfUse">Condtions d&apos; utilisation </Link>|{""}
          <Link to="/PrivacyPolicy">Politique de confidentialité</Link>
        </div>
    </footer>
  )
}

export default Footer;