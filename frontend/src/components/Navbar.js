import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
 
const Navbar = () => {

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const navigate = useNavigate();

    function isLogged() {
        if (token !== null) {
            return true;
        } else {
            return false;
        }
    }

    function isAdmin() {
        if (role === 'admin') {
            return true;
        } else {
            return false;
        }
    }

    function logout() {
        localStorage.clear();
        navigate("/");
    }
 
    return (
        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/articles">
                    <img src={logo} alt="logo" height="50" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end">
                        {isLogged() ?
                        <>
                            <li className='nav-item'><a className='nav-link' href="/newarticle">Créer un article</a></li>
                            <li className='nav-item'><a className='nav-link' href="/articles">Articles créés</a></li>
                            {isAdmin() ?
                            <li className='nav-item'><a className='nav-link' href='/dashboard'>Utilisateurs</a></li>
                            :
                            null
                            }
                            <button onClick={logout} className="btn me-auto btn-secondary">Log Out</button>
                        </>
                        :
                        <>
                            <li className='nav-item'><a className='nav-link' href="/">Se connecter</a></li>
                            <li className='nav-item'><a className='nav-link' href="/register">S'enregistrer</a></li>
                        </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}
 
export default Navbar;