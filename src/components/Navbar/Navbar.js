import React from 'react'
import axios from 'axios'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars, FaRegWindowClose } from 'react-icons/fa'
import { FiShoppingCart } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { setIsAdmin, setLoggedIn, setShowLinks } from '../../store/generalStore'
import logo from '../../images/logo.png'

function Navbar() {

  const nav = useNavigate()
  const dispatch = useDispatch()
  const {
    loggedIn,
    isAdmin,
    showLinks,
    cart,
    currentUserName
  } = useSelector(state => state.generalSlice)


  const showMobileMenu = () => {
    dispatch(setShowLinks(true))
  }

  const closeMobileMenu = () => {
    dispatch(setShowLinks(false))
  }

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cart')
    dispatch(setLoggedIn(false))
    dispatch(setIsAdmin(false))
    nav('/')
    nav(0)
  }


  return (
    <nav>
      <div className='nav-container container'>
        <Link to="/">
          <img className='nav-logo' src={logo} alt="" />
        </Link>
        <div className='nav-links' >
          <div className={showLinks ? 'slide-left show-mobile ' : 'nav-links-dekstop'}>
            <Link to={'/'}>Home</Link>
            {isAdmin ? <Link to={'/shop'}>Add product</Link> : <Link to={'/shop'}>Shop</Link>}
            {loggedIn ?
              <Link to={'/cart'}><FiShoppingCart /> {cart.length}</Link> : <Link to={'/auth'}>Login</Link>}
            {loggedIn ? <Link onClick={handleLogout}>Logout</Link> : ''}
          </div>
          <div className="nav-links-mobile">
            {showLinks ? <FaRegWindowClose onClick={closeMobileMenu} className='nav-close ' /> : <FaBars onClick={showMobileMenu} className='nav-bars' />}
          </div>
        </div>
      </div>
      {loggedIn && <h4 className='greet-user'> Hello, {currentUserName.split("@")[0].toUpperCase()}</h4>}
    </nav >
  )
}

export default Navbar