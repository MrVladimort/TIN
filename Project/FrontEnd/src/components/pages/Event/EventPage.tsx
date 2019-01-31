import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Event from "../../Event";
import Button from "../../baseComponents/Button";
import {Link} from "react-router-dom";
import eventApi from "../../../api/event";

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
            <div className="container" style={{margin: "auto"}}>
                <div className="textContainer" style={{margin: "auto"}}>
                    <Link to={`/event/add`}>
                        <Button text={"Add Event"}/>
                    </Link>
                </div>
                <div className="eventsContainer" style={{margin: "auto"}}>
                    {events.length !== 0
                        ? events.map(eventData => <Event event={eventData.event} artists={eventData.artists}
                                                         key={`event:${eventData.event.eventId}`}/>)
                        : <h1>Loading</h1>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(EventPage);
