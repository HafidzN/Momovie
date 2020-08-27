import React, {Component} from 'react'
import { withRouter} from 'react-router-dom'

class Search extends Component {
    state = {
        term : ''
    }

    handleSearchChange =(e)=> {
        this.setState({term: e.target.value})
    }

    handleSearchSubmit =(e)=> {
        e.preventDefault()
        this.props.history.push({
          pathname : `/search`,
          search     : `?query=${this.state.term}`})
    }


    render(){
      const {term} = this.state

      return (
        <div   style={{width: '100%',
                       marginLeft: '10px'
                      }}>
          <form  onSubmit={this.handleSearchSubmit}>
           {/* <svg className="search-movie-input-icon"  width="16" height="19" viewBox="0 0 26 27" xmlns="http://www.w3.org/2000/svg"><title>search</title><path d="M25.64 24.562l-6.42-6.675c1.65-1.962 2.555-4.43 2.555-7C21.775 4.885 16.89 0 10.888 0 4.884 0 0 4.884 0 10.888c0 6.003 4.884 10.887 10.888 10.887 2.253 0 4.4-.68 6.237-1.97l6.467 6.725c.27.28.634.436 1.023.436.37 0 .72-.14.984-.396.564-.543.582-1.444.04-2.008zM10.887 2.84c4.437 0 8.047 3.61 8.047 8.048 0 4.437-3.61 8.047-8.047 8.047-4.438 0-8.048-3.61-8.048-8.047 0-4.438 3.61-8.048 8.048-8.048z" /></svg> */}

          <input type='text'
                  name='search' 
                  placeholder='Search Movies' 
                  onChange={(e)=>this.handleSearchChange(e)}
                  value={term}
                  />
          </form>

        </div>

      )
    }
}

export default withRouter(Search)


//2ND SEARCH RESULT JOIN THE FIRST RESULT
// import React, {Component} from 'react'
// import { withRouter} from 'react-router-dom'

// class Search extends Component {
//     state = {
//         term : ''
//     }

//     handleSearchChange =(e)=> {
//         this.setState({term: e.target.value})
//     }

//     handleSearchSubmit =(e)=> {
//         e.preventDefault()
//         this.props.history.push({pathname : `/search?query=${this.state.term}`})
//     }


//     render(){
//       const {term} = this.state

//       console.log(this.state)

//       return (
//         <div   style={{width: '100%',
//                        marginLeft: '10px'
//                       }}>
//           <form  onSubmit={this.handleSearchSubmit}
// >
//           <input type='text'
//                   name='search' 
//                   placeholder='Search Movies' 
//                   onChange={(e)=>this.handleSearchChange(e)}
//                   value={term}
//                   />
//           </form>

//         </div>

//       )
//     }
// }

// export default withRouter(Search)




//VERS GET DATA IN SEARCH DIRECTLY
// import React, {Component} from 'react'
// import {PATH_BASE, PATH_SEARCH, API_KEY, PATH_MOVIE} from '../api/index'
// import { withRouter} from 'react-router-dom'

// class Search extends Component {
//     state = {
//         term : '',
//         result: ''
//     }

//     handleSearchChange =(e)=> {
//         this.setState({term: e.target.value})
//     }

//     handleSearchSubmit =(e)=> {
//         e.preventDefault()
//         this.getSearchMovies(this.state.term)
//     }

//     getSearchMovies =(searchTerm) => {
//       fetch(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${searchTerm}`)
//       .then(res => res.json())
//       .then(result =>
//         this.props.history.push({
//           pathname : `/search?query=${searchTerm}`,
//           payload    : {result}
//         })
//         )
//         // history.push(pathname)
//     }

//     render(){
//       const {term} = this.state

//       console.log(this.state)

//       return (
//         <div   style={{width: '100%',
//                        marginLeft: '10px'
//                       }}>
//           <form  onSubmit={this.handleSearchSubmit}
// >
//           <input type='text'
//                   name='search' 
//                   placeholder='Search Movies' 
//                   onChange={(e)=>this.handleSearchChange(e)}
//                   value={term}
//                   />
//           </form>

//         </div>

//       )
//     }
// }

// export default withRouter(Search)


//HISTORY PUSH WITH SEPARATED PARAM (SEE SEARCH RESULT TO REVIEW)
// import React, {Component} from 'react'
// import {PATH_BASE, PATH_SEARCH, API_KEY, PATH_MOVIE} from '../api/index'
// import {Redirect, withRouter} from 'react-router-dom'

// class Search extends Component {
//     state = {
//         term : '',
//         result: ''
//     }

//     handleSearchChange =(e)=> {
//         this.setState({term: e.target.value})
//     }

//     handleSearchSubmit =(e)=> {
//         e.preventDefault()
//         this.getSearchMovies(this.state.term)
//     }

//     getSearchMovies =(searchTerm) => {
//       fetch(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${searchTerm}`)
//       .then(res => res.json())
//       .then(result =>
//         this.props.history.push(`/search?query=${searchTerm}`, result)
//       )
//     }

//     render(){
//       const {term} = this.state

//       console.log(this.state)

//       return (
//         <div   style={{width: '100%',
//                        marginLeft: '10px'
//                       }}>
//           <form  onSubmit={this.handleSearchSubmit}
// >
//           <input type='text'
//                   name='search' 
//                   placeholder='Search Movies' 
//                   onChange={(e)=>this.handleSearchChange(e)}
//                   value={term}
//                   />
//           </form>

//         </div>

//       )
//     }
// }

// export default withRouter(Search)





//REDIRECT VERS
// import React, {Component} from 'react'
// import {PATH_BASE, PATH_SEARCH, API_KEY, PATH_MOVIE} from '../api/index'
// import {Redirect} from 'react-router-dom'

// class Search extends Component {
//     state = {
//         term : '',
//         result: ''
//     }

//     handleSearchChange =(e)=> {
//         this.setState({term: e.target.value})
//     }

//     handleSearchSubmit =(e)=> {
//         e.preventDefault()
//         this.getSearchMovies(this.state.term)
//     }

//     getSearchMovies =(searchTerm) => {
//       fetch(`${PATH_BASE}${PATH_SEARCH}${PATH_MOVIE}?api_key=${API_KEY}&query=${searchTerm}`)
//       .then(res => res.json())
//       .then(result => this.setState({result}))
//     }

//     render(){
//       const {term, result} = this.state

//       console.log(this.state)

//       return (
//         <div   style={{width: '100%',
//                        marginLeft: '10px'
//                       }}>
//           <form  onSubmit={this.handleSearchSubmit}
// >
//           <input type='text'
//                   name='search' 
//                   placeholder='Search Movies' 
//                   onChange={(e)=>this.handleSearchChange(e)}
//                   value={term}
//                   />
//           </form>

//           { result &&
//             <Redirect 
//               to ={{ pathname: `/search?query=${term}`,
//                      payload : {term, result}
//                   }}/>
//           }
//         </div>

//       )
//     }
// }

// export default Search