import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'


class Sidebar extends Component {
    state ={
        arrowDirection : 'fa fa-long-arrow-left',
        isWrapperActive: false   
    }

  onChangeArrow = () => {
    this.setState( prevState => ({
      arrowDirection : prevState.arrowDirection === 'fa fa-long-arrow-right' ? 'fa fa-long-arrow-left' : 'fa fa-long-arrow-right',
      isWrapperActive: !prevState.isWrapperActive
    }))

    this.props.onChangeArrow(this.state.isWrapperActive)
  }


  render(){
        return (
             <div className="inner__sidebar_menu">
                  
                  <ul>
                    <li>
                      <NavLink exact={true} to='/' activeclassname="active"> 
                        <span className="icon">
                         {/* <i className='fa fa-filter'></i> */}
                         <svg fill='#fff' width="16" height="19" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg"><title>Discover</title><path d="M10.576 3.368L15.122.74 14.79 0 9.066 1.897 7.953 4.473H0v1.983h1.148L2.708 18.6h7.875l1.56-12.144h1.147V4.473H10.1"/></svg>
                        </span>
                        <span className="list">Discover</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact={true} to='/popular' activeclassname='active'>
                        <span className="icon">
                         <svg fill='#fff' width="16" height="19" viewBox="0 0 16 19" xmlns="http://www.w3.org/2000/svg"><title>Popular</title><path d="M12.464 10.663c-.19-2.486-1.348-4.043-2.37-5.418-.944-1.272-1.76-2.37-1.76-3.992 0-.13-.074-.25-.19-.31-.115-.06-.255-.05-.36.027C6.25 2.068 4.97 3.917 4.524 5.68c-.31 1.23-.35 2.61-.357 3.523C2.75 8.9 2.43 6.783 2.427 6.76c-.016-.11-.083-.206-.18-.26-.1-.05-.215-.054-.315-.004-.074.036-1.823.924-1.925 4.47-.007.12-.007.237-.007.356 0 3.445 2.804 6.25 6.25 6.25H6.268c3.438-.01 6.232-2.81 6.232-6.25 0-.174-.036-.66-.036-.66zM6.25 16.877c-1.15 0-2.083-.996-2.083-2.22 0-.04 0-.083.002-.135.013-.516.11-.868.22-1.102.2.432.56.83 1.145.83.192 0 .347-.155.347-.347 0-.495.01-1.065.134-1.58.11-.456.37-.94.703-1.33.146.504.434.913.714 1.312.402.57.818 1.162.89 2.168.005.06.01.12.01.185 0 1.223-.935 2.22-2.084 2.22z" /></svg>
                        </span>
                        <span className="list">Popular</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact={true} to='/top-rated' activeclassname='active'>
                        <span className="icon">
                         <i className='fa fa-star'></i>
                        </span>
                        <span className="list">Top Rated</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact={true} to='/coming-soon' activeclassname='active'>
                        <span className="icon" id='upcoming'><i  className="fa fa-rocket" ></i></span>
                        <span className="list"><em>Coming Soon</em></span>
                      </NavLink>
                    </li>
                  </ul>

                  <div className="hamburger" onClick={this.onChangeArrow}>
                    <div className="inner_hamburger">
                        <span className="arrow" >
                            <i className='fa fa-long-arrow-right'></i>
                            <i className='fa fa-long-arrow-left'></i>
                        </span>
                    </div>
                  </div>

                </div>            
        )
  }
}

export default Sidebar