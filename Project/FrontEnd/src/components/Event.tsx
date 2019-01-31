import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Button from "./baseComponents/Button";

interface IEventProps {
    event: any,
    artists: any[]
}

class Event extends Component<IEventProps> {
    static propTypes: any;

    render() {
        const {event, artists} = this.props;
        return (
            <div className="event">
                <div style={{width: "60%", margin: "auto", padding: "15px"}}>
                    <h1>Name: {event.name} | Location: {event.location}</h1>
                    <h1>Date: {event.date}</h1>
                    <h1>Places count: {event.placesCount} | Price: {event.price}</h1>
                    {artists.map(artist => <div key={`event:${event.eventId} artist:${artist.artistId}`}>
                        <h3>{`Artist:${artist.name} Style: ${artist.style}`}</h3></div>)}
                </div>

                <div style={{width: "40%", margin: "auto", padding: "15px"}}>
                    <Link to={`/order?eventId=${event.eventId}`}>
                        <Button text={"Order"}/>
                    </Link>
                    <Link to={`/event/exact?eventId=${event.eventId}`}>
                        <Button text={"Event"}/>
                    </Link>
                    <Link to={`/event/delete?eventId=${event.eventId}`}>
                        <Button text={"Delete"}/>
                    </Link>
                    <Link to={`/event/edit?eventId=${event.eventId}`}>
                        <Button text={"Edit"}/>
                    </Link>
                </div>
            </div>
        );
    }
}

Event.propTypes = {
    event: PropTypes.object.isRequired,
    artists: PropTypes.array.isRequired
};

export default Event;
