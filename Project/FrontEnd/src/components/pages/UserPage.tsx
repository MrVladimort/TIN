import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import orderApi from "../../api/order";
import Button from "../baseComponents/Button";
import {Link} from "react-router-dom";

interface IUserPageState {
    tab: string;
    orders: any[];
}

interface IUserPageProps {
    user: {
        name: string,
        surname: string,
        email: string,
    },
    location: any,
    history: {
        push: Function
    },
}

interface IOnClickTarget extends EventTarget {
    name: string
}

interface IOnClickEvent extends React.MouseEvent<HTMLButtonElement> {
    target: IOnClickTarget
}


class UserPage extends React.Component<IUserPageProps, IUserPageState> {
    static propTypes = {};

    constructor(props: IUserPageProps) {
        super(props);

        this.state = {
            tab: "#user",
            orders: []
        }
    }

    componentDidMount = async () => {
        const ordersResponse = await orderApi.getAllOrders();
        const {location} = this.props;

        const tab = location.hash ? location.hash : this.state.tab;
        this.setState({
            orders: ordersResponse.orders.sort((a: any, b: any) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))),
            tab
        });
    };

    onTabClick = (event: IOnClickEvent) => {
        const {name} = event.target;
        this.setState({tab: name})
    };

    renderUserData = () => {
        const {name, surname, email} = this.props.user;

        return (
            <div className="artist formContainer" style={{margin: "auto", flexDirection: "column"}}>
                <h2 className="flexItem">Email: {email}</h2>
                <h2 className="flexItem">Name: {name}</h2>
                <h2 className="flexItem">Surname: {surname}</h2>
            </div>
        );
    };

    renderUserHistory = () => {
        const {orders} = this.state;
        const containerStyle = {
            flexDirection: "column"
        } as React.CSSProperties;

        const orderStyle = {
            flexDirection: "column",
            padding: "1rem"
        } as React.CSSProperties;

        return (
            <div className="textContainer flexWrapper" style={containerStyle}>
                {orders.map((order: any) => {
                    const {event, status, createdAt: orderDate, tickets} = order;
                    const {name: eventName, price: eventPrice, location: eventLocation, date: eventDate} = event;

                    return (
                        <div className="order" key={`order: ${order.orderId}`} style={orderStyle}>
                            <h2>Event: {eventName} | Price: {eventPrice}</h2>
                            <h3>Location: {eventLocation} | Date: {eventDate}</h3>
                            <h3>Status: {status} | Order Date: {orderDate}</h3>

                            <table style={{width: "100%"}}>
                                <tbody>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Place number</th>
                                </tr>
                                {tickets.map((ticket: any) => {
                                        return (
                                            <tr key={`ticket: ${ticket.ticketId}`}>
                                                <th>{ticket.name}</th>
                                                <th>{ticket.surname}</th>
                                                <th>{ticket.number}</th>
                                            </tr>
                                        );
                                    }
                                )}
                                </tbody>
                            </table>

                            <h2>Total price: {eventPrice * tickets.length}</h2>
                            <Link to={`/event/exact?eventId=${event.eventId}`}>
                                <Button text={"Event page"}/>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    render() {
        return (
            <div>
                <div className="tab">
                    <button className="tablinks" name="#user" onClick={this.onTabClick}>User Data</button>
                    <button className="tablinks" name="#history" onClick={this.onTabClick}>History</button>
                </div>

                {this.state.tab === "#user" ? this.renderUserData() : this.renderUserHistory()}
            </div>
        )
    }
}

UserPage.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        surname: PropTypes.string,
        email: PropTypes.string
    }),
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object,
};


const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(UserPage);
