import {Link} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import MoviesContext from '../../MoviesContext'
import './index.css'

const Header = () => (
  <MoviesContext.Consumer>
    {value => {
      const {activeOption, updateActiveOption} = value

      const triggerOption = event => {
        updateActiveOption(event.target.id)
      }

      const homeStyle = activeOption === 'home' ? 'yes' : ''
      const popularStyle = activeOption === 'popular' ? 'yes' : ''

      return (
        <div className="header-main">
          <div className="first-div">
            <Link to="/" className="logo-link">
              <img
                src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701065357/Group_7399_r1dyde.svg"
                alt="website logo"
                className="movies-icon"
                onClick={triggerOption}
                id="home"
              />
            </Link>
            <Link
              to="/"
              className={`link-item ${homeStyle}`}
              id="home"
              onClick={triggerOption}
            >
              Home
            </Link>
            <Link
              to="/popular"
              className={`link-item ${popularStyle}`}
              id="popular"
              onClick={triggerOption}
            >
              Popular
            </Link>
          </div>
          <div className="second-div">
            <Link to="/search" className="link-btn">
              <button
                type="button"
                className="search-btn"
                data-testid="searchButton"
              >
                <HiOutlineSearch className="search-icon" />
              </button>
            </Link>
            <Link to="/account" className="link">
              <img
                src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701080405/Avatar_aa6zzi.png"
                alt="profile"
                className="profile-img"
              />
            </Link>
            <Link to="/" className="link-queue">
              <img
                src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701153539/add-to-queue_1_ws32q3.png"
                alt="queue"
                className="queue-img"
              />
            </Link>
          </div>
        </div>
      )
    }}
  </MoviesContext.Consumer>
)

export default Header
