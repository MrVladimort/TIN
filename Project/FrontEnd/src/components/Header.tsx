import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import authActions from "../redux/actions/auth";

interface IHeaderState {

}

interface IHeaderProps {
    isAuth: boolean,
    user: {
        name: string,
        surname: string
    },

    history: {
        push: Function
    },
    logout: Function
}

class Header extends Component<IHeaderProps, IHeaderState> {
    static propTypes: any;

    getRightSide = () => {
        const {isAuth, user} = this.props;
        if (isAuth) return (
            <div className="right">
                <Link to={"/user"}>Hello, {user.name + " " + user.surname}</Link>
                <Link to={"/logout"}>Log Out</Link>
            </div>
        );
        else return (
            <div className="right">
                <Link to={"/login"}>Log In</Link>
                <Link to={"/register"}>Register</Link>
            </div>
        );
    };

    render() {
        return (
            <div className="header">
                <div className="left">
                    <Link to={"/"}>Home</Link>
                    <Link to={"/event"}>Events</Link>
                    <Link to={"/artist"}>Artist</Link>
                    <Link to={"/info"}>Info</Link>
                </div>

                {this.getRightSide()}
            </div>
        );
    }
}

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,

    isAuth: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
};

const mapStateToProps = (state: any) => ({
    user: state.user,
    isAuth: !!state.auth.tokens,
});

const mapDispatchToProps = {
    logout: authActions.logout
};

Header.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    isAuth: PropTypes.bool.isRequired,
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string
    }),
    logout: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
