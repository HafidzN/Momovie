import React, {Component} from 'react'
import {BrowserRouter, Route} from 'react-router-dom'
import NotificationSystem from 'react-notification-system'

import {app} from './firebase/index'

import Sidebar from './component/Sidebar'
import Navbar from './component/Navbar'
import MainPage from './component/MainPage'
import SearchResults from './component/SearchResults' 
import MoviePage from './component/MoviePage'
import Discover from './component/Discover'
import Filter from './component/Filter'
import Login from './component/Login'
import Logout from './component/Logout'
import Favourites from './component/Favourites'
import Spinner from './component/Spinner'
import './App.css'

import {PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING} from './api/index'

class App extends Component {
  
  

  constructor(props){
    super(props)
    this.state = {
      isAuthenticated : false,
      user            : null,
      isLoading       : true,
      favoriteMovies  : [],
      ...this.defaultState
    }
  }


  UNSAFE_componentWillMount = () => {
    app.auth().onAuthStateChanged((user)=>{
      if (user) {
        this.setState({
          isAuthenticated : true,
          user,
          isLoading: false
        })

        const userUid = app.auth().currentUser.uid;
        let favoriteMoviesRef = app.database().ref(userUid).child('favorites');
        favoriteMoviesRef.on('child_added', snapshot => {
        let fav = snapshot.val();
        this.setState({ favoriteMovies: [...this.state.favoriteMovies, fav] });
        })

      } else {
        this.setState({
          isAuthenticated : false,
          user : null,
          isLoading: false
        })
      }
    })
  }

  componentDidMount = () => {
    this.notificationSystem = React.createRef()
  }


  defaultState = {
    currentPath: '/',
    isWrapperActive: false, 
    isFilterOpen :true,
    filterValues : {
      year : new Date().getFullYear(),
      rating   : {
        min : 7,
        max : 10
      },
      duration : {
        min : 45,
        max : 250
      },
      sort_by: {
        value: 'vote_average',
        label: 'Rating'
      },
      order: {
        value: 'asc',
        label: 'Ascending'
      }
    }
  }

  currentPath = (currentPath) => {
    this.setState({currentPath})
  } 

  onChangeArrow = () => {
    this.setState( prevState => ({
      isWrapperActive: !prevState.isWrapperActive
    }))
  }


  updateFilter = (filterValues) => {
    this.setState({
      filterValues
    })
  }

  resetFilter = () => {this.setState(this.defaultState)}

  addToFavorite = (selectedMovie) => {
    const userUid = app.auth().currentUser.uid

     const showNotification = (isError) => {
        if (isError) {
          const notification = this.notificationSystem.current;
          notification.addNotification({
            message: 'An error occured',
            level: 'error'
          });
        } else {
          const notification = this.notificationSystem.current
          notification.addNotification({
            message: 'Liked',
            level: 'success'
        })
      }
     }

    app.database().ref(userUid).child('favorites').update({
      [selectedMovie]: selectedMovie
    }, showNotification)
  }

  removeFromFavorite = (selectedMovie) => {
    const userUid = app.auth().currentUser.uid

     const showNotification = (isError) => {
        if (isError) {
          const notification = this.notificationSystem.current;
          notification.addNotification({
            message: 'An error occured',
            level: 'error'
          });
        } else {
          const notification = this.notificationSystem.current
          notification.addNotification({
            message: 'Removed from your Favorite list',
            level: 'success'
        })
      }
     }

    app.database().ref(userUid).child('favorites').child(selectedMovie).remove(showNotification);
  }




