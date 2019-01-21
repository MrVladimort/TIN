import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import authActions from "../../redux/actions/auth";

interface ILogoutPageProps {
    history: {
        push: Function
    },
    logout: Function
}

class LogoutPage extends Component<ILogoutPageProps> {
    static propTypes: any;

    componentDidMount = () => this.logout();

    logout = () => {
        const {logout, history} = this.props;
        logout();
        history.push('/');
    };

    render() {
        return (
            <div></div>
        );
    }
}

LogoutPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,

    logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
    logout: authActions.logout
};

export default connect(mapStateToProps, mapDispatchToProps)(LogoutPage);
