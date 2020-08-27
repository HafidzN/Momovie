import React, {Component} from 'react'
import {app} from '../firebase/index'
import {Redirect} from 'react-router-dom'

class Logout extends Component {
    state = {
        redirect : false
    }

    componentDidMount(){
        app.auth().signOut()
        .then((user, error)=>{
            this.setState({
                redirect : true
            })
        })
    }
    render(){
        if (this.state.redirect){
            return <Redirect to='/' />
        }

        return null
    }
}

export default Logout