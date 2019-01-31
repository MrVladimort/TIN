import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Button from "./baseComponents/Button";

interface IHeaderProps {
    comment: any
}

class Comment extends Component<IHeaderProps> {
    static propTypes: any;

    render() {
        const {comment} = this.props;
        const {Event: event, User: user, text, grade, createdAt} = comment;

        return (
            <div className="comment">
                <h3>Text: {text}</h3>
                <h4>Event: {event.name}</h4>
                <h4>User: {`${user.name} ${user.surname}`} | Grade: {grade}</h4>
                <h5>Date: {createdAt}</h5>

                <Link to={`/comment/edit?commentId=${comment.commentId}`}>
                    <Button text={"Edit"}/>
                </Link>
                <Link to={`/comment/delete?commentId=${comment.commentId}`}>
                    <Button text={"Delete"}/>
                </Link>
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default Comment;
