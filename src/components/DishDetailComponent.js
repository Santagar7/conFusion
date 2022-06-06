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

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

function RenderDish({dish}) {
    return (<div className={"col-12 col-md-5 m-1"}>
        <Card>
            <CardImg width={"100%"} src={dish.image} alt={dish.name}/>
            <CardBody>
                <CardTitle>{dish.name}</CardTitle>
                <CardText>{dish.description}</CardText>
            </CardBody>
        </Card>
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
        console.log("Current State is: " + JSON.stringify(values));
        alert("Current State is: " + JSON.stringify(values));
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


function RenderComments({comments}) {

    const mappedComments = comments.map((comment) => {
        return (<li key={comment.id}>
            <p>{comment.comment}</p>
            <p>-- {comment.author}, {Moment(comment.date).format('MMM d, YYYY')}</p>
        </li>)
    });

    return (<div className={"col-12 col-md-5 m-1"}>
        <h4>Comments</h4>
        <ul className={"list-unstyled"}>
            {mappedComments}
        </ul>
        <CommentForm/>
    </div>);
}

const DishDetail = (props) => {
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
                <RenderComments comments={props.comments}/>
            </div>
        </div>);
    } else {
        return (<div></div>)
    }

}


export default DishDetail;