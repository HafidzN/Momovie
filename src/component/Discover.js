import React, {Component} from 'react'
import List from './List'
import Button from './Button'
import Dropdown from 'react-dropdown'
import Spinner from './Spinner'
import {PATH_BASE, PATH_DISCOVER, PATH_MOVIE, API_KEY, DEFAULT_PAGE, PATH_PAGE} from '../api/index'

class Discover extends Component {
    state = {
        movies : {},
        isLoading: false
    }

    componentDidMount = ()=> {
        this.getMovies(DEFAULT_PAGE)
        this.props.currentPath(window.location.pathname)
    }

    getMovies = (page) => {
        const query = `${PATH_BASE}${PATH_DISCOVER}${PATH_MOVIE}?language=en-US
        &api_key=${API_KEY}&${PATH_PAGE}${page}
        &primary_release_year=${this.props.filterValues.year}
        &vote_average.gte=${this.props.filterValues.rating.min}
        &vote_average.lte=${this.props.filterValues.rating.max}
        &with_runtime.gte=${this.props.filterValues.duration.min}
        &with_runtime.lte=${this.props.filterValues.duration.max}
        &sort_by=${this.props.filterValues.sort_by.value}.${this.props.filterValues.order.value}`

        fetch(query)
        .then(res=> res.json())
        .then(movies=> {
            this.setMovies(movies)
        })
    }

    setMovies = (movies) => {
        const {page, results} = movies

        const olderResults = page !==1 ? this.state.movies.results : []

        const newerResults = [
            ...olderResults,
            ...results
        ]

        this.setState({
            movies    : {results: newerResults, page},
            isLoading : false 
        })
    }


    componentDidUpdate = (prevProps, prevState)=> {
        if (prevProps.filterValues!==this.props.filterValues){this.getMovies(DEFAULT_PAGE)}
    }


// fix Warning: Can't perform a React state update on an unmounted component
    componentWillUnmount() {
    this.setState = (state,callback)=>{
        return
        }
    }


    render(){
      const sort_by = [
        { value: 'popularity', label: 'Popularity' },
        { value: 'vote_average', label: 'Rating' },
        { value: 'original_title', label: 'Title' }]
      const sort_by_order = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' }
        ]

      const {movies} = this.state
      const {results, page} = movies

        console.log('Sorted By: ', this.props.filterValues.sort_by.label)
        console.log('Order  By: ', this.props.filterValues.order.value)

        return ( 
            <>
            { this.state.isLoading && 
                <Spinner />
            }

            <div className='container'>
                <h1 style={{color:'#fff', display:'table', marginRight:'auto'}} >{this.props.title}</h1>
    
                <div className="sort-order">
                    <div className="sort-order__item" style={{width: "140px"}}>
                        <Dropdown
                        className="test"
                        options={sort_by}
                        value={`${this.props.filterValues.sort_by.label}`}
                        onChange={sort_by => this.props.updateFilter({ ...this.props.filterValues, sort_by: sort_by })} />
                    </div>
                    <div className="sort-order__item">
                        <Dropdown
                        className="test"
                        options={sort_by_order}
                        value={`${this.props.filterValues.order.label}`}
                        onChange={order  => this.props.updateFilter({ ...this.props.filterValues, order: order })} />
                    </div>
                </div>



                {results &&
                <>
                <List list = {results} 
                      addToFavorite  = {this.props.addToFavorite}
                      removeFromFavorite = {this.props.removeFromFavorite}
                      isAuthenticated= {this.props.isAuthenticated}
                      favoriteMovies = {this.props.favoriteMovies}
                      />
                <Button className='Button' 
                        text='Load More'
                        onClick={()=>this.getMovies(page+1)}
                        />
                </>
                }


            </div>
        </>
        )
    }
}

export default Discover