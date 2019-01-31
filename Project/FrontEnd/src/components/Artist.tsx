import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Button from "./baseComponents/Button";

interface IArtistProps {
    artist: any,
}

class Artist extends Component<IArtistProps> {
    static propTypes: any;

    render() {
        const {artist} = this.props;
        return (
            <div className="artist" style={{flexDirection: "column"}}>
                <h3>Name: {artist.name}</h3>
                <h4>Style: {artist.style}</h4>
                <Link to={`/artist/edit?artistId=${artist.artistId}`}>
                    <Button text={"Edit"}/>
                </Link>
                <Link to={`/artist/delete?artistId=${artist.artistId}`}>
                    <Button text={"Delete"}/>
                </Link>
            </div>
        );
    }
}

Artist.propTypes = {
    artist: PropTypes.object.isRequired,
};

export default Artist;
