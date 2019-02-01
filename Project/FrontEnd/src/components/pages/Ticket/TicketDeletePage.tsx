import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import ticketApi from "../../../api/ticket";

interface ITicketDeletePageProps {
    history: {
        push: Function
    };
    location: any;
}

class TicketDeletePage extends React.Component<ITicketDeletePageProps> {
    static propTypes = {};

    constructor(props: ITicketDeletePageProps) {
        super(props);
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const ticketId = String(query.get('ticketId'));
        await ticketApi.deleteTicket(ticketId);
        this.props.history.push("/user#history");
    }
    render() {
        return (
            <div></div>
        )
    }
}

TicketDeletePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(TicketDeletePage);
