import React, {Component} from 'react'
import List from './List'
import Spinner from './Spinner'

import {PATH_BASE, PATH_MOVIE, PATH_SEARCH, API_KEY, PATH_PAGE, DEFAULT_PAGE} from '../api/index'
import Button from './Button'

class SearchResults extends Component {
  _isMounted = false

  state = {
    movies    : {},
    isLoading : true
  }

  getQueryStrings = (term) => {
    const query= new URLSearchParams (term)
    const searchTerm = query.get('query')
    return searchTerm
  }

  getSearchedMovies = (searchTerm, page) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${searchTerm}&${PATH_PAGE}${page}`)
    .then(res => 
      (this._isMounted) && res.json()
    )
    .then(movies => { this.setSearchedMovies(movies)})
  }

  setSearchedMovies = (movies) => {
    const {results, page, total_results, total_pages } = movies

    const olderSearchedResults = page !== 1 ? this.state.movies.results : []

    const newerSearchedResults = [
      ...olderSearchedResults,
      ...results
    ]

    this.setState({ movies    : {results: newerSearchedResults, page, total_results, total_pages},
                    isLoading : false})
  }


  componentDidMount = () => {
    this._isMounted = true
    this.getSearchedMovies(this.getQueryStrings(this.props.location.search), DEFAULT_PAGE)
  }

  //prevCode
  // componentDidUpdate = (nextProps) => {
  //   this.getSearchedMovies(this.getQueryStrings(nextProps.location.search), DEFAULT_PAGE)
  // }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props)
    this.getSearchedMovies(this.getQueryStrings(prevProps.location.search), DEFAULT_PAGE)
  }

  // //Can't perform a React state update on an unmounted component
  // componentWillUnmount(state, callback){
  //   return
  // }

  componentWillUnmount(){
    this._isMounted = false
  }


  render(){
    const {movies, isLoading} = this.state
    const {page} = movies
    const searchTerm =  this.getQueryStrings(this.props.location.search)
    return (
      <>
        {isLoading && 
          <Spinner />
        }
      
        <div className='container'>

                { movies.results &&       
                <div>
                  <p style={{color:'#fff', 
                              marginBottom:'10px', 
                              display:'table', 
                              margin: 'auto'}}> 
                  {movies.total_results} results found related to '{searchTerm}'</p>
                  <List list={movies.results}/> 
                  <Button className='Button' text='Load More' 
                  onClick={()=>this.getSearchedMovies(searchTerm, page+1)} /> 
                </div>      
                }

        </div>
    </>
    )
  }
}

export default SearchResults

//2nND SEARCH RESULTS JOIN THE FIRST RESULT
// import React, {Component} from 'react'
// import List from './List'

// import {PATH_BASE, PATH_MOVIE, PATH_SEARCH, API_KEY, PATH_PAGE, DEFAULT_PAGE} from '../api/index'
// import Button from './Button'

// class SearchResults extends Component {
//   state = {
//     movies: {}
//   }

//   componentDidMount = () => {
//     this.getSearchedMovies(this.props.match.params.searchTerm, DEFAULT_PAGE)
//   }

//   getSearchedMovies = (searchTerm, page) => {
//     fetch(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${searchTerm}&${PATH_PAGE}${page}`)
//     .then(res => res.json())
//     .then(movies => { this.setSearchedMovies(movies)})
//   }

//   setSearchedMovies = (movies) => {
//     const {results, page, total_results, total_pages } = movies

//     const olderSearchedResults = page !== 1 ? this.state.movies.results : []

//     const newerSearchedResults = [
//       ...olderSearchedResults,
//       ...results
//     ]

//     this.setState({ movies : {results: newerSearchedResults, page, total_results, total_pages}})
//   }


//   render(){
//     const {movies} = this.state
//     const {page} = movies
//     const searchTerm = this.props.match.params.searchTerm
//     console.log(movies.results)
//     return (
      
//       <div className='container'>
//               { movies.results &&       
//               <div>
//                 <p style={{color:'#fff', 
//                             marginBottom:'10px', 
//                             display:'table', 
//                             margin: 'auto'}}> 
//                 {movies.total_results} results found related to '{searchTerm}'</p>
//                 <List list={movies.results}/>  
//               </div>      
//               }
//               <Button className='Button' text='Load More' 
//               onClick={()=>this.getSearchedMovies(searchTerm, page+1)} />
//       </div>
//     )
//   }
// }

// export default SearchResults




//HISTORY PUSH WITH ALL STATE PARAM
// import React from 'react'
// import List from './List'

// const SearchResults =({location, match})=> {
//     const {result} = location.payload

//      console.log(result)
//     return (
      
// <div className='container'>
// <p style={{color:'#fff', marginBottom:'10px', display:'table', margin: 'auto'}}> {result.total_results} results found related to '{match.params.searchTerm}'</p>
//         { result &&       
//           <List list={result.results}/>        
//         }
// </div>
//     )
// }

// export default SearchResults




//HISTORY VERS WITH SEPARATED PARAM 
// import List from './List'

// const SearchResults =({location})=> {
//     const result = location.state

//      const query = new URLSearchParams(location.search)
//      const term  = query.get('query')
//      console.log(result)
//     return (
      
// <div className='container'>
// <p style={{color:'#fff', marginBottom:'10px', display:'table', margin: 'auto'}}> {result.total_results} results found related to {term}</p>
//         { result &&       
//           <List list={result.results}/>        
//         }
// </div>
//     )
// }

// export default SearchResults

//REDIRECT VERS
// import React, {Component} from 'react'
// import List from './List'

// const SearchResults =(props)=> {
//     const {term, result} =props.location.payload
//     return (
// <div className='container'>
// <p style={{color:'#fff', marginBottom:'10px', display:'table', margin: 'auto'}}> {result.total_results} results found related to '{term}'</p>
//         { result &&       
          
//           <List list={result.results}/>

//         }
// </div>
//     )
// }

// export default SearchResults
