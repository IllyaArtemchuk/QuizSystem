import React from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

class CustomForm extends React.Component {
  handleSubmit = (event, requestType, courseID) => {
    const title = event.target.elements.title.value;
    const description = event.target.elements.title.value;
    const teacher = 17;
    console.log(title, description, teacher);

    switch (requestType) {
      case "post":
        return axios
          .post(`http://127.0.0.1:8000/api/v1/course/create/`, {
            title: title,
            description: description,
            teacher: 17,
            students: [],
            quizes: []
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
      case "put":
        return axios
          .put(`http://127.0.0.1:8000/api/v1/course/${courseID}/`, {
            title: title,
            description: description,
            teacher: 17,
            students: [],
            quizes: []
          })
          .then(res => console.log(res))
          .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Form
        onSubmit={e =>
          this.handleSubmit(e, this.props.requestType, this.props.courseID)
        }
      >
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
