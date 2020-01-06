import React from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";

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
      //history.push(`/quiz/${res.data.id}/create/`)
      .then(res => console.log(res))
      .catch(err => console.log(err));
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
