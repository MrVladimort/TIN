import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import eventApi from "../../api/event";
import Button from "../baseComponents/Button";
import Input from "../baseComponents/Input";
import orderApi from "../../api/order";

interface IOrderPageProps {
    location: any,
    history: {
        push: Function
    },
    confirmEmail: Function
}

interface IOrderPageState {
    eventData: any,
    tickets: any[],
    formData: {
        name: string,
        surname: string,
    }
}

class OrderPage extends React.Component<IOrderPageProps, IOrderPageState> {
    static propTypes = {};

    constructor(props: IOrderPageProps) {
        super(props);

        this.state = {
            eventData: null,
            tickets: [],
            formData: {
                name: "",
                surname: "",
            }
        };
    }

    componentDidMount = async () => {
        const query = new URLSearchParams(this.props.location.search);
        const eventId = Number(query.get('eventId'));

        const eventResponse = await eventApi.getEvent(eventId);

        this.setState({eventData: eventResponse.eventData});
    };

    onOrderSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const {eventData, tickets} = this.state;
        await orderApi.createOrder({eventId: eventData.event.eventId, ticketsData: tickets});
        this.props.history.push("/user#history")
    };

    onTicketSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const {tickets, formData} = this.state;
        tickets.push(formData);
        this.setState({tickets})
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value}});
    };

    render() {
        const {tickets, eventData} = this.state;

        return (
            eventData ?
                <div className="formContainer" style={{margin: "auto"}}>
                    <div className="event">
                        <div style={{margin: "auto", padding: "15px"}}>
                            <h1>{eventData.event.name}</h1>
                            {eventData.artists.map((artist: any) => <div
                                key={`event:${eventData.event.eventId} artist:${artist.artistId}`}>
                                <h3>{`Artist:${artist.name} Style: ${artist.style}`}</h3></div>)}
                        </div>
                    </div>

                    <form className="form" onSubmit={this.onTicketSubmit}>
                        <Input name={"name"} placeholder={"Name"} required label={"Name *"}
                               onChange={this.handleChange}/>
                        <Input name={"surname"} placeholder={"Surname"} required label={"Surname *"}
                               onChange={this.handleChange}/>
                        <Button text="Add Ticket" type="submit"/>
                        <Button text="Reset" type="reset"/>
                    </form>

                    {tickets.map((ticket, index) => <h3
                        key={`ticket ${index}`}>{`Ticket ${index + 1}: ${ticket.name} ${ticket.surname}`}</h3>)}
                    <form onSubmit={this.onOrderSubmit}>
                        <Button text="Make order" type="submit" />
                    </form>
                </div> : <h1>Loading</h1>
        )
    }
}

OrderPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object,
};

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(OrderPage);
