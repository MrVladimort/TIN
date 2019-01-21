import * as React from 'react';
import PropTypes from 'prop-types';

interface IInputState {

}

interface IInputProps {
    placeholder?: string
    name: string,
    required?: boolean,
    label?: string,
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

interface IInputDefaultProps {
    
}

class Input extends React.Component<IInputProps, IInputState> {
    static propTypes: any;
    static defaultProps: IInputDefaultProps;
    
    render() {
        const {placeholder, name, required, label, onChange} = this.props;

        return (
            <div>
                <label htmlFor={name}><b>{label}</b></label>
                <input className="input" type="text" placeholder={placeholder} name={name} required={required} onChange={onChange}/>
            </div>
        )
    }
}

export default Input;
