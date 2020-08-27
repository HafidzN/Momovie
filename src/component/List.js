import React from 'react'
import Movie from './Movie'

const List = (props) => {

   const movies = props.list.map ( movie => {
      
      return movie.poster_path && 
      <Movie 
         key                = {movie.id + Math.random()}
         id                 = {movie.id}
         title              = {movie.title}
         poster_path        = {movie.poster_path}
         vote_average       = {movie.vote_average}
         isAuthenticated    = {props.isAuthenticated}
         favoriteMovies     = {props.favoriteMovies}
         addToFavorite      = {(selectedMovie) => props.addToFavorite(selectedMovie)}
         removeFromFavorite = {(selectedMovie) => props.removeFromFavorite(selectedMovie)}
      />
   })

   return (
      <div className='item_wrap'>{movies}</div>
   )
}

export default List

/* //Dont u ever merge List and its Items directly, separate them as different component

import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Movie from './Movie'

class List extends Component {

   modifTitle = (title) => {
      let spaceRemovedTitle = title.replace(/\s/g, '+')
      return spaceRemovedTitle.replace(/[!@#$%^&*]/g, '')
   }

   isLikedMovie = (id) => {
      return (this.props.favoriteMovies.indexOf(id) > -1)
   }


   render(){
      const { list, 
              addToFavorite, 
              removeFromFavorite,
              isAuthenticated,
            } = this.props
      return (
        <div className='item_wrap'>

          {list.map(item=>
           item.poster_path && 
            <div key={item.id + Math.random()} className='item'>
              { item.poster_path && 
                <>
                <Link to={`/movie/${item.id}-${this.modifTitle(item.title)}`}>
                <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${item.poster_path}`} alt={item.title} />

                <div className='rating-box'>
                   <ul>
                      <li className='listRating' style={{paddingLeft:'85%', height: '20px', width:'20px'}}> 
                         <div  className='rating_wrapper'>
                            {item.vote_average % 1 === 0? (item.vote_average===0 || item.vote_average === 10)?item.vote_average:`${item.vote_average}.0`: item.vote_average}
                         </div>
                      </li>    
                   </ul>
                </div>
                </Link>

                { isAuthenticated &&
                     <div className='list__movie-actions'>

                        { this.isLikedMovie(item.id) ?
                        <>
                           <span className='list__movie-action'> 
                              <i className='fa fa-heart' style={{color: '#CC6174'}} onClick={() => removeFromFavorite(item.id)}></i>
                           </span>
                           <span className='list__movie-action'> <i className='fa fa-bookmark'></i></span>
                           <span className='list__movie-action'> <i className='fa fa-share-alt'></i></span>
                        </>
                        :
                        <>
                           <span className='list__movie-action'> 
                              <i className='fa fa-heart' style={{color: '#460000'}} onClick={() => addToFavorite(item.id)}></i>
                           </span>
                           <span className='list__movie-action'> <i className='fa fa-bookmark'></i></span>
                           <span className='list__movie-action'> <i className='fa fa-share-alt'></i></span>
                        </>
                        }
   
                     </div>
                }

               </>
                }
              
            </div>           
          )}
        </div>
      )
   }
}

export default List
*/