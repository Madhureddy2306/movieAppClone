import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class MovieDetails extends Component {
  state = {
    movieInfo: '',
    requestFailed: false,
  }

  componentDidMount() {
    this.getMovieDetails()
  }

  getMovieDetails = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token')

      const {match} = this.props
      const {params} = match
      const {movieId} = params

      const url = `https://apis.ccbp.in/movies-app/movies/${movieId}`

      const options = {
        method: 'GET',
        headers: {Authorization: `Bearer ${jwtToken}`},
      }

      const response = await fetch(url, options)
      const data = await response.json()

      if (response.ok) {
        const camelData = {
          adult: data.movie_details.adult,
          backdropPath: data.movie_details.backdrop_path,
          budget: data.movie_details.budget,
          id: data.movie_details.id,
          posterPath: data.movie_details.poster_path,
          overview: data.movie_details.overview,
          releasedDate: data.movie_details.release_date,
          runTime: data.movie_details.runtime,
          title: data.movie_details.title,
          voteAverage: data.movie_details.vote_average,
          voteCount: data.movie_details.vote_count,
          genres: data.movie_details.genres.map(each => ({
            id: each.id,
            name: each.name,
          })),
          spokenLanguages: data.movie_details.spoken_languages.map(each => ({
            id: each.id,
            englishName: each.english_name,
          })),
          similarMovies: data.movie_details.similar_movies.map(eachMovie => ({
            backdropPath: eachMovie.backdrop_path,
            id: eachMovie.id,
            overview: eachMovie.overview,
            posterPath: eachMovie.poster_path,
            title: eachMovie.title,
          })),
        }

        const setBg = () => {
          const divEle = document.getElementById('top-div')
          divEle.style.backgroundImage = `url(${camelData.backdropPath})`
        }

        this.setState({movieInfo: camelData, requestFailed: false}, setBg)
      } else {
        this.setState({requestFailed: true})
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderLoader = () => (
    <div className="loader-div" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  renderFailureView = () => (
    <div className="loader-div">
      <img
        src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701170785/alert-triangle_prhrds.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="fail-para">Something went wrong. Please try again</p>
      <button type="button" className="try-btn" onClick={this.getMovieDetails}>
        Try Again
      </button>
    </div>
  )

  renderMovieBody = () => {
    const {movieInfo} = this.state
    const adultOk = movieInfo.adult ? 'A' : 'U/A'

    return (
      <>
        <div className="movie-top-div" id="top-div">
          <h1 className="top-div-h1">{movieInfo.title}</h1>
          <div className="details-div">
            <p className="details-p">{`${parseInt(movieInfo.runTime / 60)}h ${
              movieInfo.runTime % 60
            }min`}</p>
            <p className="ua-p">{adultOk}</p>
            <p className="details-p">{movieInfo.releasedDate.slice(0, 4)}</p>
          </div>
          <p className="top-div-p">{movieInfo.overview}</p>
          <button type="button" className="top-div-play-btn">
            Play
          </button>
        </div>
        <div className="main-movie-info">
          <div className="categories-div">
            <ul className="info-div">
              <h1 className="genre-h1">Genres</h1>
              {movieInfo.genres.map(each => (
                <p className="genre-p" key={each.id}>
                  {each.name}
                </p>
              ))}
            </ul>
            <ul className="info-div">
              <h1 className="genre-h1">Audio Available</h1>
              {movieInfo.spokenLanguages.map(each => (
                <p className="genre-p" key={each.id}>
                  {each.englishName}
                </p>
              ))}
            </ul>
            <ul className="info-div">
              <h1 className="genre-h1">Rating Count</h1>
              <p className="genre-p">{movieInfo.voteCount}</p>
              <h1 className="genre-h1">Rating Average</h1>
              <p className="genre-p">{movieInfo.voteAverage}</p>
            </ul>
            <ul className="info-div">
              <h1 className="genre-h1">Budget</h1>
              <p className="genre-p">{movieInfo.budget}</p>
              <h1 className="genre-h1">Release Date</h1>
              <p className="genre-p">
                {format(new Date(`${movieInfo.releasedDate}`), 'do MMMM yyyy')}
              </p>
            </ul>
          </div>
          <div className="more-div">
            <h1 className="more-div-h1">More like this</h1>
            <ul className="movies-div">
              {movieInfo.similarMovies.map(each => (
                <Link
                  to={`/movies/${each.id}`}
                  className="link-style"
                  key={each.id}
                >
                  <li className="movie-li">
                    <img
                      src={each.posterPath}
                      alt={each.title}
                      className="movie-img"
                    />
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  render() {
    const {movieInfo, requestFailed} = this.state

    return (
      <>
        <div className="movie-details-main">
          <Header />
          <div className="movie-info-div">
            {movieInfo.length === 0 ? (
              <>
                {requestFailed ? this.renderFailureView() : this.renderLoader()}
              </>
            ) : (
              this.renderMovieBody()
            )}
          </div>
          <Footer />
        </div>
      </>
    )
  }
}

export default MovieDetails
