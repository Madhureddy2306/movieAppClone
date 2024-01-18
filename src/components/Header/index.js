import {Link, withRouter} from 'react-router-dom'
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
      const searchStyle = activeOption === 'search' ? 'plus' : ''
      const profileStyle = activeOption === 'search' ? 'plus-link' : ''

      return (
        <nav className="header-main">
          <ul className="first-div">
            <Link
              to="/"
              id="home"
              onClick={triggerOption}
              className="logo-link"
            >
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
              onClick={triggerOption}
              id="home"
              className={`link-item ${homeStyle}`}
            >
              Home
            </Link>

            <Link
              to="/popular"
              onClick={triggerOption}
              id="popular"
              className={`link-item ${popularStyle}`}
            >
              Popular
            </Link>
          </ul>
          <ul className={`second-div ${searchStyle}`}>
            <Link
              to="/search"
              className="link-btn"
              id="search"
              onClick={triggerOption}
            >
              <button
                type="button"
                className="search-btn"
                testid="searchButton"
                id="search"
                onClick={triggerOption}
              >
                <HiOutlineSearch
                  className="search-icon"
                  id="search"
                  onClick={triggerOption}
                />
              </button>
            </Link>

            <Link
              to="/account"
              className={`link ${profileStyle}`}
              id="account"
              onClick={triggerOption}
            >
              <img
                src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701080405/Avatar_aa6zzi.png"
                alt="profile"
                className="profile-img"
              />
            </Link>
            <Link to="/account" className="link-queue">
              <img
                src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701153539/add-to-queue_1_ws32q3.png"
                alt="queue"
                className="queue-img"
                id="account"
                onClick={triggerOption}
              />
            </Link>
          </ul>
        </nav>
      )
    }}
  </MoviesContext.Consumer>
)

export default withRouter(Header)
