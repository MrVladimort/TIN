import * as React from 'react';
import PropTypes from 'prop-types';

interface IButtonState {

}

interface IButtonProps {
    text: string;
    type?: "submit" | "reset";
    disabled?: boolean;
    onClick?: any,
    clickId?: number,
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
        const {text, type, disabled, clickId, onClick, children} = this.props;

        return (
            <button className="button" onClick={onClick} type={type} disabled={disabled}>
                {text}
                {children}
            </button>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    onClick: PropTypes.func,
};

export default Button;
