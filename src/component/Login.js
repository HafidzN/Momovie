import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import {app, facebookProvider, githubProvider, twitterProvider, googleProvider} from '../firebase/index'
//app.auth(...).fetchProvidersForEmail is not a function
class Login extends Component {

    state = {
        isRedirect: false
    }

    authUsingSocialAccount = (socialAccount) => {
        app.auth().signInWithPopup(socialAccount)
        .then((result, error) => {
            if (error){
                console.log(error.code, error.message, error.email, error.credential)
            } else {
                console.log('result.user : ',result.user)
                console.log('result.credential.accesToken', result.credential.accessToken)
                this.setState({ isRedirect: true })
            }
        })
    }

    authWithEmailPassword(e) {
    e.preventDefault()

    const email    = this.emailInput.value
    const password = this.passwordInput.value

    app.auth().fetchSignInMethodsForEmail(email)
    .then((providers) => {
    if (providers.length === 0) {

      // User doesn't have account, let's create it.
      return app.auth().createUserWithEmailAndPassword(email, password)
    } else if (providers.indexOf("password") === -1) {

      // User signed up with social network
      console.log('Please, try alternative login.');
    } else {

      // Sign in with email/password
      return app.auth().signInWithEmailAndPassword(email, password)
    }
  })
  .then((user) => {
    if (user && user.email) {
      this.loginForm.reset()
      this.setState({ isRedirect: true })
     console.log(`user: ${user} email: ${user.email}`)

    }
  })
  .catch((error) => {
    console.log(error.message);
  })

  }


    render(){
        const {from} = this.props.location.state || {from : {pathname: '/'}}

        if (this.state.isRedirect){
            return (
                <Redirect to={from} />
            )
        }

        return (
            <div className='container login' 
            // style={{height:'calc( 100vh - 52px)',
            //         backgroundImage: `url(https://i.etsystatic.com/5725645/r/il/f73272/1283488367/il_570xN.1283488367_62ch.jpg)`}}
            >
               <div className='login-wrapper'>
                    <h1>Lets Join</h1>
                    <form onSubmit={(e)=>this.authWithEmailPassword(e)}  ref={ (form) => {this.loginForm = form}}>
                        <input type='email'    placeholder='E-mail'  id='email'    name='email'    ref={ (input) => {this.emailInput    = input}} ></input>
                        <input type='password' placeholder='Password'id='password' name='password' ref={ input => {this.passwordInput = input}} ></input>
                        <input type='submit' value='Log In'></input>
                    </form>
                    <div className='bottom-text'>
                        <input type='checkbox' name='remember'  /> Remember Me
                        <a href='/#' >Forgot Password ?</a>
                    </div>
                    <div className='socials'>
                        <button onClick={()=> this.authUsingSocialAccount(facebookProvider)}>
                            <i className='fa fa-facebook'></i> 
                        </button>
                        <button onClick={()=> this.authUsingSocialAccount(googleProvider)}>
                            <i className='fa fa-google'></i> 
                        </button>
                        <button onClick={()=> this.authUsingSocialAccount(githubProvider)}>
                            <i className='fa fa-github'></i> 
                        </button>
                        <button onClick={()=> this.authUsingSocialAccount(twitterProvider)}>
                            <i className='fa fa-twitter'></i> 
                        </button>
                    </div>
               </div>
            
            </div>
        )
    }
}

export default Login