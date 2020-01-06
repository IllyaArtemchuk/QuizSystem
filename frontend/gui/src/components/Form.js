import React from "react";
import axios from "axios";
import history from "../history";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

class CustomForm extends React.Component {
  handleSubmit = (event, requestType) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };

    switch (requestType) {
      case "post":
        return axios
          .post(`http://127.0.0.1:8000/api/v1/course/create/`, {
            title: title,
            description: description,
            teacher: this.props.user.id,
            students: [],
            quizes: []
          })
          .then(res => history.push(`/course/${res.data.id}`))
          .catch(err => console.log(err));
      case "put":
        return axios
          .put(`http://127.0.0.1:8000/api/v1/course/${this.props.course.id}/`, {
            title: title,
            description: description,
            teacher: this.props.course.teacher,
            students: this.props.course.students,
            quizes: this.props.course.quizes
          })
          .then(window.location.reload(false))
          .catch(err => console.log(err));
      default:
        console.log("Request type invalid");
    }
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e, this.props.requestType)}>
        <Form.Item label="Title">
          <Input
            name="title"
            defaultValue={this.props.content ? this.props.content.title : null}
            placeholder={
              this.props.content ? this.props.content.title : "Name The Course"
            }
          />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea
            name="description"
            defaultValue={
              this.props.content ? this.props.content.description : null
            }
            placeholder={
              this.props.content
                ? this.props.content.description
                : "Provide a description"
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {this.props.buttonText}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CustomForm;
