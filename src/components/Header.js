import React from 'react';
import { Link, withRouter } from "react-router-dom";

function Header() {
  return (
      <React.Fragment>
      <div className="columns is-mobile navbar is-dark is-spaced ">
        <div className="column is-three-fifths is-offset-one-fifth">
        <nav className="navbar is-dark ">
            <div className="navbar-brand">
                <h1 className="title is-1">
                
                <Link className="navbar-item logo" to="/">
                    Wish It
                </Link>
                </h1>
                <div className="navbar-burger burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
                </div>
            </div>

            <div id="navbarExampleTransparentExample" className="navbar-menu">
                <div className="navbar-start">
                
                </div>

                <div className="navbar-end">
                <div className="navbar-item">
                    <div className="field is-grouped">
                    <p className="control">
                        <Link className="button is-warning is-medium" to="/">
                        <span>
                            Home
                        </span>
                        </Link>
                    </p>
                    <p className="control">
                        <Link className="button is-info is-medium" to="/login">
                        <span>
                            Login
                        </span>
                        </Link>
                    </p>
                    <p className="control">
                        <Link className="button is-primary is-medium" to="/register">
                        <span>Sign Up</span>
                        </Link>
                    </p>
                    <p className="control">
                        <Link className="button is-danger is-medium" to="/register">
                        <span>Logout</span>
                        </Link>
                    </p>
                    </div>
                </div>
                </div>
            </div>
        </nav>
        </div>
    </div>
        
      </React.Fragment>
  );
}

export default withRouter(Header);
