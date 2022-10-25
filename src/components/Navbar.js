import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
export const Navbar = (props) => {
    let history = useNavigate();
    let location = useLocation();
    useEffect(() => {
        // console.log(location.pathname)
    }, [location]);

    const handleLogout = () =>{
        localStorage.removeItem('token');
        history('/login')
        props.showAlert("Logged Out successfully","success");
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <div className="container-fluid">
                    <Link className="navbar-brand ms-2" to="/"><i className="fa-regular fa-note-sticky"></i> NoteBook</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-3">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} aria-current="page" to="/About">About</Link>
                            </li>
                            {localStorage.getItem('token')?<li className="nav-item">
                                <Link className={`nav-link ${location.pathname === "/home" ? "active" : ""}`} aria-current="page" to="/home">Notes</Link>
                            </li> : ""}
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex me-3" role="search">
                            <Link className="btn btn-outline-light" to="/login" role="button">Sign in</Link>
                            <Link className="btn btn-outline-light ms-2" to="/signup" role="button">Sign up</Link>
                        </form> : <button onClick = {handleLogout} className = "btn btn-outline-light me-2" > Log out </button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}
