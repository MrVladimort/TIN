import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import Input from "../../baseComponents/Input";
import Button from "../../baseComponents/Button";
import ticketApi from "../../../api/ticket";

interface ITicketEditPageState {
    ticket: any;
    formData: {
        name: string;
        surname: string;
    };
}

interface ITicketEditPageProps {
    history: {
        push: Function
    };
    location: any;
}

class TicketEditPage extends React.Component<ITicketEditPageProps, ITicketEditPageState> {
    static propTypes = {};

    constructor(props: ITicketEditPageProps) {
        super(props);

        this.state = {
            ticket: null,
            formData: {
                name: "",
                surname: "",
            }
        }
    }

    onArtistSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const {ticket, formData} = this.state;

        const formDataChecked = {
            name: formData.name === "" ? ticket.name : formData.name,
            surname: formData.surname === "" ? ticket.surname : formData.surname,
        };

        await ticketApi.editTicket(ticket.ticketId, formDataChecked);
        this.props.history.push("/user#history")
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value.trim()}});
    };

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const ticketId = String(query.get('ticketId'));
        const ticketResponse = await ticketApi.getTicket(ticketId);
        this.setState({ticket: ticketResponse.ticket});
    }

    render() {
        const {ticket} = this.state;
        return (
            <div className="formContainer" style={{margin: "auto"}}>
                <div className="eventsContainer" style={{margin: "auto", textAlign: "center"}}>
                    {ticket && <h1>Name: {ticket.name}</h1>}
                    {ticket && <h1>Surname: {ticket.surname}</h1>}

                    <div style={{textAlign: "left"}}>
                        <form className="form" onSubmit={this.onArtistSubmit}>
                            <Input name={"name"} placeholder={"Name here"} label={"Name"}
                                   onChange={this.handleChange}/>
                            <Input name={"surname"} placeholder={"Surname here"} label={"Surname"}
                                   onChange={this.handleChange}/>
                            <Button text="Edit Ticket" type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

TicketEditPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(TicketEditPage);
