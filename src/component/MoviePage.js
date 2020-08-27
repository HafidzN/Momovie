import React, {Component} from 'react'
import Spinner from './Spinner'
import {PATH_BASE, API_KEY, PATH_MOVIE} from '../api/index'

class Movie extends Component {
    // _isMounted = false 
    abortController = new AbortController()
    state = {
        movie     : {},
        isLoading : true
    }



    componentDidMount = () => {
        // this._isMounted = true
        fetch(`${PATH_BASE}${PATH_MOVIE}/
                ${this.props.match.params.id}
                ?api_key=${API_KEY}`, {signal: this.abortController.signal})
        .then(res =>
        // this._isMounted && 
        res.json())
        .then(movie => (
            this.setState({movie, isLoading : false})
        ))
        .catch(error=> {
            if (error.name ==='AbortError') return
            throw error
        })
    }

    componentWillUnmount = () => {
        // this._isMounted = false
        this.abortController.abort()
    }

    render(){
        const {movie, isLoading}=this.state
        //console.log(this.props.location.pathname)
        return (
            <>
            { isLoading ? <Spinner /> :

                <div className='container'>
                <div className="movie-wrapper">
                    <div>
                        <img className='movie-poster' 
                            src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`} 
                            alt={movie.title}
                            style={{ width:'100%'}}
                        />
                    </div>

                    <div className='movie-data'>
                        <h1 className='movie-title' style={{marginBottom:'20px'}}>{movie.title}</h1>
                        <div className='movie-title'>
                        <span>
                            {movie.vote_average} {' '}
                            <i className='fa fa-star'></i>
                        </span>
                        </div> 
                        <div className='movie-title '>
                            <button >
                                <i className='fa fa-heart' ></i> 
                            </button>
                            <button >
                                <i className='fa fa-bookmark'></i> 
                            </button>
                            <button >
                                <i className='fa fa-share-alt'></i> 
                            </button>
                        </div>

                        <p className='movie-overview'>{movie.overview}</p>

                        <div className='movie-title' style={{marginTop: '20px'}}>
                          <p className='movie-overview'>Released Date: {' '}{movie.release_date}</p>
                        </div>
                    </div>
                </div>
                </div>
            }            
        </>
        )
    }
}

export default Movie