import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import eventApi from "../../api/artist";
import Artist from "../Artist";

interface IEventPageState {
    artists: any[]
}

interface IEventPageProps {

}

class EventPage extends React.Component<IEventPageProps, IEventPageState> {
    static propTypes = {};

    constructor(props: IEventPageProps) {
        super(props);

        this.state = {
            artists: []
        }
    }

    async componentDidMount(): Promise<void> {
        const [artistResponse] = await Promise.all([eventApi.getAllArtists()]);
        this.setState({artists: artistResponse.artists});
    }
    render() {
        const {artists} = this.state;
        return (
            <div className="formContainer" style={{margin: "auto"}}>
                <div className="eventsContainer">
                    {artists.length !== 0
                        ? artists.map(artist => <Artist artist={artist} key={`artist:${artist.artistId}`}/>)
                        : <h1>Loading</h1>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(EventPage);
