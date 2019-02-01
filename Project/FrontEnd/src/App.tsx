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

import OrderAddPage from "./components/pages/Order/OrderAddPage";
import OrderDeletePage from "./components/pages/Order/OrderDeletePage";

import EventPage from "./components/pages/Event/EventPage";
import EventExactPage from "./components/pages/Event/EventExactPage";
import EventAddPage from "./components/pages/Event/EventAddPage";
import EventDeletePage from "./components/pages/Event/EventDeletePage";
import EventEditPage from "./components/pages/Event/EventEditPage";
import EventArtistEditPage from "./components/pages/Event/EventArtistEditPage";

import ArtistPage from "./components/pages/Artist/ArtistPage";
import ArtistAddPage from "./components/pages/Artist/ArtistAddPage";
import ArtistDeletePage from "./components/pages/Artist/ArtistDeletePage";
import ArtistEditPage from "./components/pages/Artist/ArtistEditPage";

import CommentDeletePage from "./components/pages/Comment/CommentDeletePage";
import CommentEditPage from "./components/pages/Comment/CommentEditPage";

import TicketDeletePage from "./components/pages/Ticket/TicketDeletePage";
import TicketEditPage from "./components/pages/Ticket/TicketEditPage";

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
            <PrivateRoute path="/event/add" exact component={EventAddPage}/>
            <PrivateRoute path="/event/delete" exact component={EventDeletePage}/>
            <PrivateRoute path="/event/edit" exact component={EventEditPage}/>
            <PrivateRoute path="/event/artist" exact component={EventArtistEditPage}/>

            <PrivateRoute path="/comment/delete" exact component={CommentDeletePage}/>
            <PrivateRoute path="/comment/edit" exact component={CommentEditPage}/>

            <Route path="/artist" exact component={ArtistPage}/>
            <PrivateRoute path="/artist/add" exact component={ArtistAddPage}/>
            <PrivateRoute path="/artist/delete" exact component={ArtistDeletePage}/>
            <PrivateRoute path="/artist/edit" exact component={ArtistEditPage}/>

            <PrivateRoute path="/order/add" exact component={OrderAddPage}/>
            <PrivateRoute path="/order/delete" exact component={OrderDeletePage}/>

            <PrivateRoute path="/ticket/edit" exact component={TicketEditPage}/>
            <PrivateRoute path="/ticket/delete" exact component={TicketDeletePage}/>

            <PrivateRoute path="/user" exact component={UserPage}/>
            <PrivateRoute path="/logout" exact component={LogoutPage}/>
        </div>
        <Footer/>
    </div>
);

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(App);
