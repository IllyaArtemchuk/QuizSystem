import React from "react";
import { Form, Input, Button, message } from "antd";
import axios from "axios";
import history from "../history";

class QuizForm extends React.Component {
  handleSubmit = e => {
    console.log(e.target.elements.title.value);
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .post(`http://127.0.0.1:8000/api/v1/quiz/create/`, {
        title: e.target.elements.title.value,
        course: this.props.courseID,
        teacher: 1
      })
      .catch(err => message.error(err.message));
  };
  render() {
    return (
      <div>
        <Form onSubmit={e => this.handleSubmit(e)}>
          <Form.Item label="Title">
            <Input name="title" placeholder="Name The Quiz" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default QuizForm;
