import React, {Component} from 'react'
import {Link} from 'react-router-dom'

class Movie extends Component {
    state = {
        isLiked : false
    }

    isMovieLiked  = (id) => {
        if (this.props.favoriteMovies.indexOf(id) > -1){ 
            this.setState({isLiked: true})
            }
    }

    addToFavorite = () => {
        this.setState({ isLiked: true})
        this.props.addToFavorite(this.props.id)
    }

    removeFromFavorite = () => {
        this.setState({ isLiked: false})
        this.props.removeFromFavorite(this.props.id)
    }

    modifTitle = (title) => {
        return title.replace(/\s/g, '+').replace(/[!@#$%^&*]/g,'')
    }

    ComponentWillReceiveProps = (nextProps) => {
        if (nextProps!== this.props) {
            this.isMovieLiked(this.props.id)
        }
    }

    heartIcon = () => {
        if (this.props.isAuthenticated){
            if(this.state.isLiked){
                return (
                    <i className='fa fa-heart' style={{color: '#ff008a'}}  onClick={this.removeFromFavorite}></i>
                )
            }   return (
                    <i className='fa fa-heart'   onClick={this.addToFavorite}></i>
                )
        } return (
            <Link to='/login'>
               <i className='fa fa-heart'></i>
            </Link>
        )
    }

    // bookmarkIcon = () => {
    //     if (this.props.isAuthenticated){
    //         if(this.state.isLiked){
    //             return (
    //                 <i className='fa fa-heart' style={{color: '#ff008a'}}  onClick={this.removeFromFavorite}></i>
    //             )
    //         }   return (
    //                 <i className='fa fa-heart'   onClick={this.addToFavorite}></i>
    //             )
    //     } return (
    //         <Link to='/login'>
    //            <i className='fa fa-heart'></i>
    //         </Link>
    //     )
    // }

    
    render(){
        const {                 
            id,               
            title,
            poster_path,              
            vote_average,      
            // isAuthenticated,       
        } = this.props

        // const iconColor = isAuthenticated && '#ff008a' 

        return (
           <>
            <div className='item'>
              
  
                <Link to={`/movie/${id}-${this.modifTitle(title)}`}>
                <img src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2${poster_path}`} alt={title} />

                <div className='rating-box'>
                   <ul>
                      <li className='listRating' style={{paddingLeft:'85%', height: '20px', width:'20px'}}> 
                         <div  className='rating_wrapper'>
                            {vote_average % 1 === 0? (vote_average===0 || vote_average === 10)?vote_average:`${vote_average}.0`: vote_average}
                         </div>
                      </li>    
                   </ul>
                </div>
                </Link>


                <div className='list__movie-actions'>
                    <span className='list__movie-action'> 
                        {this.heartIcon()}
                    </span>
                    <span className='list__movie-action'> <i className='fa fa-bookmark'></i></span>
                    <span className='list__movie-action'> <i className='fa fa-share-alt'></i></span>
                </div>

            </div>
           </>
        )
    }
}

export default Movie
