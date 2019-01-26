import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import orderApi from "../../api/order";

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
        this.setState({orders: ordersResponse.orders, tab: this.props.location.hash});
    };

    onTabClick = (event: IOnClickEvent) => {
        const {name} = event.target;
        this.setState({tab: name})
    };

    render() {
        const {name, surname, email} = this.props.user;


        return (
            <div>
                <div className="tab">
                    <button className="tablinks" name="#user" onClick={this.onTabClick}>User Data</button>
                    <button className="tablinks" name="#history" onClick={this.onTabClick}>History</button>
                </div>


                {this.state.tab === "#user" ?
                    <div className="container flexWrapper flexItem">
                        <h2 className="flexItem">Email: {email}</h2>
                        <h2 className="flexItem">Name: {name}</h2>
                        <h2 className="flexItem">Surname: {surname}</h2>
                    </div> :
                    <div className="container flexWrapper flexItem">

                    </div>}
            </div>
        )
    }
}
// TODO orders
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
