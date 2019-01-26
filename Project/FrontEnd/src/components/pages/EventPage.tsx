import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import eventApi from "../../api/event";
import Event from "../Event";

interface IEventPageState {
    events: any[]
}

interface IEventPageProps {

}

class EventPage extends React.Component<IEventPageProps, IEventPageState> {
    static propTypes = {};

    constructor(props: IEventPageProps) {
        super(props);

        this.state = {
            events: []
        }
    }

    async componentDidMount(): Promise<void> {
        const [eventResponse] = await Promise.all([eventApi.getAllEvents()]);
        this.setState({events: eventResponse.eventsData});
    }
    render() {
        const {events} = this.state;
        return (
            <div className="textContainer" style={{margin: "auto"}}>
                <div>
                    {events.length !== 0
                        ? events.map(eventData => <Event event={eventData.event} artists={eventData.artists} key={`event:${eventData.event.eventId}`}/>)
                        : <h1>Loading</h1>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(EventPage);
