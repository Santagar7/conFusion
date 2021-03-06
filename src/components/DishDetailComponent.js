import React, {Component} from "react";
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Breadcrumb,
    BreadcrumbItem,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Row, Label, Col,
} from "reactstrap";
import {Link} from "react-router-dom";
import Moment from "moment";
import {Control, Errors, LocalForm} from "react-redux-form";
import {Loading} from "./LoadingComponent";
import {baseUrl} from "../shared/baseUrl";
import {FadeTransform, Fade, Stagger} from "react-animation-components";
import Switch from "react-router-dom/es/Switch";

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RenderDish({dish}) {
    return (<div className={"col-12 col-md-5 m-1"}>
        <FadeTransform in transformProps={{exitTransform: "scale(0.5) translateY(-50%)"}}>
            <Card>
                <CardImg width={"100%"} src={baseUrl + dish.image} alt={dish.name}/>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    </div>)
}


class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}><span className={"fa fa-pencil fa-lg"}></span>Submit
                    Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)} className={"p-2"}>
                            <Row className={"form-group mt-2 mb-2"}>
                                <Label htmlFor={"rating"}>Rating</Label>
                                <Control.select model={".rating"} id={"rating"} name={"rating"}
                                                className={"form-control"}>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </Control.select>
                            </Row>
                            <Row className={"form-group mt-2 mb-2"}>
                                <Label htmlFor={"author"}>Your Name</Label>
                                <Control.text model={".author"} id={"author"} name={"author"} placeholder={"Your Name"}
                                              className={"form-control"}
                                              validators={{
                                                  minLength: minLength(3),
                                                  maxLength: maxLength(15)
                                              }}/>
                                <Errors model={".author"} show={"touched"} className={"text-danger"}
                                        messages={{
                                            minLength: "Must be at least 3 characters",
                                            maxLength: "Must be 15 characters or less"
                                        }}/>
                            </Row>
                            <Row className={"form-group mt-2 mb-2"}>
                                <Label htmlFor={"comment"}>Comment</Label>
                                <Control.textarea rows={8} model={".comment"} id={"comment"} name={"comment"}
                                                  className={"form-control"}/>
                            </Row>
                            <Row className={"form-group mt-2 mb-2"}>
                                <Col md={{size: 10}}>
                                    <Button type={"submit"} value={"submit"} color={"primary"}>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}


function RenderComments({comments, postComment, dishId}) {

    const mappedComments = comments.map((comment) => {
        return (
            <Fade in>
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author}, {Moment(comment.date).format('MMM d, YYYY')}</p>
                </li>
            </Fade>
        )
    });

    return (<div className={"col-12 col-md-5 m-1"}>
        <h4>Comments</h4>
        <ul className={"list-unstyled"}>
            <Stagger in>
                {mappedComments}
            </Stagger>
        </ul>
        <CommentForm dishId={dishId} postComment={postComment}/>
    </div>)
}

const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <Loading/>
                </div>
            </div>
        )
    } else if (props.errMess) {
        return (
            <div className={"container"}>
                <div className={"row"}>
                    <h4>props.errMess</h4>
                </div>
            </div>
        )
    }
    if (props.dish != null) {
        return (<div className={"container"}>
            <Breadcrumb>
                <BreadcrumbItem><Link to={"/menu"}>Menu</Link></BreadcrumbItem>
                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
            </Breadcrumb>
            <div className={"col-12"}>
                <h3>{props.dish.name}</h3>
                <hr/>
            </div>
            <div className={"row"}>
                <RenderDish dish={props.dish}/>
                <RenderComments comments={props.comments} postComment={props.postComment}
                                dishId={props.dish.id}/>
            </div>
        </div>);
    } else {
        return (<div></div>)
    }

}


export default DishDetail;