import React from "react";
import axios from "axios";
import { Form, Input, Button } from "antd";
const { TextArea } = Input;

class CustomForm extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
    const title = event.target.elements.title.value;
    const description = event.target.elements.title.value;
    const teacher = 17;
    console.log(title, description, teacher);
    //axios.post(`http://127.0.0.1:8000/api/v1/course/create/`).then(res => {
    //  this.setState({
    //    course: res.data
    //  });
    // });
  };

  render() {
    return (
      <Form onSubmit={e => this.handleSubmit(e)}>
        <Form.Item label="Title">
          <Input name="title" placeholder="Name the course" />
        </Form.Item>
        <Form.Item label="Description">
          <TextArea name="description" placeholder="Provide a description" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default CustomForm;
