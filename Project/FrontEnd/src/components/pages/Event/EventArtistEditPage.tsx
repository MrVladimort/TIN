import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Button from "../../baseComponents/Button";
import eventApi from "../../../api/event";
import artistApi from "../../../api/artist";
import Artist from "../../Artist";

interface IEventAddPageState {
    event: any,
    currentEventArtists: any[],
    artists: any[];
    eventArtists: any[];
}

interface IEventAddPageProps {
    history: {
        push: Function
    },
    location: any
}

class EventArtistEditPage extends React.Component<IEventAddPageProps, IEventAddPageState> {
    static propTypes = {};

    constructor(props: IEventAddPageProps) {
        super(props);

        this.state = {
            event: null,
            currentEventArtists: [],
            artists: [],
            eventArtists: [],
        };
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const eventId = String(query.get('eventId'));

        const [artistResponse, eventResponse] = await Promise.all([artistApi.getAllArtists(), eventApi.getEvent(eventId)]);
        const {event, artists: eventArtists} = eventResponse.eventData;
        const {artists} = artistResponse;

        eventArtists.reduce((accum: any[], current: any) => {
            const index = accum.findIndex(artist => artist.artistId === current.artistId);
            accum.splice(index, 1);
            return accum;
        }, artists);

        this.setState({
            currentEventArtists: Array.from(eventArtists),
            artists,
            event,
            eventArtists
        });
    }

    onEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const artistsToAdd: number[] = [], artistsToDelete: number[] = [];
        const {event, artists, eventArtists, currentEventArtists} = this.state;

        artists.reduce((accum: number[], curr: any) => {
            const artistToDelete = currentEventArtists.find(artist => artist.artistId === curr.artistId);
            if (artistToDelete) accum.push(artistToDelete.artistId);
            return accum;
        }, artistsToDelete);

        eventArtists.reduce((accum: number[], curr: any) => {
            const artistToAdd = currentEventArtists.find(artist => artist.artistId === curr.artistId);
            if (!artistToAdd) accum.push(curr.artistId);
            return accum;
        }, artistsToAdd);

        await eventApi.editEventArists(event.eventId, {artistsToAdd, artistsToDelete});
        this.props.history.push("/event");
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
        const {event, artists, eventArtists} = this.state;

        return (
            <div className="flexWrapper">
                <div className="formContainer" style={{margin: "auto"}}>
                    <div style={{margin: "auto", textAlign: "center"}}>
                        {event && <h1>Name: {event.name}</h1>}
                        {event && <h1>Location: {event.location}</h1>}
                        {event && <h1>Date: {event.date}</h1>}
                        {event && <h1>Places count: {event.placesCount}</h1>}
                        {event && <h1>Price: {event.price}</h1>}
                    </div>

                    <form onSubmit={this.onEventSubmit}>
                        <Button text={"Edit artists"}/>
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

EventArtistEditPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(EventArtistEditPage);
