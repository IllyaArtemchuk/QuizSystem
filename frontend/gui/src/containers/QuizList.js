import React from "react";
import Quizes from "../components/Quizes";
import { Row, Col } from "antd";
import axios from "axios";

class QuizList extends React.Component {
  state = {
    quizes: []
  };

  getQuizData = () => {
    const courseID = this.props.courseID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.get(`http://127.0.0.1:8000/api/v1/quizes/${courseID}`).then(res => {
      this.setState({
        quizes: res.data
      });
    });
  };

  componentDidMount() {
    if (this.props.token !== null) {
      this.getQuizData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.getQuizData();
    }
  }

  render() {
    return (
      <Row justify="center">
        <Col span={8}></Col>
        <Col span={8}>
          <Quizes data={this.state.quizes} />
        </Col>
        <Col span={8}></Col>
      </Row>
    );
  }
}

export default QuizList;
