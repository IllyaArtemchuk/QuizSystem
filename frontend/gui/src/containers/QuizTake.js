import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import history from "../history";
import { Row, Col, Button, Card, Typography, message } from "antd";
import QuizComplete from "../components/QuizComplete";
import { Radio } from "antd";
const { Text } = Typography;

class QuizTake extends React.Component {
  _isMounted = false;

  state = {
    data: [],
    user: {},
    takingQuiz: false,
    questionNumber: 0,
    multipleChoiceValue: 0,
    submittedAnswers: [],
    quizComplete: false,
    quizCompleteData: {}
  };

  getQuizData() {
    const quizID = this.props.match.params.quizID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .get(`http://127.0.0.1:8000/api/v1/quiz/${quizID}/`)
      .then(res => {
        this.setState({
          data: res.data
        });
      })
      .catch(err => message.error(err.message));
  }

  checkIfQuizComplete = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.get(`http://127.0.0.1:8000/api/v1/graded/`).then(res => {
      for (let i = 0; i < res.data.length; i++) {
        if (res.data[i].quiz == this.props.match.params.quizID) {
          console.log(res.data[i].quiz);
          message.warning("You have completed this quiz already");
          return history.push("/home");
        }
      }
    });
  };

  getUserData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .get("http://127.0.0.1:8000/api/v1/user/")
      .then(res => {
        console.log(res);
        this.setState({ user: res.data });
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.token !== null) {
      this.getQuizData();
      this.checkIfQuizComplete();
      this.getUserData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.getQuizData();
      this.checkIfQuizComplete();
      this.getUserData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
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

  //Controls the Start button
  takingQuizToggle = e => {
    this.state.takingQuiz
      ? this.setState({ takingQuiz: false })
      : this.setState({ takingQuiz: true });
  };

  //adds your submitted answer to the state and progresses the quiz to the next question
  handleNextQuestion = (question_number, choice_number) => {
    if (this.state.multipleChoiceValue === 0) {
      return message.error("You must choose an answer.");
    }
    const answer = {
      question: question_number,
      answer: choice_number
    };
    if (this.state.data.questions.length > this.state.questionNumber + 1) {
      this.setState({
        questionNumber: this.state.questionNumber + 1,
        submittedAnswers: this.state.submittedAnswers.concat(answer),
        multipleChoiceValue: 0
      });
    } else {
      this.setState(
        {
          submittedAnswers: this.state.submittedAnswers.concat(answer),
          multipleChoiceValue: 0
        },
        () => {
          this.handleSubmit();
        }
      );
    }
  };

  // Handles all submit data and activates the quiz recap data
  handleSubmit = () => {
    const correctAnswers = this.state.data.questions.map(question => {
      return {
        questionNumber: question.question_number,
        answer: question.correct_answer
      };
    });
    const submittedAnswers = this.state.submittedAnswers;
    console.log("this is submittedAnswers", submittedAnswers);
    console.log("thisd is correct answers", correctAnswers);
    let correctCount = 0;
    for (let i = 0; i < submittedAnswers.length; i++) {
      if (submittedAnswers[i].answer === correctAnswers[i].answer) {
        correctCount += 1;
      }
    }
    const correctRatio = (correctCount / correctAnswers.length).toFixed(2);
    const quizID = this.state.data.id;

    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .post(`http://127.0.0.1:8000/api/v1/grade/`, {
        student: 1,
        grade: correctRatio,
        quiz: quizID
      })
      .then(() => {
        this.setState({
          quizComplete: true,
          quizCompleteData: {
            correctRatio: correctRatio,
            numberCorrect: correctCount,
            questionCount: correctAnswers.length
          }
        });
      })
      .catch(err => {
        return message.error(err.message);
      });
  };

  handleDelete = () => {
    const quizID = this.props.match.params.quizID;
    const courseID = this.state.data.course;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .delete(`http://127.0.0.1:8000/api/v1/quiz/${quizID}/`)
      .then(
        message.success("quiz deleted"),
        history.push(`/course/${courseID}`)
      )
      .catch(err => message.error(err.message));
  };

  render() {
    const radioStyle = {
      display: "block",
      textAlign: "left",
      fontSize: "20px",
      color: "rgb(46, 45, 45)"
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
              {!this.state.quizComplete ? (
                <div>
                  {!this.state.takingQuiz ? (
                    <div>
                      <h3 style={{ textAlign: "center" }}>
                        Number of questions: {this.state.data.questions.length}
                      </h3>
                      {this.state.user.role === "TE" ? (
                        <div>
                          <Button
                            type="Primary"
                            onClick={() =>
                              history.push(`/quiz/${this.state.data.id}/create`)
                            }
                          >
                            Add Questions
                          </Button>
                          <Button
                            type="Danger"
                            style={{ color: "red", marginLeft: "10px" }}
                            onClick={() => this.handleDelete()}
                          >
                            Delete Quiz
                          </Button>
                        </div>
                      ) : (
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
                      )}
                    </div>
                  ) : (
                    <div>
                      <Card>
                        <Text
                          style={{
                            fontSize: "20px",
                            color: "black",
                            marginBottom: "25px"
                          }}
                        >
                          {`${this.state.questionNumber + 1}) ${
                            this.handleQuestionNumber().content
                          }`}
                        </Text>
                        <Row>
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
                        </Row>
                      </Card>
                      <Button
                        type="primary"
                        size="large"
                        style={{ marginTop: "18px" }}
                        onClick={() =>
                          this.handleNextQuestion(
                            this.handleQuestionNumber().question_number,
                            this.state.multipleChoiceValue
                          )
                        }
                      >
                        {this.state.data.questions.length >
                        this.state.questionNumber + 1
                          ? "Next Question"
                          : "Submit"}
                      </Button>
                    </div>
                  )}
                </div>
              ) : (
                <QuizComplete
                  numberCorrect={this.state.quizCompleteData.numberCorrect}
                  correctRatio={this.state.quizCompleteData.correctRatio}
                  questions={this.state.quizCompleteData.questionCount}
                />
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
    token: state.token
  };
};

export default connect(mapStateToProps)(QuizTake);
