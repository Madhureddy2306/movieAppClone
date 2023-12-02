import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const randomNumber = Math.ceil(Math.random() * 10)

class Home extends Component {
  state = {
    originalMoviesList: [],
    trendingMoviesList: [],
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

    const originalsResponse = await fetch(originalsUrl, options)
    const originalsData = await originalsResponse.json()

    const originalsCamelData = originalsData.results.map(eachMovie => ({
      backdropPath: eachMovie.backdrop_path,
      id: eachMovie.id,
      overview: eachMovie.overview,
      posterPath: eachMovie.poster_path,
      title: eachMovie.title,
    }))

    const trendingResponse = await fetch(trendingUrl, options)
    const data = await trendingResponse.json()

    const trendingCamelData = data.results.map(eachMovie => ({
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
      },
      setImage,
    )
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  renderRandomMovie = randomNum => {
    const {originalMoviesList} = this.state
    const randomMovie = originalMoviesList[randomNum]

    return (
      <>
        <h1 className="random-movie-h1">{randomMovie.title}</h1>
        <p className="random-movie-p">{randomMovie.overview}</p>
        <Link to={`/movies/${randomMovie.id}`}>
          <button type="button" className="play-btn">
            Play
          </button>
        </Link>
      </>
    )
  }

  renderTrendingVideos = () => {
    const {trendingMoviesList} = this.state

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
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
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings} className="slider">
        {trendingMoviesList.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id} className="link-card">
            <div className="text">
              <img
                src={each.backdropPath}
                alt={each.title}
                className="img-slide"
              />
            </div>
          </Link>
        ))}
      </Slider>
    )
  }

  renderOriginalVideos = () => {
    const {originalMoviesList} = this.state

    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 1,
            infinite: true,
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
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
      ],
    }

    return (
      <Slider {...settings} className="slider">
        {originalMoviesList.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id} className="link-card">
            <div className="text">
              <img
                src={each.backdropPath}
                alt={each.title}
                className="img-slide"
              />
            </div>
          </Link>
        ))}
      </Slider>
    )
  }

  renderFailureView = () => (
    <div className="loader-container">
      <img
        src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701170785/alert-triangle_prhrds.png"
        alt="failure"
        className="fail-img"
      />
      <p className="fail-para">Something went wrong. Please try again</p>
      <button type="button" className="try-btn">
        Try Again
      </button>
    </div>
  )

  render() {
    const {originalMoviesList, trendingMoviesList} = this.state

    return (
      <div className="home-main">
        <Header />
        <div className="random-movie" id="random">
          <div className="movie-div">
            {originalMoviesList.length === 0
              ? this.renderLoader()
              : this.renderRandomMovie(randomNumber)}
          </div>
        </div>
        <div className="bottom-div">
          <h1 className="movies-category">Trending Now</h1>
          <div className="trending-movie-div">
            {originalMoviesList.length === 0
              ? this.renderLoader()
              : this.renderTrendingVideos()}
          </div>
          <h1 className="movies-category">Originals</h1>
          <div className="trending-movie-div">
            {trendingMoviesList.length === 0
              ? this.renderLoader()
              : this.renderOriginalVideos()}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default Home
