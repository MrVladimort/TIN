import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Input from "../../baseComponents/Input";
import Button from "../../baseComponents/Button";
import artistApi from "../../../api/artist";

interface IArtistAddPageState {
    formData: {
        name: string,
        style: string,
    }
}

interface IArtistAddPageProps {
    history: {
        push: Function
    },
    location: any
}

class ArtistAddPage extends React.Component<IArtistAddPageProps, IArtistAddPageState> {
    static propTypes = {};

    constructor(props: IArtistAddPageProps) {
        super(props);

        this.state = {
            formData: {
                name: "",
                style: "",
            }
        };
    }

    onArtistSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const {formData} = this.state;
        await artistApi.createArtist(formData);
        this.props.history.push("/artist")
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value.trim()}});
    };

    render() {
        return (
            <div className="flexWrapper">
                <div className="formContainer" style={{margin: "auto"}}>
                    <form className="form" onSubmit={this.onArtistSubmit}>
                        <Input name={"name"} placeholder={"Name here"} required label={"Name *"}
                               onChange={this.handleChange}/>
                        <Input name={"style"} placeholder={"Style here"} required label={"Style *"}
                               onChange={this.handleChange}/>
                        <Button text="Add Artist" type="submit"/>
                    </form>
                </div>
            </div>
        )
    }
}

ArtistAddPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(ArtistAddPage);
