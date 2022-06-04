import React, {Component} from "react";
import {Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import Moment from "moment";

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish) {
        if (dish != null) {
            return (
                <div className={"col-12 col-md-5 m-1"}>
                    <Card>
                        <CardImg width={"100%"} src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            )
        } else {
            return (<div></div>)
        }
    }

    renderComments(comments) {
        if (comments != null) {
            const mappedComments = comments.map((comment) => {
                return (
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>-- {comment.author}, {Moment(comment.date).format('MMM d, YYYY')}</p>
                    </li>
                )
            });

            return (
                <div className={"col-12 col-md-5 m-1"}>
                    <h4>Comments</h4>
                    <ul className={"list-unstyled"}>
                        {mappedComments}
                    </ul>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }

    render() {
        return (
            <div className={"container row"}>
                {this.renderDish(this.props.selectedDish)}
                {this.renderComments(this.props.selectedDish.comments)}
            </div>
        );

    }

}

export default DishDetail