  render(){
    const changeWrapper = this.state.isWrapperActive ? 'wrapper active' : 'wrapper'
    console.log('current path',this.state.currentPath)
    console.log('favorite list: ', this.state.favoriteMovies)
    const shouldDisplayFilter = (this.state.currentPath === '/' && !this.state.isWrapperActive)

    

    return (
      <BrowserRouter>
        <div className={changeWrapper}>

         <NotificationSystem ref={this.notificationSystem} style={stylesheet}/>

          <Navbar isAuthenticated ={this.state.isAuthenticated}
                  user = {this.state.user}
          />



          <div className="main_body" >          
              <div className="sidebar_menu" >


                  <Sidebar onChangeArrow={this.onChangeArrow}/>
                  { shouldDisplayFilter &&
                  <Filter isFilterOpen={this.state.isFilterOpen} 
                          filterValues={this.state.filterValues}
                          updateFilter={this.updateFilter}
                          resetFilter ={this.resetFilter}
                          />
                  }


              </div>
              
              <Route exact path='/' render={()=> <Discover onChangeFilter={this.onChangeFilter} 
                                                           filterValues={this.state.filterValues}
                                                           title='Discover' 
                                                           section={PATH_POPULAR} 
                                                           currentPath= {this.currentPath}
                                                           updateFilter= {this.updateFilter}
                                                           addToFavorite={this.addToFavorite}
                                                           removeFromFavorite={this.removeFromFavorite}
                                                           isAuthenticated={this.state.isAuthenticated}
                                                           favoriteMovies= {this.state.favoriteMovies}
                                                           />}/>
              <Route exact path='/login' component={Login} />
              <Route exact path='/logout' component={Logout} />
              <Route exact path='/popular' render={()=> <MainPage title='Popular' 
                                                                  section={PATH_POPULAR} 
                                                                  currentPath={this.currentPath}
                                                                  isAuthenticated={this.state.isAuthenticated}
                                                                  addToFavorite={this.addToFavorite}
                                                                  removeFromFavorite={this.removeFromFavorite}
                                                                  favoriteMovies= {this.state.favoriteMovies}
                                                                  />}/>
              <Route exact path='/top-rated' render={()=> <MainPage title='Top Rated' 
                                                                    section={PATH_TOP_RATED} 
                                                                    currentPath={this.currentPath}
                                                                    isAuthenticated={this.state.isAuthenticated}
                                                                    addToFavorite={this.addToFavorite}
                                                                    removeFromFavorite={this.removeFromFavorite}
                                                                    favoriteMovies= {this.state.favoriteMovies}
                                                                    />}/>
              <Route exact path='/coming-soon' render={()=> <MainPage title='Coming Soon' 
                                                                      section={PATH_UPCOMING} 
                                                                      currentPath={this.currentPath}
                                                                      isAuthenticated={this.state.isAuthenticated}
                                                                      addToFavorite={this.addToFavorite}
                                                                      removeFromFavorite={this.removeFromFavorite}
                                                                      favoriteMovies= {this.state.favoriteMovies}
                                                                      />}/>
              <Route path='/search' component={SearchResults} />
              {/* <Route path='/movie/:id-:title' component={Movie} /> */}
              <Route path='/movie/:id-:title' render={(props)=> <MoviePage {...props} 
                                                                       addToFavorite={this.addToFavorite}
                                                                       removeFromFavorite={this.removeFromFavorite}
                                                                       />} />
              <Route exact path='/favourites' component={Favourites} />
              
              
          </div>

        </div>
              {this.state.isLoading &&
              <Spinner />
              }
      </BrowserRouter>
    )
  }
}

var stylesheet = {
    NotificationItem: { 
    DefaultStyle: { 
      margin: '5px 20px 4px auto',
      width : '169px',
      position : 'relative',
      top: '52px'
    },

    success: { 
      background : '#fff'
    }
  }
}

export default App


//STILL ONLY RANGE RATING
// import React, {Component} from 'react'
// import {BrowserRouter, Route} from 'react-router-dom'
// import Sidebar from './component/Sidebar'
// import Navbar from './component/Navbar'
// import MainPage from './component/MainPage'
// import SearchResults from './component/SearchResults' 
// import Movie from './component/Movie'
// import Discover from './component/Discover'
// import Filter from './component/Filter'
// import './App.css'

// import {PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING} from './api/index'

// class App extends Component {
//   state = {
//     isWrapperActive: false, 
//     isFilterOpen :true,
//     filterValues : {
//       year   : new Date().getFullYear(),
//       rating : {
//         min : 0,
//         max: 10
//       }
//     }
//   }

//   onChangeArrow = () => {
//     this.setState( prevState => ({
//       isWrapperActive: !prevState.isWrapperActive
//     }))
//   }

//   onChangeFilter = () => {
//     this.setState({isFilterOpen: !this.state.isFilterOpen})
//   }

//   updateFilter = (value) => {
//     this.setState({
//       filterValues: {
//         rating: {
//           min: value.min,
//           max: value.max
//         }
//       }
//     })
//   }


//   render(){
//     const changeWrapper = this.state.isWrapperActive ? 'wrapper active' : 'wrapper'

//     return (
//       <BrowserRouter>
//         <div className={changeWrapper}>

//           <Navbar/>

