import React from "react";
import Quizes from "../components/Quizes";
import QuizForm from "../components/NewQuizForm";
import { Row, Col, message, Button } from "antd";
import axios from "axios";

class QuizList extends React.Component {
  state = {
    quizes: [],
    graded: [],
    newQuizShowing: false
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
        message.error(err.message);
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

  showNewQuiz = e => {
    this.state.newQuizShowing
      ? this.setState({ newQuizShowing: false })
      : this.setState({ newQuizShowing: true });
  };

  render() {
    return (
      <Row justify="center">
        <Row>
          <Col span={8}></Col>
          <Col span={8} style={{ textAlign: "center" }}>
            {this.state.newQuizShowing ? (
              <QuizForm
                token={this.props.token}
                courseID={this.props.courseID}
              />
            ) : (
              <div>
                {this.props.role === "TE" ? (
                  <Button
                    onClick={e => this.showNewQuiz(e)}
                    type="primary"
                    style={{ marginTop: "6px", marginBottom: "15px" }}
                  >
                    Create New Quiz
                  </Button>
                ) : null}
              </div>
            )}
          </Col>
          <Col span={8}></Col>
        </Row>
        <Row>
          <Col span={8}></Col>
          <Col span={8}>
            <Quizes data={this.state.quizes} graded={this.state.graded} />
          </Col>
          <Col span={8}></Col>
        </Row>
      </Row>
    );
  }
}

export default QuizList;
