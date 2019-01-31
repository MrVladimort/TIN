import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import artistApi from "../../../api/artist";
import Input from "../../baseComponents/Input";
import Button from "../../baseComponents/Button";

interface IArtistEditPageState {
    artist: any;
    formData: {
        name: string;
        style: string;
    };
}

interface IArtistEditPageProps {
    history: {
        push: Function
    };
    location: any;
}

class ArtistEditPage extends React.Component<IArtistEditPageProps, IArtistEditPageState> {
    static propTypes = {};

    constructor(props: IArtistEditPageProps) {
        super(props);

        this.state = {
            artist: null,
            formData: {
                name: "",
                style: "",
            }
        }
    }

    onArtistSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const {artist, formData} = this.state;

        const formDataChecked = {
            name: formData.name === "" ? artist.name : formData.name,
            style: formData.style === "" ? artist.style : formData.style,
        };

        await artistApi.editArtist(artist.artistId, formDataChecked);
        this.props.history.push("/artist")
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value.trim()}});
    };

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const artistId = String(query.get('artistId'));
        const artistResponse = await artistApi.getArtist(artistId);
        this.setState({artist: artistResponse.artist});
    }

    render() {
        const {artist} = this.state;
        return (
            <div className="formContainer" style={{margin: "auto"}}>
                <div className="eventsContainer" style={{margin: "auto", textAlign: "center"}}>
                    {artist && <h1>Name: {artist.name}</h1>}
                    {artist && <h1>Style: {artist.style}</h1>}

                    <div style={{textAlign: "left"}}>
                        <form className="form" onSubmit={this.onArtistSubmit}>
                            <Input name={"name"} placeholder={"Name here"} label={"Name"}
                                   onChange={this.handleChange}/>
                            <Input name={"style"} placeholder={"Style here"} label={"Style"}
                                   onChange={this.handleChange}/>
                            <Button text="Edit Artist" type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ArtistEditPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(ArtistEditPage);
