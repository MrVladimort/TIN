import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import artistApi from "../../../api/artist";

interface IArtistDeletePageProps {
    history: {
        push: Function
    };
    location: any;
}

class ArtistDeletePage extends React.Component<IArtistDeletePageProps> {
    static propTypes = {};

    constructor(props: IArtistDeletePageProps) {
        super(props);
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const artistId = String(query.get('artistId'));
        await artistApi.deleteArtist(artistId);
        this.props.history.push("/artist");
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

ArtistDeletePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(ArtistDeletePage);
