import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MoviesContext from '../../MoviesContext'
import './index.css'

class SearchRoute extends Component {
  state = {
    requestFailed: false,
    initialSearchResultsList: [],
  }

  componentDidMount() {
    this.getSearchList()
  }

  componentWillUnmount() {
    this.setState({initialSearchResultsList: []})
  }

  getSearchList = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const url = ` https://apis.ccbp.in/movies-app/movies-search?query=""`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const searchResponse = await fetch(url, options)
      const searchData = await searchResponse.json()

      if (searchResponse.ok) {
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
      } else {
        this.setState({requestFailed: true})
      }
    } catch (error) {
      console.log(error)
    }
  }

  renderFailureView = () => (
    <div className="loader-container">
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

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={40} width={40} />
    </div>
  )

  filterList = inputWord => {
    const {initialSearchResultsList} = this.state
    const filteredList = initialSearchResultsList.filter(each =>
      each.title.includes(inputWord),
    )

    return (
      <>
        {filteredList.length > 0 ? (
          <ul className="bottom-list">
            {filteredList.map(each => (
              <Link
                to={`/movies/${each.id}`}
                key={each.id}
                className="link-item-search"
                id={each.id}
              >
                <img
                  src={each.posterPath}
                  alt={each.title}
                  className="search-img"
                />
              </Link>
            ))}
          </ul>
        ) : (
          <div className="no-results">
            <img
              src="https://res.cloudinary.com/dmhmf156f/image/upload/v1702290368/Group_7394_cdwsp1.png"
              alt="no results"
              className="no-results-img"
            />
            <p className="no-results-p">{`Your search for ${inputWord} did not find any matches.`}</p>
          </div>
        )}
      </>
    )
  }

  render() {
    const {requestFailed, initialSearchResultsList} = this.state

    return (
      <MoviesContext.Consumer>
        {value => {
          const {searchWord} = value

          return (
            <div className="search-main">
              <Header />
              <div className="movies-list">
                {initialSearchResultsList.length === 0 ? (
                  <>
                    {requestFailed
                      ? this.renderFailureView()
                      : this.renderLoader()}
                  </>
                ) : (
                  <>{searchWord !== '' ? this.filterList(searchWord) : null}</>
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
