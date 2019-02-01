import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import eventApi from "../../../api/event";
import commentApi from "../../../api/comment";
import Event from "../../Event";
import Input from "../../baseComponents/Input";
import Button from "../../baseComponents/Button";
import Comment from "../../Comment";

interface IEventExactPageState {
    eventData: any;
    comments: any[];
    formData: {
        text: string,
        grade: number,
    }
}

interface IEventExactPageProps {
    location: any;
    history: {
        push: Function
    };
}

class EventExactPage extends React.Component<IEventExactPageProps, IEventExactPageState> {
    static propTypes = {};

    constructor(props: IEventExactPageProps) {
        super(props);

        this.state = {
            eventData: null,
            comments: [],
            formData: {
                text: "",
                grade: 0,
            }
        }
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const eventId = String(query.get('eventId'));

        const [eventResponse, commentResponse] = await Promise.all([eventApi.getEvent(eventId), commentApi.getAllCommentsByEventId(eventId)]);
        this.setState({eventData: eventResponse.eventData, comments: commentResponse.comments});
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value}});
    };

    onCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const {eventData, formData} = this.state;
        await commentApi.createComment({commentData: formData, eventId: eventData.event.eventId});
        const commentResponse = await commentApi.getAllCommentsByEventId(eventData.event.eventId);
        this.setState({comments: commentResponse.comments});
    };

    render() {
        const {eventData, comments, formData} = this.state;
        return (
            <div className="textContainer" style={{margin: "auto"}}>
                {eventData && <Event artists={eventData.artists} event={eventData.event}/>}
                <div className="formContainer" style={{margin: "auto"}}>
                    <form className="form" onSubmit={this.onCommentSubmit}>
                        <Input name={"text"} placeholder={"Text"} required label={"Text *"}
                               onChange={this.handleChange}/>
                        <Input name={"grade"} placeholder={"Grade"} required label={"Grade *"}
                               onChange={this.handleChange}/>
                        <Button text="Add Comment" type="submit"/>
                        <Button text="Reset" type="reset"/>
                    </form>
                </div>
                {comments.map(comment => <Comment key={`comment: ${comment.commentId}`} comment={comment}/>)}
            </div>
        )
    }
}

EventExactPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(EventExactPage);
