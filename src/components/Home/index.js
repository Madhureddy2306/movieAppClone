import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import {HiOutlineSearch} from 'react-icons/hi'
import MoviesContext from '../../MoviesContext'
import Footer from '../Footer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const randomNumber = Math.ceil(Math.random() * 10)

class Home extends Component {
  state = {
    originalMoviesList: [],
    trendingMoviesList: [],
    requestFailed: false,
  }

  componentDidMount() {
    this.getMovies(randomNumber)
  }

  getMovies = async randomNum => {
    const jwtToken = Cookies.get('jwt_token')

    const originalsUrl = 'https://apis.ccbp.in/movies-app/originals'
    const trendingUrl = 'https://apis.ccbp.in/movies-app/trending-movies'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const originalsResponse = await fetch(originalsUrl, options)
      const trendingResponse = await fetch(trendingUrl, options)

      const originalsData = await originalsResponse.json()
      const trendingData = await trendingResponse.json()

      if (originalsResponse.ok && trendingResponse.ok) {
        const originalsCamelData = originalsData.results.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          overview: eachMovie.overview,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }))

        const trendingCamelData = trendingData.results.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          overview: eachMovie.overview,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }))

        const setImage = () => {
          const bgEle = document.getElementById('random')
          const imgUrl = originalsCamelData[randomNum].backdropPath
          bgEle.style.backgroundImage = `url(${imgUrl})`
        }

        this.setState(
          {
            originalMoviesList: originalsCamelData,
            trendingMoviesList: trendingCamelData,
            requestFailed: false,
          },
          setImage,
        )
      } else if (originalsResponse.ok && trendingResponse.ok === false) {
        const originalsCamelData = originalsData.results.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          overview: eachMovie.overview,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }))

        this.setState({
          originalMoviesList: originalsCamelData,
          requestFailed: true,
        })
      } else if (originalsResponse.ok === false && trendingResponse.ok) {
        const trendingCamelData = trendingData.results.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          overview: eachMovie.overview,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }))

        this.setState({
          trendingMoviesList: trendingCamelData,
          requestFailed: true,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderLoader = () => (
    <div className="loader-container-home" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  renderRandomMovie = (randomNum, list) => {
    const randomMovie = list[randomNum]

    return (
      <div className="random-div">
        <h1 className="random-movie-h1">{randomMovie.title}</h1>
        <h1 className="random-movie-p">{randomMovie.overview}</h1>
        <Link to={`/movies/${randomMovie.id}`}>
          <button type="button" className="play-btn">
            Play
          </button>
        </Link>
      </div>
    )
  }

  renderTrendingVideos = () => {
    const {trendingMoviesList} = this.state

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings} className="slider">
        {trendingMoviesList.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id} className="link-card">
            <img src={each.posterPath} alt={each.title} className="img-slide" />
          </Link>
        ))}
      </Slider>
    )
  }

  renderOriginalVideos = () => {
    const {originalMoviesList} = this.state

    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            initialSlide: 3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings} className="slider">
        {originalMoviesList.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id} className="link-card">
            <img src={each.posterPath} alt={each.title} className="img-slide" />
          </Link>
        ))}
      </Slider>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701170785/alert-triangle_prhrds.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="fail-para">Something went wrong. Please try again</p>
      <button type="button" className="try-btn" onClick={this.getMovies}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {originalMoviesList, trendingMoviesList, requestFailed} = this.state

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
            <div className="home-main">
              <nav className="header-main">
                <div className="first-div">
                  <Link
                    to="/"
                    className="logo-link"
                    id="home"
                    onClick={triggerOption}
                  >
                    <img
                      src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701065357/Group_7399_r1dyde.svg"
                      alt="website logo"
                      id="home"
                      className="movies-icon"
                      onClick={triggerOption}
                    />
                  </Link>
                  <Link
                    to="/"
                    onClick={triggerOption}
                    id="home"
                    className={`link-item ${homeStyle}`}
                  >
                    <p id="home" className={`link-item ${homeStyle}`}>
                      Home
                    </p>
                  </Link>
                  <Link
                    to="/popular"
                    onClick={triggerOption}
                    id="popular"
                    className={`link-item ${popularStyle}`}
                  >
                    <p id="popular" className={`link-item ${popularStyle}`}>
                      Popular
                    </p>
                  </Link>
                </div>
                <ul className="second-div">
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
                    >
                      <HiOutlineSearch className="search-icon" />
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
                    />
                  </Link>
                </ul>
              </nav>
              <ul className="mini-nav-home">
                <Link to="/" className="nav-l">
                  <li className="nav-link">Home</li>
                </Link>
                <Link to="/popular" className="nav-l">
                  <li className="nav-link">Popular</li>
                </Link>
                <Link to="/account" className="nav-l">
                  <li className="nav-link">Account</li>
                </Link>
                <Link to="/search" className="nav-l">
                  <li className="nav-link">Search</li>
                </Link>
              </ul>
              <div className="random-movie" id="random">
                {originalMoviesList.length === 0 ? (
                  <div className="pass-1">
                    {requestFailed
                      ? this.renderFailureView()
                      : this.renderLoader()}
                  </div>
                ) : (
                  this.renderRandomMovie(randomNumber, originalMoviesList)
                )}
              </div>
              <div className="bottom-div">
                <h1 className="movies-category">Trending Now</h1>
                {originalMoviesList.length === 0 ? (
                  <div className="pass">
                    {requestFailed
                      ? this.renderFailureView()
                      : this.renderLoader()}
                  </div>
                ) : (
                  this.renderTrendingVideos()
                )}
                <h1 className="movies-category">Originals</h1>
                {trendingMoviesList.length === 0 ? (
                  <div className="pass">
                    {requestFailed
                      ? this.renderFailureView()
                      : this.renderLoader()}
                  </div>
                ) : (
                  this.renderOriginalVideos()
                )}
              </div>
              <Footer />
            </div>
          )
        }}
      </MoviesContext.Consumer>
    )
  }
}

export default Home
