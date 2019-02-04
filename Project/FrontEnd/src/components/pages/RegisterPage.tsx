import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Input from "../baseComponents/Input";
import Button from "../baseComponents/Button";
import validator from "validator";
import authApi from "../../api/auth";
import Alert from "../Alert";

interface IRegisterFormData {
    email: string,
    pass: string,
    name: string,
    surname: string,
}

interface IRegisterPageState {
    formData: IRegisterFormData,
    errors: any,
}

interface IRegisterPageProps {
    loginEmailAndPass: Function
    history: {
        push: Function
    }
}

class RegisterPage extends React.Component<IRegisterPageProps, IRegisterPageState> {
    static propTypes: any;

    constructor(props: IRegisterPageProps) {
        super(props);

        this.state = {
            formData: {
                email: "",
                pass: "",
                name: "",
                surname: "",
            },
            errors: {}
        };
    }

    register = (registerData: IRegisterFormData) => authApi.register(registerData).then(() => this.props.history.push("/confirm-email"));

    validate = async () => {
        let errors: any = {};
        const {name, surname, pass, email} = this.state.formData;

        if (!validator.isEmail(email)) errors.email = "Email is not valid";
        if (name.length < 3) errors.name = "Name is shorter than 3";
        if (surname.length < 3) errors.surname = "Surname is shorter than 3";
        if (pass.length < 5) errors.pass = "Email is shorter than 5";

        await this.setState({errors});
    };

    onRegisterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await this.validate();
        const {formData, errors} = this.state;
        if (Object.keys(errors).length === 0) await this.register({email: formData.email.toLowerCase(), ...formData});
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value}});
    };

    render() {
        const {errors} = this.state;

        return (
            <div className="flexWrapper">
                <div className="formContainer" style={{margin: "auto"}}>
                    <form className="form" onSubmit={this.onRegisterSubmit}>
                        {errors.email && <Alert text={errors.email}/>}
                        <Input name={"email"} placeholder={"Login here"} required label={"Email *"}
                               onChange={this.handleChange}/>
                        {errors.pass && <Alert text={errors.pass}/>}
                        <Input name={"pass"} placeholder={"Password here"} required label={"Password *"}
                               onChange={this.handleChange} type={"password"}/>
                        {errors.name && <Alert text={errors.name}/>}
                        <Input name={"name"} placeholder={"Name"} required label={"Name *"}
                               onChange={this.handleChange}/>
                        {errors.surname && <Alert text={errors.surname}/>}
                        <Input name={"surname"} placeholder={"Surname"} required label={"Surname *"}
                               onChange={this.handleChange}/>
                        <Button text="Register" type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(RegisterPage);
