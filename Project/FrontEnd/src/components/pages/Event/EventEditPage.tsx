import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import eventApi from "../../../api/event";
import Input from "../../baseComponents/Input";
import Button from "../../baseComponents/Button";

interface IEventEditPageState {
    event: any;
    formData: {
        name: string;
        location: string;
        date: string;
        placesCount: number;
        price: number;
    };
}

interface IEventEditPageProps {
    history: {
        push: Function
    };
    location: any;
}

class EventEditPage extends React.Component<IEventEditPageProps, IEventEditPageState> {
    static propTypes = {};

    constructor(props: IEventEditPageProps) {
        super(props);

        this.state = {
            event: null,
            formData: {
                name: "",
                location: "",
                date: "",
                placesCount: 0,
                price: 0,
            }
        }
    }

    onEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const {event, formData} = this.state;

        const formDataChecked = {
            name: formData.name === "" ? event.name : formData.name,
            location: formData.location === "" ? event.location : formData.location,
            date: formData.date === "" ? event.date : formData.date,
            placesCount: formData.placesCount === 0 ? event.placesCount : formData.placesCount,
            price: formData.price === 0 ? event.price : formData.price,
        };

        await eventApi.editEvent(event.eventId, formDataChecked);
        this.props.history.push("/event")
    };

    handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;

        const numberedValue = isNaN(Number(value)) ? 0 : Number(value);
        this.setState({formData: {...this.state.formData, [name]: numberedValue}});
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value.trim()}});
    };

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const eventId = String(query.get('eventId'));
        const eventResponse = await eventApi.getEvent(eventId);
        this.setState({event: eventResponse.eventData.event});
    }

    render() {
        const {event} = this.state;
        return (
            <div className="textContainer" style={{margin: "auto"}}>
                <div className="eventsContainer" style={{margin: "auto", textAlign: "center"}}>
                    {event && <h1>Name: {event.name}</h1>}
                    {event && <h1>Location: {event.location}</h1>}
                    {event && <h1>Date: {event.date}</h1>}
                    {event && <h1>Places count: {event.placesCount}</h1>}
                    {event && <h1>Price: {event.price}</h1>}

                    <div className="textContainer" style={{margin: "auto", textAlign: "left"}}>
                        <form className="form" onSubmit={this.onEventSubmit}>
                            <Input name={"name"} placeholder={"Name here"} label={"Name"} onChange={this.handleChange}/>
                            <Input name={"location"} placeholder={"Location here"} label={"Location"} onChange={this.handleChange}/>
                            <Input name={"date"} placeholder={"Date here"} label={"Date"} onChange={this.handleChange}/>
                            <Input name={"placesCount"} placeholder={"Places count here"} label={"Places count"} onChange={this.handleNumberChange}/>
                            <Input name={"price"} placeholder={"Price here"} label={"Price "} onChange={this.handleNumberChange}/>
                            <Button text="Add Event" type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

EventEditPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(EventEditPage);
