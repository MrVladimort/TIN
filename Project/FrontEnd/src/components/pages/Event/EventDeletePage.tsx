import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import eventApi from "../../../api/event";

interface IEventDeletePageProps {
    history: {
        push: Function
    };
    location: any;
}

class EventDeletePage extends React.Component<IEventDeletePageProps> {
    static propTypes = {};

    constructor(props: IEventDeletePageProps) {
        super(props);
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const eventId = String(query.get('eventId'));
        await eventApi.deleteEvent(eventId);
        this.props.history.push("/event");
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

EventDeletePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(EventDeletePage);
