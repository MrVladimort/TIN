import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";

interface IUserPageState {

}

interface IUserPageProps {
    user: {
        name: string,
        surname: string,
        email: string,
    },
}

class UserPage extends React.Component<IUserPageProps, IUserPageState> {
    static propTypes = {};

    render() {
        const {name, surname, email} = this.props.user;

        return (
            <div>
                <h1>This is User Page</h1>
                <h2>Email: {email}</h2>
                <h2>Name: {name}</h2>
                <h2>Surname: {surname}</h2>
            </div>
        )
    }
}

UserPage.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        email: PropTypes.string
    }),
};


const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(UserPage);
