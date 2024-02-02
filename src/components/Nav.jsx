import React, { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context';
import './nav.css';

function Nav() {
  let { getGlobal: { isLoggedin, image }, setGlobal } = useContext(GlobalContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const logoutHandler = () => {
    setGlobal({
      isLoggedin: false,
      username: null,
      phone: null,
      image: null,
      email: null,
      price: null,
    });
    localStorage.removeItem('token');
    toast.success('Logged out!');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Toaster position="top-center" />
      <a className="navbar-brand" href="#" onClick={() => navigate('/')}>
        <img src="/logo.png" alt="logo" className="logo" />
      </a>

      {!isLoggedin && (
        <h2 className="navbar-heading">Glam Vouge</h2>
      )}

      {isLoggedin && (
        <div className="pages">
          <div className="navbar-nav">
            <div className={`nav-item ${pathname === '/Home' ? 'active' : ''}`} onClick={() => navigate('/ ')}>
              HOME
            </div>
            <div className={`nav-item ${pathname === '/men' ? 'active' : ''}`} onClick={() => navigate('/men')}>
              MEN
            </div>
            <div className={`nav-item ${pathname === '/women' ? 'active' : ''}`} onClick={() => navigate('/women')}>
              WOMEN
            </div>
            <div className={`nav-item ${pathname === '/kids' ? 'active' : ''}`} onClick={() => navigate('/kids')}>
              KIDS
            </div>
            <div className={`nav-item ${pathname === '/accessories' ? 'active' : ''}`} onClick={() => navigate('/accessories')}>
              ACCESSORIES
            </div>
          </div>
        </div>
      )}


      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {isLoggedin ? (
          <ul className="navbar-nav ml-auto">
          
            {pathname === '/profile' && (
              <>
                <li className={`nav-item ${pathname === '/cart' ? 'active' : ''}`}>
                  <a className="nav-link" href="#" onClick={() => navigate('/cart')}>
                  <i className="bi bi-cart"></i>
                  </a>
                </li>
                <li className={`nav-item ${pathname === '/add-products' ? 'active' : ''}`}>
                  <a className="nav-link" href="#" onClick={() => navigate('/add-products')}>
                  <i className="bi bi-bag-plus-fill"></i>
                  </a>
                </li>
              </>
            )}
            <li className={`nav-item ${pathname === '/profile' ? 'active' : ''}`}>
            <a className="nav-link" href="#" onClick={() => navigate('/profile')}>
              <img src={image} alt="profile" className="profile" />
            </a>
          </li>

            <li className="nav-item">
              <button className="logout" onClick={logoutHandler}>
              <i className="bi bi-box-arrow-right"></i>
              </button>
            </li>
          </ul>
        ) : (
          <ul className="navbar-nav ml-auto">
            {pathname !== '/register' && (
              <li className={`nav-item ${pathname === '/register' ? 'active' : ''}`}>
                <a className="nav-link" href="#" onClick={() => navigate('/register')}>
                  Register
                </a>
              </li>
            )}
            {pathname !== '/login' && (
              <li className={`nav-item ${pathname === '/login' ? 'active' : ''}`}>
                <a className="nav-link" href="#" onClick={() => navigate('/login')}>
                  Login
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Nav;
