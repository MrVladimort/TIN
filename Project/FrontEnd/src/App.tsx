import * as React from 'react';
import {Route} from 'react-router-dom';
import {connect} from "react-redux";
import PropTypes from "prop-types";
import './assets/css/default.min.css';

import PrivateRoute from "./components/utilComponents/PrivateRoute";

import Header from "./components/Header";
import Footer from "./components/Footer";

import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import UserPage from "./components/pages/UserPage";
import LogoutPage from "./components/pages/LogoutPage";
import ConfirmEmailPage from "./components/pages/ConfirmEmailPage";
import OrderPage from "./components/pages/OrderPage";
import EventPage from "./components/pages/EventPage";
import ArtistPage from "./components/pages/ArtistPage";

const App = ({ location, dispatch, history}: any) => (
    <div className="reactBody">
        <Header location={location} dispatch={dispatch} history={history}/>
        <div className="content">
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/confirm-email" component={ConfirmEmailPage}/>
            <Route path="/order" component={OrderPage}/>
            <Route path="/event" component={EventPage}/>
            <Route path="/artist" component={ArtistPage}/>

            <PrivateRoute path="/user" exact component={UserPage}/>
            <PrivateRoute path="/logout" exact component={LogoutPage}/>
        </div>
        <Footer/>
    </div>
);

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(App);
