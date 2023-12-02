import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    displayErrorMsg: false,
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatePassword = event => {
    this.setState({password: event.target.value})
  }

  processLogin = async event => {
    const {username, password} = this.state
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    const {history} = this.props
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 10})
      this.setState({displayErrorMsg: false, errorMsg: ''})
      history.replace('/')
    } else {
      this.setState({
        displayErrorMsg: true,
        errorMsg: data.error_msg,
      })
    }
  }

  render() {
    const {username, password, displayErrorMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-main">
        <img
          src="https://res.cloudinary.com/dmhmf156f/image/upload/v1701065357/Group_7399_r1dyde.svg"
          alt="login website logo"
          className="movie-icon"
        />
        <div className="botto-div">
          <form className="login-form">
            <h1 className="login-h1">Login</h1>
            <label htmlFor="username" className="label-ele">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input-ele"
              value={username}
              onChange={this.updateUsername}
            />
            <label htmlFor="password" className="label-ele">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="input-ele"
              value={password}
              onChange={this.updatePassword}
            />
            <p className="error-msg">{displayErrorMsg && errorMsg}</p>
            <button
              type="submit"
              className="login-btn-large"
              onClick={this.processLogin}
            >
              Login
            </button>
            <button
              type="submit"
              className="login-btn-small"
              onClick={this.processLogin}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginPage
