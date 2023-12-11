import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const Account = props => {
  const logout = () => {
    const {history} = props
    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <div className="account-main">
      <Header />
      <div className="middle">
        <h1 className="account-h1">Account</h1>
        <hr className="hr-line" />
        <div className="flex">
          <div className="flex-1">
            <p className="member">Member ship</p>
          </div>
          <div>
            <p className="member-2">rahul@gmail.com</p>
            <p className="member-2">Password : ************</p>
          </div>
        </div>
        <hr className="hr-line" />
        <div className="flex">
          <div className="flex-1">
            <p className="member">Plan Details</p>
          </div>
          <div>
            <p className="member-2">Premium Ultra HD</p>
          </div>
        </div>
        <hr className="hr-line" />
        <button type="button" className="logout" onClick={logout}>
          Logout
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default Account
