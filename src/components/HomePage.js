import React from 'react';
import Dashboard from './Dashboard';

function HomePage() {
  return (
      <React.Fragment>
      <div className="columns is-mobile">
        <div className="column is-one-third is-offset-one-third">
          <div className="search-box field is-grouped">
            <p className="control is-expanded has-icons-left">
              <input className="input is-large" type="text" placeholder="Find a Wish List" />
              <span className="icon is-small is-left">
                <i className="fas fa-search" aria-hidden="true"></i>
              </span>
            </p>
            <p className="control">
              <a className="button is-info is-large">
                Search
              </a>
            </p>
          </div>
        </div>
      </div>
      <Dashboard />';
      </React.Fragment>
  );
}

export default HomePage;
