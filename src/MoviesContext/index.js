import React from 'react'

const MoviesContext = React.createContext({
  activeOption: '',
  searchWord: '',
  updateActiveOption: () => {},
  updateSearchWord: () => {},
})

export default MoviesContext
