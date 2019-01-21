import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Input from "../baseComponents/Input";
import Button from "../baseComponents/Button";
import authApi from "../../api/auth";

interface IRegisterFormData {
    email: string,
    pass: string,
    name: string,
    surname: string,
}

interface IRegisterPageState {
    formData: IRegisterFormData,
    errors: any,
    loading: boolean
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
            errors: {},
            loading: false
        };
    }

    register = (registerData: IRegisterFormData) => authApi.register(registerData).then(() => this.props.history.push("/confirm-email"));

    onRegisterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const {formData} = this.state;

        await this.register({email: formData.email.toLowerCase(), ...formData});
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value}});
    };

    render() {
        const {loading} = this.state;

        return (
            <div className="flexWrapper">
                <div className="formContainer" style={{margin: "auto"}}>
                    <form className="form" onSubmit={this.onRegisterSubmit}>
                        <Input name={"email"} placeholder={"Login here"} required label={"Email *"}
                               onChange={this.handleChange}/>
                        <Input name={"pass"} placeholder={"Password here"} required label={"Password *"}
                               onChange={this.handleChange} type={"password"}/>
                        <Input name={"name"} placeholder={"Name"} required label={"Name *"}
                               onChange={this.handleChange}/>
                        <Input name={"surname"} placeholder={"Surname"} required label={"Surname *"}
                               onChange={this.handleChange}/>
                        <Button text="Register" type="submit" disabled={loading}/>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(RegisterPage);
