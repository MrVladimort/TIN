import React, {Component} from 'react';
import PropTypes from 'prop-types';

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
                <h3>{event.name}</h3>
                <h4>{`${user.name} ${user.surname}`}</h4>
                <h5>{text}</h5>
                <h5>{grade}</h5>
                <h5>{createdAt}</h5>
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired,
};

export default Comment;
