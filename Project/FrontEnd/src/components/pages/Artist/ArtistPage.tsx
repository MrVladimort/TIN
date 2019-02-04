import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import eventApi from "../../../api/artist";
import Artist from "../../Artist";
import {Link} from "react-router-dom";
import Button from "../../baseComponents/Button";

interface IArtistPageState {
    artists: any[];
}

interface IArtistPageProps {
    user: any;
}

class ArtistPage extends React.Component<IArtistPageProps, IArtistPageState> {
    static propTypes = {};

    constructor(props: IArtistPageProps) {
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
        const {user} = this.props;

        return (
            <div className="formContainer" style={{margin: "auto"}}>
                <Link to={`/artist/add`}>
                    <Button text={"Add Artist"}/>
                </Link>
                <div className="eventsContainer" style={{margin: "auto"}}>
                    {artists.length !== 0
                        ? artists.map(artist => <Artist user={user} artist={artist} key={`artist:${artist.artistId}`}/>)
                        : <h1>Loading</h1>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(ArtistPage);
