import React from "react";
import Quizes from "../components/Quizes";
import { Row, Col, message } from "antd";
import axios from "axios";

class QuizList extends React.Component {
  state = {
    quizes: [],
    graded: []
  };

  getQuizData = () => {
    const courseID = this.props.courseID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .get(`http://127.0.0.1:8000/api/v1/quizes/${courseID}`)
      .then(res => {
        this.setState({
          quizes: res.data
        });
      })
      .catch(err => {
        message.error(err);
      });
  };

  getGradedData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .get(`http://127.0.0.1:8000/api/v1/graded/`)
      .then(res => {
        this.setState({
          graded: res.data
        });
      })
      .catch(err => {
        message.error(err);
      });
  };

  componentDidMount() {
    if (this.props.token !== null) {
      this.getQuizData();
      this.getGradedData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.getQuizData();
      this.getGradedData();
    }
  }

  render() {
    return (
      <Row justify="center">
        <Col span={8}></Col>
        <Col span={8}>
          <Quizes data={this.state.quizes} graded={this.state.graded} />
        </Col>
        <Col span={8}></Col>
      </Row>
    );
  }
}

export default QuizList;
