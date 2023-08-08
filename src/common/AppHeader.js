import {Link} from "react-router-dom";
import './AppHeader.css';
import React from "react";
function AppHeader(props){
    return(
        <header className="app-header">
            <div className="container">
                <div className="app-branding">
                    <Link to="/" className="app-title">App Capstone</Link>
                </div>
                <div className="app-options">
                    <nav className="app-nav">
                        {props.authenticated ? (
                            <ul>
                                <li>
                                    <Link to="/profile">Profile</Link>
                                </li>
                                <li>
                                    <a href="#" onClick={() => props.onLogout()}> Logout</a>
                                </li>
                            </ul>
                        ): (
                            <ul>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                            </ul>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}
export default AppHeader;
