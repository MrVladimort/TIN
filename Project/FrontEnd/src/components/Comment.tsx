import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import Button from "./baseComponents/Button";

interface IHeaderProps {
    comment: any,
    user: any,
}

class Comment extends Component<IHeaderProps> {
    static propTypes: any;

    render() {
        const {comment, user} = this.props;
        const {Event: event, User: commentUser, text, grade, createdAt} = comment;

        return (
            <div className="comment">
                <h3>Text: {text}</h3>
                <h4>Event: {event.name}</h4>
                <h4>User: {`${commentUser.name} ${commentUser.surname}`} | Grade: {grade}</h4>
                <h5>Date: {createdAt}</h5>

                {(user.userType && user.userId === commentUser.userId || user.userType === 2) && <Link to={`/comment/edit?commentId=${comment.commentId}`}>
                    <Button text={"Edit"}/>
                </Link>}
                {(user.userType && user.userId === commentUser.userId || user.userType === 2) && <Link to={`/comment/delete?commentId=${comment.commentId}`}>
                    <Button text={"Delete"}/>
                </Link>}
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
    user: PropTypes.object,
};

export default Comment;
