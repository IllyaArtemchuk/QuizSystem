import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Row, Col, Button, Card } from "antd";
import { Radio } from "antd";

class QuizTake extends React.Component {
  state = {
    data: [],
    takingQuiz: false,
    questionNumber: 0,
    multipleChoiceValue: 0,
    submittedAnswers: []
  };

  getQuizData() {
    const quizID = this.props.match.params.quizID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.get(`http://127.0.0.1:8000/api/v1/quiz/${quizID}`).then(res => {
      console.log("this is quiz data", res.data);
      this.setState({
        data: res.data
      });
    });
  }

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

  //Code to make the multiple choice selections work
  onChoiceChange = e => {
    console.log("radio checked", e.target.value);
    this.setState({
      multipleChoiceValue: e.target.value
    });
  };

  //Handles which question the map() should be rendering
  handleQuestionNumber = () => {
    const questionNumber = this.state.questionNumber;
    return this.state.data.questions[questionNumber];
  };

  takingQuizToggle = e => {
    this.state.takingQuiz
      ? this.setState({ takingQuiz: false })
      : this.setState({ takingQuiz: true });
  };

  render() {
    const radioStyle = {
      display: "block",
      height: "30px",
      lineHeight: "30px"
    };
    return (
      <div>
        <Row justify="center">
          <Col style={{ textAlign: "center", fontSize: "25px" }}>
            <h2>{this.state.data.title}</h2>
          </Col>
        </Row>
        <Row>
          <Col span={4}></Col>

          {this.state.data.questions ? (
            <Col span={16} style={{ textAlign: "center" }}>
              {!this.state.takingQuiz ? (
                <div>
                  <h3 style={{ textAlign: "center" }}>
                    Number of questions: {this.state.data.questions.length}
                  </h3>
                  <Button
                    style={{
                      backgroundColor: "rgb(80, 130, 230)",
                      color: "White"
                    }}
                    type="Primary"
                    size="large"
                    onClick={() => this.takingQuizToggle()}
                  >
                    Start
                  </Button>
                </div>
              ) : (
                <div>
                  <Card
                    title={`${this.state.questionNumber + 1}) ${
                      this.handleQuestionNumber().content
                    }`}
                  >
                    <Radio.Group
                      value={this.state.multipleChoiceValue}
                      onChange={this.onChoiceChange}
                    >
                      {this.handleQuestionNumber().choices.map(
                        (choice, index) => (
                          <Radio
                            style={radioStyle}
                            value={choice.choice_number}
                            key={index}
                          >
                            {choice.text}
                          </Radio>
                        )
                      )}
                    </Radio.Group>
                  </Card>
                  <Button
                    type="primary"
                    size="large"
                    style={{ marginTop: "25px" }}
                  >
                    Next Question
                  </Button>
                </div>
              )}
            </Col>
          ) : null}
          <Col span={4}></Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token
  };
};

export default connect(mapStateToProps)(QuizTake);
