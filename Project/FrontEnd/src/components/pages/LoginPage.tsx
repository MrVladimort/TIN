import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Input from "../baseComponents/Input";
import Button from "../baseComponents/Button";
import authActions from "../../redux/actions/auth";

interface ILoginFormData {
    email: string,
    pass: string,
}

interface ILoginPageState {
    formData: ILoginFormData,
    errors: any,
    loading: boolean
}

interface ILoginPageProps {
    loginEmailAndPass: Function
    history: {
        push: Function
    }
}

class LoginPage extends React.Component<ILoginPageProps, ILoginPageState> {
    static propTypes: any;

    constructor(props: ILoginPageProps) {
        super(props);

        this.state = {
            formData: {
                email: "",
                pass: ""
            },
            errors: {},
            loading: false
        };
    }

    login = (emailAndPass: ILoginFormData) => this.props.loginEmailAndPass(emailAndPass).then(() => this.props.history.push("/user"));

    onLoginSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const {formData} = this.state;

        this.login({email: formData.email.toLowerCase(), pass: formData.pass});
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
                    <form className="form" onSubmit={this.onLoginSubmit}>
                        <Input name={"login-email"} placeholder={"Login here"} required label={"Email"}
                               onChange={this.handleChange}/>
                        <Input name={"login-pass"} placeholder={"Password here"} required label={"Password"}
                               onChange={this.handleChange}/>
                        <Button text="Log In" type="submit" disabled={loading}/>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps, {
    loginEmailAndPass: authActions.loginEmailAndPass
})(LoginPage);
