import React from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

class CustomForm extends React.Component {
  handleSubmit = (event, requestType) => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.description.value;
    const teacherID = this.props.course.teacher;
    const students = this.props.course.students;
    const quizes = this.props.course.quizes;

    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    console.log("here is course object", this.props.course);
    console.log(
      "this is the data sent to the custom form submit",
      title,
      description,
      teacherID,
      students,
      quizes
    );

    switch (requestType) {
      case "post":
        return axios
          .post(`http://127.0.0.1:8000/api/v1/course/create/`, {
            title: title,
            description: description,
            teacher: teacherID,
            students: students,
            quizes: quizes
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      case "put":
        return axios
          .put(`http://127.0.0.1:8000/api/v1/course/${this.props.course.id}/`, {
            title: title,
            description: description,
            teacher: teacherID,
            students: students,
            quizes: quizes
          })
          .then(this.props.history.push(`/course/${this.props.course.id}`))
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
