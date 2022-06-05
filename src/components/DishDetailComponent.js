import React from "react";
import {Card, CardBody, CardImg, CardText, CardTitle, Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";
import Moment from "moment";


function RenderDish({dish}) {
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
}


function RenderComments({comments}) {

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
}

const DishDetail = (props) => {
    if (props.dish != null) {
        return (
            <div className={"container"}>
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
            </div>
        );
    } else {
        return (
            <div></div>
        )
    }

}


export default DishDetail;