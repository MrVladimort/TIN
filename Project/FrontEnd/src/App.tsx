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

import EventPage from "./components/pages/Event/EventPage";
import EventExactPage from "./components/pages/Event/EventExactPage";
import EventAddPage from "./components/pages/Event/EventAddPage";
import EventDeletePage from "./components/pages/Event/EventDeletePage";
import EventEditPage from "./components/pages/Event/EventEditPage";

import ArtistPage from "./components/pages/Artist/ArtistPage";
import ArtistAddPage from "./components/pages/Artist/ArtistAddPage";
import ArtistDeletePage from "./components/pages/Artist/ArtistDeletePage";
import ArtistEditPage from "./components/pages/Artist/ArtistEditPage";

import CommentDeletePage from "./components/pages/Comment/CommentDeletePage";
import CommentEditPage from "./components/pages/Comment/CommentEditPage";

const App = ({location, dispatch, history}: any) => (
    <div className="reactBody">
        <Header location={location} dispatch={dispatch} history={history}/>
        <div className="content">
            <Route path="/" exact component={HomePage}/>
            <Route path="/login" exact component={LoginPage}/>
            <Route path="/register" exact component={RegisterPage}/>
            <Route path="/confirm-email" exact component={ConfirmEmailPage}/>

            <Route path="/event" exact component={EventPage}/>
            <Route path="/event/exact" exact component={EventExactPage}/>
            <Route path="/event/add" exact component={EventAddPage}/>
            <Route path="/event/delete" exact component={EventDeletePage}/>
            <Route path="/event/edit" exact component={EventEditPage}/>

            <Route path="/comment/delete" exact component={CommentDeletePage}/>
            <Route path="/comment/edit" exact component={CommentEditPage}/>

            <Route path="/artist" exact component={ArtistPage}/>
            <Route path="/artist/add" exact component={ArtistAddPage}/>
            <Route path="/artist/delete" exact component={ArtistDeletePage}/>
            <Route path="/artist/edit" exact component={ArtistEditPage}/>

            <PrivateRoute path="/order" exact component={OrderPage}/>
            <PrivateRoute path="/user" exact component={UserPage}/>
            <PrivateRoute path="/logout" exact component={LogoutPage}/>
        </div>
        <Footer/>
    </div>
);

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(App);
