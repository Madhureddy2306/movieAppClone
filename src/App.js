import {useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import MoviesContext from './MoviesContext/index'
import LoginChecking from './components/LoginChecking'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import PopularPage from './components/PopularPage'
import MovieDetails from './components/MovieDetails'
import './App.css'

const App = () => {
  const [activeOption, updateActiveOption] = useState('home')

  const updateOption = id => {
    updateActiveOption(id)
  }

  return (
    <MoviesContext.Provider
      value={{
        activeOption,
        updateActiveOption: updateOption,
      }}
    >
      <Switch>
        <Route exact path="/login" component={LoginPage} />
        <LoginChecking exact path="/" component={Home} />
        <LoginChecking exact path="/popular" component={PopularPage} />
        <LoginChecking exact path="/movies/:movieId" component={MovieDetails} />
      </Switch>
    </MoviesContext.Provider>
  )
}

export default App