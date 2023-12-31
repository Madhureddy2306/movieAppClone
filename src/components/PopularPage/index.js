import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class PopularPage extends Component {
  state = {
    loading: false,
    popularMoviesList: [],
    requestFailed: false,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    try {
      this.setState({loading: true})
      const jwtToken = Cookies.get('jwt_token')

      const url = 'https://apis.ccbp.in/movies-app/popular-movies'
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
      const response = await fetch(url, options)

      if (response.ok) {
        const data = await response.json()

        const camelData = data.results.map(eachMovie => ({
          backdropPath: eachMovie.backdrop_path,
          id: eachMovie.id,
          overview: eachMovie.overview,
          posterPath: eachMovie.poster_path,
          title: eachMovie.title,
        }))

        this.setState({
          loading: false,
          popularMoviesList: camelData,
          requestFailed: false,
        })
      } else {
        this.setState({loading: false, requestFailed: true})
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  renderPopularVideos = () => {
    const {popularMoviesList} = this.state

    return (
      <ul className="popular-div">
        {popularMoviesList.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id} className="link-items">
            <img
              alt={each.title}
              src={each.posterPath}
              className="popular-card"
            />
          </Link>
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div className="loader-container">
      <img
        src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701170785/alert-triangle_prhrds.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="fail-para">Something went wrong. Please try again</p>
      <button type="button" className="try-btn" onClick={this.getPopularMovies}>
        Try Again
      </button>
    </div>
  )

  render() {
    const {loading, requestFailed} = this.state

    return (
      <div className="popular-main">
        <Header />
        <div className="bottom-contained">
          {loading ? (
            this.renderLoader()
          ) : (
            <>
              {requestFailed
                ? this.renderFailureView()
                : this.renderPopularVideos()}
            </>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}

export default PopularPage
