import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Input from "../../baseComponents/Input";
import Button from "../../baseComponents/Button";
import eventApi from "../../../api/event";
import artistApi from "../../../api/artist";
import Artist from "../../Artist";

interface IEventAddPageState {
    artists: any[],
    eventArtists: any[],
    formData: {
        name: string;
        location: string;
        date: string;
        placesCount: number;
        price: number;
    }
}

interface IEventAddPageProps {
    history: {
        push: Function
    },
    location: any
}

class EventAddPage extends React.Component<IEventAddPageProps, IEventAddPageState> {
    static propTypes = {};

    constructor(props: IEventAddPageProps) {
        super(props);

        this.state = {
            artists: [],
            eventArtists: [],
            formData: {
                name: "",
                location: "",
                date: "",
                placesCount: 0,
                price: 0,
            }
        };
    }

    async componentDidMount(): Promise<void> {
        const artistResponse = await artistApi.getAllArtists();
        this.setState({artists: artistResponse.artists});
    }

    onEventSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const {formData, eventArtists} = this.state;

        if (eventArtists.length !== 0) {

            const artistsIds = eventArtists.map(artist => artist.artistId);

            await eventApi.createEvent(formData, artistsIds);
            this.props.history.push("/event")
        }
    };

    handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;

        const numberedValue = isNaN(Number(value)) ? 0 : Number(value);
        this.setState({formData: {...this.state.formData, [name]: numberedValue}});
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value.trim()}});
    };

    handleAddArtist = (index: number) => {
        const {eventArtists, artists} = this.state;
        eventArtists.push(artists[index]);
        artists.splice(index, 1);
        this.setState({eventArtists, artists});
    };

    handleRemoveArtist = (index: number) => {
        const {eventArtists, artists} = this.state;
        artists.push(eventArtists[index]);
        eventArtists.splice(index, 1);
        this.setState({eventArtists, artists});
    };

    renderArtist = (artist: any, index: number) => {
        return (
            <div key={`artist:${artist.artistId}`}>
                <Artist artist={artist}/>
                <Button onClick={() => this.handleAddArtist(index)} text={"Add artist"}/>
            </div>
        );
    };

    renderEventArtist = (artist: any, index: number) => {
        return (
            <div key={`addedArtist:${index}`}>
                <Artist artist={artist}/>
                <Button onClick={() => this.handleRemoveArtist(index)} text={"Remove artist"}/>
            </div>
        );
    };

    render() {
        const {artists, eventArtists} = this.state;

        return (
            <div className="flexWrapper">
                <div className="formContainer" style={{margin: "auto"}}>
                    <form className="form" onSubmit={this.onEventSubmit}>
                        <Input name={"name"} placeholder={"Name here"} required label={"Name *"}
                               onChange={this.handleChange}/>
                        <Input name={"location"} placeholder={"Location here"} required label={"Location *"}
                               onChange={this.handleChange}/>
                        <Input name={"date"} placeholder={"Date here"} required label={"Date *"}
                               onChange={this.handleChange}/>
                        <Input name={"placesCount"} placeholder={"Places count here"} required label={"Places count *"}
                               onChange={this.handleNumberChange}/>
                        <Input name={"price"} placeholder={"Price here"} required label={"Price *"}
                               onChange={this.handleNumberChange}/>
                        <Button text="Add Event" type="submit"/>
                    </form>

                    <div className="eventsContainer" style={{margin: "auto"}}>
                        <h1 style={{textAlign: "center"}}>Added artists</h1>
                        {eventArtists.map(this.renderEventArtist)}
                    </div>

                    <h1 style={{textAlign: "center", margin: "auto"}}>========================</h1>

                    <div className="eventsContainer" style={{margin: "auto"}}>
                        <h1 style={{textAlign: "center"}}>Artists to add</h1>
                        {artists.map(this.renderArtist)}
                    </div>
                </div>
            </div>
        )
    }
}

EventAddPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(EventAddPage);
