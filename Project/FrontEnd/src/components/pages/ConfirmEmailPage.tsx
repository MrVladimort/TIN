import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import authActions from "../../redux/actions/auth";

interface IConfirmEmailPageProps {
    location: any,
    history: {
        push: Function
    },
    confirmEmail: Function
}


class ConfirmEmailPage extends React.Component<IConfirmEmailPageProps> {
    static propTypes = {};

    componentDidMount = async () => {
        const query = new URLSearchParams(this.props.location.search);
        const token = query.get('token');

        if (token) {
            await this.props.confirmEmail(token);
            this.props.history.push("/user")
        }
    };

    render() {
        return (
            <div>
                <h1>Email confirmation was sent to your email</h1>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

const mapDispatchToProps = {
    confirmEmail: authActions.confirmEmail
};

ConfirmEmailPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    confirmEmail: PropTypes.func.isRequired,
    location: PropTypes.object,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailPage);