import React from 'react'

const MoviesContext = React.createContext({
  activeOption: '',
  updateActiveOption: () => {},
})

export default MoviesContext
