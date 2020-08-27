import React from 'react'
import {Link} from 'react-router-dom'

const UserDropdownMenu = (props) => {
    
    
    const shouldDisplayUserMenu = `user-menu ${props.isUserMenuOpen && 'active'}`

    return (
        <div className={shouldDisplayUserMenu}>
           <span className='user-menu__triangle'>{props.username}</span>
           <ul>
            <li><Link className='user-menu-list__item' to='/favourites'> Favourites
                <i className='fa fa-heart'></i>
            </Link> </li>
            <li><Link className='user-menu-list__item' to='/savedlist' style={{marginRight:'2px'}}> Saved
                <i className='fa fa-bookmark'></i>
            </Link> </li>
            <li><Link className='user-menu-list__item' to='/logout'> Sign Out
                <i className='fa fa-sign-out'></i>
            </Link> </li>
           </ul>
        </div>
    )
}

export default UserDropdownMenu