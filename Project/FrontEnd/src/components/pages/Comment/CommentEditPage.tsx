import * as React from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import commentApi from "../../../api/comment";
import Input from "../../baseComponents/Input";
import Button from "../../baseComponents/Button";

interface ICommentEditPageState {
    comment: any;
    formData: {
        text: string;
        grade: number;
    };
}

interface ICommentEditPageProps {
    history: {
        push: Function
    };
    location: any;
}

class ArtistEditPage extends React.Component<ICommentEditPageProps, ICommentEditPageState> {
    static propTypes = {};

    constructor(props: ICommentEditPageProps) {
        super(props);

        this.state = {
            comment: null,
            formData: {
                text: "",
                grade: 0,
            }
        }
    }

    onCommentSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const {comment, formData} = this.state;

        const formDataChecked = {
            text: formData.text === "" ? comment.name : formData.text,
            grade: formData.grade === 0 ? comment.style : formData.grade,
        };

        await commentApi.editComment(comment.commentId, formDataChecked);
        this.props.history.push("/")
    };

    handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;
        this.setState({formData: {...this.state.formData, [name]: value.trim()}});
    };

    handleNumberChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = event.target;

        const numberedValue = isNaN(Number(value)) ? 0 : Number(value);
        this.setState({formData: {...this.state.formData, [name]: numberedValue}});
    };

    async componentDidMount(): Promise<void> {
        const query = new URLSearchParams(this.props.location.search);
        const commentId = String(query.get('commentId'));
        const commentResponse = await commentApi.getComment(commentId);
        this.setState({comment: commentResponse.comment});
    }

    render() {
        const {comment} = this.state;
        return (
            <div className="formContainer" style={{margin: "auto"}}>
                <div className="eventsContainer" style={{margin: "auto", textAlign: "center"}}>
                    {comment && <h1>Text: {comment.text}</h1>}
                    {comment && <h1>Grade: {comment.grade}</h1>}

                    <div style={{textAlign: "left"}}>
                        <form className="form" onSubmit={this.onCommentSubmit}>
                            <Input name={"text"} placeholder={"Text here"} label={"Text"}
                                   onChange={this.handleChange}/>
                            <Input name={"grade"} placeholder={"Grade here"} label={"Grade"}
                                   onChange={this.handleNumberChange}/>
                            <Button text="Edit Comment" type="submit"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

ArtistEditPage.propTypes = {
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired,
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(ArtistEditPage);
