import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import orderApi from "../../../api/order";

interface IOrderDeletePageProps {
    history: {
        push: Function
    };
    location: any;
}

class OrderDeletePage extends React.Component<IOrderDeletePageProps> {
    static propTypes = {};

    constructor(props: IOrderDeletePageProps) {
        super(props);
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const orderId = String(query.get('orderId'));
        await orderApi.deleteOrder(orderId);
        this.props.history.push("/user#history");
    }
    render() {
        return (
            <div></div>
        )
    }
}

OrderDeletePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(OrderDeletePage);
