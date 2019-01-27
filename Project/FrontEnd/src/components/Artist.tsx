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
                <h3>Artist: {artist.name}</h3>
                <h4>Style: {artist.style}</h4>
            </div>
        );
    }
}

Artist.propTypes = {
    artist: PropTypes.object.isRequired,
};

export default Artist;
