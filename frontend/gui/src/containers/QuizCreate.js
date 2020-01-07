import React from "react";
import {
  Input,
  Button,
  Icon,
  Row,
  Col,
  message,
  Radio,
  Typography
} from "antd";
import axios from "axios";
import { connect } from "react-redux";
import history from "../history";
const { TextArea } = Input;

class QuizCreateQuestions extends React.Component {
  state = {
    quiz: {},
    questionContent: "",
    choices: [],
    questionNumber: 1,
    correctAnswer: 0,
    choicePostCounter: 0
  };

  getQuizData = () => {
    const quizID = this.props.match.params.quizID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.get(`http://127.0.0.1:8000/api/v1/quiz/${quizID}/`).then(res => {
      this.setState(
        {
          quiz: res.data
        },
        () => {
          this.setState({
            questionNumber: this.state.quiz.questions.length + 1
          });
        }
      );
    });
  };

  componentDidMount = () => {
    if (this.props.token !== null) {
      this.getQuizData();
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.getQuizData();
    }
  }

  onContentChange = e => {
    this.setState({ questionContent: e.target.value });
  };

  createChoice = () => {
    if (this.state.choices.length < 6) {
      this.setState(
        {
          choices: this.state.choices.concat({
            content: "",
            choice_number: this.state.choices.length + 1
          })
        },
        () => {
          console.log(this.state.choices);
        }
      );
    } else {
      message.error("You cant add more than six choices!");
    }
  };

  radioChange = e => {
    this.setState({
      correctAnswer: e.target.value
    });
  };

  handleChoiceContent = (e, i) => {
    const newChoices = [...this.state.choices];
    newChoices[i].content = e.target.value;
    this.setState({
      choices: newChoices
    });
  };

  changeCorrectAnswer = e => {
    this.setState({
      correctAnswer: e.target.value
    });
  };

  submitQuestion = e => {
    axios
      .post("http://127.0.0.1:8000/api/v1/question/create/", {
        question_number: this.state.questionNumber,
        content: this.state.questionContent,
        correct_answer: this.state.correctAnswer,
        quiz: this.props.match.params.quizID
      })
      .then(res => {
        console.log("this is choices", this.state.choices);
        this.state.choices.forEach(choice => {
          axios
            .post("http://127.0.0.1:8000/api/v1/choice/create/", {
              text: choice.content,
              choice_number: choice.choice_number,
              question: res.data.id
            })
            .then(res => {
              this.setState(
                {
                  choicePostCounter: (this.state.choicePostCounter += 1)
                },
                () => {
                  if (
                    this.state.choicePostCounter == this.state.choices.length
                  ) {
                    this.setState({
                      choicePostCounter: 0,
                      choices: []
                    });
                  }
                }
              );
            })
            .catch(err => {
              message.error(err.message);
            });
        });
      })
      .then(
        this.setState({
          questionNumber: this.state.questionNumber + 1,
          correctAnswer: 0,
          questionContent: ""
        })
      )
      .catch(err => {
        message.error(err.message);
      });
  };

  createRadios = () => {
    if (this.state.choices.length > 0) {
      return this.state.choices.map((choice, i) => (
        <Row key={i}>
          <Radio value={choice.choice_number}>
            <Input
              placeholder="Enter Choice"
              size="large"
              onChange={event => this.handleChoiceContent(event, i)}
              value={this.state.choices[i].content}
            ></Input>
          </Radio>
        </Row>
      ));
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Row>{this.state.quiz.title}</Row>
        <Row justify="center" type="flex">
          <Col span={6}></Col>
          <Col span={12} style={{ textAlign: "center" }}>
            <h2 style={{ textAlign: "center" }}>{this.state.questionNumber}</h2>
            <TextArea
              placeholder="Enter Question"
              value={this.state.questionContent}
              onChange={event => this.onContentChange(event)}
            />
          </Col>
          <Col span={6}></Col>
        </Row>
        <Row>
          <Radio.Group
            onChange={this.radioChange}
            value={this.state.correctAnswer}
          >
            <Typography style={{ textAlign: "left", marginRight: "200px" }}>
              {" "}
              {this.state.choices.length > 0 ? "Correct Answer" : ""}
            </Typography>
            {this.createRadios()}
          </Radio.Group>
        </Row>
        <Row>
          <Button
            type="primary"
            icon="plus"
            style={{ marginTop: "15px" }}
            onClick={this.createChoice}
          >
            Add Choice
          </Button>
          <Button
            type="primary"
            icon="right"
            style={{ marginTop: "15px", marginLeft: "15px" }}
            onClick={this.submitQuestion}
          >
            Submit
          </Button>
          <Button
            type="primary"
            icon="home"
            style={{ marginTop: "15px", marginLeft: "15px" }}
            onClick={() =>
              history.push(`/quiz/${this.props.match.params.quizID}`)
            }
          >
            Go Back To Quiz
          </Button>
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

export default connect(mapStateToProps)(QuizCreateQuestions);
