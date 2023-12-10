import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-main">
    <h1 className="not-h1">Lost Your Way</h1>
    <p className="not-p">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-btn">
        Go to Home
      </button>
    </Link>
  </div>
)

export default NotFound
