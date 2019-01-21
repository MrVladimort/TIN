import * as React from 'react';
import PropTypes from 'prop-types';

interface IButtonState {

}

interface IButtonProps {
    text: string
    type?: "submit" | "reset"
}

interface IButtonDefaultProps {
    type: string
}

class Button extends React.Component<IButtonProps, IButtonState> {
    static propTypes: any;

    render() {
        const {text, type} = this.props;

        return (
            <div>
                <button className="button" type={type}>{text}</button>
            </div>
        )
    }
}

export default Button;
