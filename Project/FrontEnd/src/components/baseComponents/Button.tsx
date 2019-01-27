import * as React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

interface IButtonState {

}

interface IButtonProps {
    text: string;
    type?: "submit" | "reset";
    disabled?: boolean;
}

interface IButtonDefaultProps {
    type: string;
    disabled: boolean;
}

class Button extends React.Component<IButtonProps, IButtonState> {
    static propTypes: any;
    static defaultProps: IButtonDefaultProps = {
        type: "",
        disabled: false,
    };

    render() {
        const {text, type, disabled} = this.props;

        return (
            <div>
                <button className="button" type={type} disabled={disabled}>
                    {text}
                    {this.props.children}
                </button>
            </div>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string,
};

export default Button;
