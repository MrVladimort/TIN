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
        firstName: string,
        lastName: string
    },

    dispatch: Function,
    history: {
        push: Function
    },
    logout: Function
}

class Header extends Component<IHeaderProps, IHeaderState> {
    static propTypes: any;

    clickLogout = () => {
        const {logout, history} = this.props;
        logout();
        history.push('/');
    };

    getRightSide = () => {
        const {isAuth, user} = this.props;
        if (isAuth) return (
            <div className="right">
                <Link to={"/user"}>Hello, ${user.firstName + " " + user.lastName}</Link>
                <Link onClick={this.clickLogout} to={"/logout"}>Log Out</Link>
            </div>
        );
        else
            return (
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
                    <Link to={"/wydarzenia"}>Wydarzenia</Link>
                    <Link to={"/odtworcy"}>Odtworcy</Link>
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
    logout: PropTypes.func.isRequired,
    user: PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string
    }),
};

const mapStateToProps = (state: any) => ({
    user: state.user,
    isAuth: !!state.auth.token,
});

const mapDispatchToProps = () => ({
    logout: authActions.logout
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
