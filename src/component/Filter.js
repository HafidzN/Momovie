import React, {Component} from 'react'
import InputRange from 'react-input-range'
import Dropdown from 'react-dropdown'

class Filter extends Component {

  resetFilter = () => {
    this.props.resetFilter()
  } 
  
  render(){
    const dateRange = (startYear, endYear) => [...Array(endYear - startYear + 1)].map((value, index)=> index + startYear).reverse() 

    console.log(this.props.isFilterOpen)
    const displayFilter = this.props.isFilterOpen ? 'filters-list': 'filters-list active'
    return (
        <ul className={displayFilter}>

         <li className='filters-list__item'>
            <Dropdown
              options  = {dateRange(1960, new Date().getFullYear())}
              value    = {`${this.props.filterValues.year}`}
              onChange = {year=> this.props.updateFilter({...this.props.filterValues, year: year.value})}
              
            />
          </li>

          <li className="filters-list__item">
            <span className="filter-label">
              Rating 
            </span>
            <InputRange
              maxValue={10}
              minValue={0}
              value={this.props.filterValues.rating}
              onChange={ rating => this.props.updateFilter({...this.props.filterValues, rating: rating})}
              />
          </li>


          <li className="filters-list__item">
            <span className="filter-label">
              Duration 
            </span>
            <InputRange
              maxValue={300}
              minValue={20}
              value={this.props.filterValues.duration}
              onChange={ duration => this.props.updateFilter({...this.props.filterValues, duration:duration})}
              />
          </li>

          <li className='filters-list__item'>
            <button className="filters-reset" onClick={this.resetFilter}>
            <svg fill='#fff' width="20" height="20" viewBox="0 0 6 7" xmlns="http://www.w3.org/2000/svg"><title>Reset</title><path d="M3.086 6.373c1.28-.144 2.31-1.17 2.455-2.45C5.734 2.245 4.43.818 2.798.8V.05c0-.043-.052-.065-.087-.04L1.16 1.15c-.025.02-.025.058 0 .077l1.55 1.137c.035.026.087.003.087-.038v-.75c1.148.018 2.067.995 1.988 2.162C4.72 4.74 3.9 5.554 2.895 5.618 1.833 5.686.93 4.926.766 3.92c-.03-.186-.192-.32-.38-.32-.234 0-.417.206-.38.437.227 1.432 1.55 2.507 3.08 2.336z"/></svg>
          </button>
          </li>

        </ul>
    )
  }
}

export default Filter

//STILL ONLYY RANGE RATING
// import React, {Component} from 'react'
// import InputRange from 'react-input-range'

// class Filter extends Component {

//   updateFilter = (value) => {
//     this.props.updateFilter(value)
//   }
  

//   render(){
//     console.log(this.props.isFilterOpen)
//     const displayFilter = this.props.isFilterOpen ? 'filters-list': 'filters-list active'
//     return (
//         <ul className={displayFilter}>
//           <li className="filters-list__item">
//             <span className="filter-label">
//               Rating {this.props.filterValues.rating.min} ~ {this.props.filterValues.rating.max}
//             </span>
//             <InputRange
//               maxValue={10}
//               minValue={0}
//               value={this.props.filterValues.rating}
//               onChange={ value => this.updateFilter(value)}
//               />
//           </li>
//         </ul>
//     )
//   }
// }

// export default Filter
