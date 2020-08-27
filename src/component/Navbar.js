import React, {Component} from 'react'
import Searchbox from './Searchbox'
import UserDropdownMenu from './UserDropdownMenu'
import {Link} from 'react-router-dom'


class Navbar extends Component {
    state = {
        isUserMenuOpen : false
    }

    changeUserMenuStatus = () => {
        this.setState ({ isUserMenuOpen : !this.state.isUserMenuOpen})
    }

    render () {
        console.log('Welcome to Momovie ',this.props.user )
    return (
        <div className="top_navbar" >
        <div className="logo">
            <Link  to='/'>Momovie</Link>
        </div>
        <div className="top_menu">
            <div className="home_link">
            <Link  to='/'>
                <span className="icon"><i className="fa fa-home"></i></span>
            </Link>
            </div>
            <Searchbox />
            {this.props.isAuthenticated ? 
            (
            <>
                <div className="right_info" onClick={this.changeUserMenuStatus}>
                <div className="icon_wrap">                
                    <div className="icon">
                    <i className="fa fa-user-circle"></i>
                    </div>
                </div>
                </div>
                <UserDropdownMenu 
                   username = {this.props.user.displayName}
                   isUserMenuOpen = {this.state.isUserMenuOpen}
                />
            </>
            )
            :
            (
            <Link to='/login'>
                <div className="right_info">
                <div className="icon_wrap">
                    <div className="icon">
                    <i className="fa fa-user"></i>
                    </div>
                </div>
                </div>
            </Link>
            )
            }

        </div>
        </div>
        )
    }
}

export default Navbar



//why exact true Link return warning??
//Navlink VERS
// import React, {Component} from 'react'
// import Searchbox from './Searchbox'
// import {NavLink} from 'react-router-dom'

// class Navbar extends Component {
//     render(){
//         return (
//             <div className="top_navbar" >
//             <div className="logo">
//                 <NavLink exact={true} to='/'>Momovie</NavLink>
//             </div>
//             <div className="top_menu">
//                 <div className="home_link">
//                 <NavLink exact={true} to='/'>
//                     <span className="icon"><i className="fa fa-home"></i></span>
//                 </NavLink>
//                 </div>
//                 <Searchbox />
//                 <div className="right_info">
//                 <div className="icon_wrap">
//                     <div className="icon">
//                     <i className="fa fa-address-book"></i>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//             </div>
//         )
//     }
// }

// export default Navbar