import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";


class ArtistPage extends React.Component {
    static propTypes = {};


    async componentDidMount(): Promise<void> {

    }


    renderArtist(artist: any) {

    }

    render() {
        return (
            <div>
                <h1>This is Odtworcy Page</h1>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(ArtistPage);
