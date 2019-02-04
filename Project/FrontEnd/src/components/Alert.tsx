import React, {Component} from 'react';
import PropTypes from 'prop-types';

interface IHeaderProps {
    text: string
}

class Alert extends Component<IHeaderProps> {
    static propTypes: any;

    render() {
        const {text} = this.props;

        return (
            <div className="alert">
                <strong>Danger!</strong> {text}
            </div>
        );
    }
}

Alert.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Alert;
