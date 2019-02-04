import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import eventApi from "../../api/event";
import commentApi from "../../api/comment";
import Event from "../Event";
import Comment from "../Comment";

interface IHomePageState {
    events: any[],
    comments: any[]
}

interface IHomePageProps {
    user: any;
}

class HomePage extends React.Component<IHomePageProps, IHomePageState> {
    static propTypes = {};

    constructor(props: IHomePageProps) {
        super(props);

        this.state = {
            events: [],
            comments: []
        }
    }

    async componentDidMount(): Promise<void> {
        const [eventResponse, commentResponse] = await Promise.all([eventApi.getAllEvents(), commentApi.getAllComments()]);
        this.setState({events: eventResponse.eventsData, comments: commentResponse.comments});
    }

    render() {
        const {events, comments} = this.state;
        const {user} = this.props;
        return (
            <div className="container flexWrapper" style={{margin: "auto"}}>
                <div className="eventsContainer" style={{flexDirection: "column"}}>
                    <h1 className="event">Events</h1>

                    {events.length !== 0
                        ? events.map(eventData => <Event user={user} event={eventData.event} artists={eventData.artists} key={`event: ${eventData.event.eventId}`}/>)
                        : <h1>Loading</h1>}
                </div>

                <div className="commentsContainer" style={{flexDirection: "column"}}>
                    <h1 className="comment">Comments</h1>

                    {comments.length !== 0
                        ? comments.map(commentData => <Comment user={user} key={`comment: ${commentData.commentId}`} comment={commentData}/>)
                        : <h1>Loading</h1>}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: state.user,
});

export default connect(mapStateToProps)(HomePage);
