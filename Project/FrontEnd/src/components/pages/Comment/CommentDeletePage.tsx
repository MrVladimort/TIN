import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import commentApi from "../../../api/comment";

interface ICommentDeletePageProps {
    history: {
        push: Function
    };
    location: any;
}

class CommentDeletePage extends React.Component<ICommentDeletePageProps> {
    static propTypes = {};

    constructor(props: ICommentDeletePageProps) {
        super(props);
    }

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const commentId = String(query.get('commentId'));
        await commentApi.deleteComment(commentId);
        this.props.history.push("/");
    }
    render() {
        return (
            <div>

            </div>
        )
    }
}

CommentDeletePage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(CommentDeletePage);
