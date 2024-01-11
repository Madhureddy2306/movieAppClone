import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {HiOutlineSearch} from 'react-icons/hi'
import MoviesContext from '../../MoviesContext'
import './index.css'

class SearchRoute extends Component {
  state = {
    requestFailed: false,
    initialSearchResultsList: [],
    search: '',
    trigger: false,
  }

  componentDidMount() {
    this.getSearchList()
  }

  getSearchList = async () => {
    this.setState({initialSearchResultsList: []})
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const url = ` https://apis.ccbp.in/movies-app/movies-search?search=${search}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const searchResponse = await fetch(url, options)
      const searchData = await searchResponse.json()
      console.log(searchData)

      if (searchResponse.ok && searchData.results.length > 0) {
        const camelData = searchData.results.map(each => ({
          backdropPath: each.backdrop_path,
          id: each.id,
          overview: each.overview,
          posterPath: each.poster_path,
          title: each.title,
        }))

        this.setState({
          initialSearchResultsList: camelData,
          requestFailed: false,
        })
      } else if (searchResponse.ok && searchData.results.length === 0) {
        this.setState({requestFailed: false, initialSearchResultsList: [0]})
      } else if (searchResponse.status !== 200) {
        this.setState({requestFailed: true, initialSearchResultsList: []})
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderFailureView = () => (
    <div className="search-failure-container">
      <img
        src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701170785/alert-triangle_prhrds.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="fail-para">Something went wrong. Please try again</p>
      <button type="button" className="try-btn" onClick={this.getSearchList}>
        Try Again
      </button>
    </div>
  )

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  filterList = () => {
    const {initialSearchResultsList, search} = this.state

    return (
      <>
        {initialSearchResultsList[0] !== 0 ? (
          <ul className="bottom-list">
            {initialSearchResultsList.map(each => (
              <li className="li-s" key={each.id}>
                <Link to={`/movies/${each.id}`} className="link-item-search">
                  <img
                    src={each.backdropPath}
                    alt={each.title}
                    className="search-img"
                  />
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-results">
            <img
              src="https://res.cloudinary.com/dmhmf156f/image/upload/v1702290368/Group_7394_cdwsp1.png"
              alt="no movies"
              className="no-results-img"
            />
            <p className="no-results-p">{`Your search for ${search} did not find any matches.`}</p>
          </div>
        )}
      </>
    )
  }

  updateSearchWord = event => {
    this.setState({search: event.target.value})
  }

  setWord = () => {
    this.setState(
      {trigger: true, initialSearchResultsList: []},
      this.getSearchList,
    )
  }

  render() {
    const {
      requestFailed,
      initialSearchResultsList,
      search,
      trigger,
    } = this.state

    return (
      <MoviesContext.Consumer>
        {value => {
          const {activeOption, updateActiveOption} = value

          const triggerOption = event => {
            updateActiveOption(event.target.id)
          }

          const homeStyle = activeOption === 'home' ? 'yes' : ''
          const popularStyle = activeOption === 'popular' ? 'yes' : ''
          const profileStyle = activeOption === 'search' ? 'plus-link' : ''

          return (
            <div className="search-main">
              <nav className="header-main">
                <ul className="first-div">
                  <Link
                    to="/"
                    className="logo-link"
                    id="home"
                    onClick={triggerOption}
                  >
                    <img
                      src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701065357/Group_7399_r1dyde.svg"
                      alt="website logo"
                      className="movies-icon"
                    />
                  </Link>
                  <Link
                    to="/"
                    onClick={triggerOption}
                    id="home"
                    className={`link-item ${homeStyle}`}
                  >
                    <li>Home</li>
                  </Link>
                  <Link
                    to="/popular"
                    onClick={triggerOption}
                    id="popular"
                    className={`link-item ${popularStyle}`}
                  >
                    <li>Popular</li>
                  </Link>
                </ul>
                <ul className="second-div plus">
                  <div className="search-div">
                    <input
                      type="search"
                      className="search-bar"
                      id="input"
                      placeholder="Search"
                      value={search}
                      onChange={this.updateSearchWord}
                    />
                    <button
                      type="button"
                      className="search-icon-btn"
                      onClick={this.setWord}
                      testid="searchButton"
                    >
                      <HiOutlineSearch className="search-icon-bar" />
                    </button>
                  </div>
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
                    />
                  </Link>
                </ul>
              </nav>
              <div className="movies-list">
                {initialSearchResultsList.length === 0 ? (
                  <>
                    {requestFailed
                      ? this.renderFailureView()
                      : this.renderLoader()}
                  </>
                ) : (
                  <>{trigger ? this.filterList() : null}</>
                )}
              </div>
            </div>
          )
        }}
      </MoviesContext.Consumer>
    )
  }
}

export default SearchRoute