//           <div className="main_body" >          
//               <div className="sidebar_menu" >

//                   <Sidebar onChangeArrow={this.onChangeArrow}/>
//                   <Filter isFilterOpen={this.state.isFilterOpen} 
//                           filterValues={this.state.filterValues}
//                           updateFilter={this.updateFilter}/>

//               </div>
              
//               <Route exact path='/' render={()=> <Discover onChangeFilter={this.onChangeFilter} 
//                                                            filterValues={this.state.filterValues}
//                                                            title='Discover' 
//                                                            section={PATH_POPULAR} />}/>
//               <Route exact path='/popular' render={()=> <MainPage title='Popular' section={PATH_POPULAR} />}/>
//               <Route exact path='/top-rated' render={()=> <MainPage title='Top Rated' section={PATH_TOP_RATED} />}/>
//               <Route exact path='/coming-soon' render={()=> <MainPage title='Coming Soon' section={PATH_UPCOMING} />}/>
//               <Route path='/search' component={SearchResults} />
//               <Route path='/movie/:id-:title' component={Movie} />
              
              
//           </div>

//         </div>
//       </BrowserRouter>
//     )
//   }
// }

// export default App


//2ND SEARCH RESULT JOIN THE FIRST RESULT
// import React, {Component} from 'react'
// import {BrowserRouter, Route} from 'react-router-dom'
// import Sidebar from './component/Sidebar'
// import Navbar from './component/Navbar'
// import MainPage from './component/MainPage'
// import SearchResults from './component/SearchResults' 
// import './App.css'

// import {PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING} from './api/index'

// class App extends Component {
//   state = {
//     isWrapperActive: false
//   }

//   onChangeArrow = () => {
//     this.setState( prevState => ({
//       isWrapperActive: !prevState.isWrapperActive
//     }))
//   }


//   render(){
//     const changeWrapper = this.state.isWrapperActive ? 'wrapper active' : 'wrapper'

//     return (
//       <BrowserRouter>
//         <div className={changeWrapper}>

//           <Navbar/>

//           <div className="main_body" >          
//               <div className="sidebar_menu" >

//                   <Sidebar onChangeArrow={this.onChangeArrow}/>

//               </div>

//               <Route exact path='/' render={()=> <MainPage title='Popular' section={PATH_POPULAR} />}/>
//               <Route exact path='/top-rated' render={()=> <MainPage title='Top Rated' section={PATH_TOP_RATED} />}/>
//               <Route exact path='/coming-soon' render={()=> <MainPage title='Coming Soon' section={PATH_UPCOMING} />}/>
//               <Route path='/search?query=:searchTerm' component={SearchResults} />
              
              
//           </div>

//         </div>
//       </BrowserRouter>
//     )
//   }
// }

// export default App




//HISTORY PUSH (EPARATED VERS) ONLY USE /search without extended query, i dont know

//REDIRECT VERS
// import React, {Component} from 'react'
// import {BrowserRouter, Route} from 'react-router-dom'
// import Sidebar from './component/Sidebar'
// import Navbar from './component/Navbar'
// import MainPage from './component/MainPage'
// import SearchResults from './component/SearchResults' 
// import './App.css'

// import {PATH_POPULAR, PATH_TOP_RATED, PATH_UPCOMING} from './api/index'

// class App extends Component {
//   state = {
//     isWrapperActive: false
//   }

//   onChangeArrow = () => {
//     this.setState( prevState => ({
//       isWrapperActive: !prevState.isWrapperActive
//     }))
//   }


//   render(){
//     const changeWrapper = this.state.isWrapperActive ? 'wrapper active' : 'wrapper'

//     return (
//       <BrowserRouter>
//         <div className={changeWrapper}>

//           <Navbar/>

//           <div className="main_body" >          
//               <div className="sidebar_menu" >

//                   <Sidebar onChangeArrow={this.onChangeArrow}/>

//               </div>

//               <Route exact path='/' render={()=> <MainPage title='Popular' section={PATH_POPULAR} />}/>
//               <Route exact path='/top-rated' render={()=> <MainPage title='Top Rated' section={PATH_TOP_RATED} />}/>
//               <Route exact path='/coming-soon' render={()=> <MainPage title='Coming Soon' section={PATH_UPCOMING} />}/>
//               <Route path='/search?query=:searchTerm' component={SearchResults} />
              
              
//           </div>

//         </div>
//       </BrowserRouter>
//     )
//   }
// }

// export default App;