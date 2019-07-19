import React from 'react';
import { Route, Switch } from "react-router-dom";
import HomePage from './components/HomePage';
import Header from './components/Header';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Gift from './components/Gift';
import EditUser from './components/EditUser';
import WishList from './components/WishList';
import NewEvent from './components/NewEvent';
import Address from './components/Address';

import 'bulma/css/bulma.css'
import './App.css';

function App() {
  return (
    <div className="App">
			<Header />
			{/* <Route path="/" component={Header} /> */}
			<Switch>
				<Route path="/" exact component={HomePage} />
				<Route path="/login" component={LoginPage} />
				<Route path="/register" component={RegisterPage} />
				<Route path="/gift" component={Gift} />
				<Route path="/event" component={NewEvent} />
				<Route path="/address" component={Address} />
				<Route path="/editUser" component={EditUser} />
				<Route path="/wishList" component={WishList} />
			</Switch>
    </div>
  );
}

export default App;
