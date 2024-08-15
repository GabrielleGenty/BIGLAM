import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF,faTwitter,faInstagram} from "@fortawesome/free-brands-svg-icons";



function Footer() {
  return (
    <footer>
    <p>Footer</p>
    <p>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebookF} /> 
        </a> | 
    
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
        </a> | 
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
        </a>
       
      </p>
    <p >
      <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>|{""}
      <Link to="/conditions-d-utilisation">Condtions d&apos; utilisation </Link>
    
    </p>
    </footer>
  )
}

export default Footer;