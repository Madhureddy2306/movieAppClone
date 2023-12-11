import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import MoviesContext from './MoviesContext/index'
import LoginChecking from './components/LoginChecking'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import PopularPage from './components/PopularPage'
import MovieDetails from './components/MovieDetails'
import SearchRoute from './components/Search'
import Account from './components/Account'
import NotFound from './components/NotFound'
import './App.css'

const App = () => {
  const [activeOption, updateActiveOption] = useState('home')
  const [searchWord, updateSearchWord] = useState('')

  const updateOption = id => {
    updateActiveOption(id)
  }

  const updateWord = id => {
    updateSearchWord(id)
  }

  return (
    <MoviesContext.Provider
      value={{
        activeOption,
        updateActiveOption: updateOption,
        searchWord,
        updateSearchWord: updateWord,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <LoginChecking exact path="/" component={Home} />
        <LoginChecking exact path="/popular" component={PopularPage} />
        <LoginChecking exact path="/movies/:movieId" component={MovieDetails} />
        <LoginChecking exact path="/search" component={SearchRoute} />
        <LoginChecking exact path="/account" component={Account} />
        <Route component={NotFound} />
      </Switch>
    </MoviesContext.Provider>
  )
}

export default App
