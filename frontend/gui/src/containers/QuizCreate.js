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
const { TextArea } = Input;

class QuizCreateQuestions extends React.Component {
  state = {
    quiz: {},
    questionContent: "",
    choices: [],
    questionNumber: 1,
    correctAnswer: 0
  };

  getQuizData = () => {
    const quizID = this.props.match.params.quizID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.get(`http://127.0.0.1:8000/api/v1/quiz/${quizID}/`).then(res => {
      this.setState({
        quiz: res.data
      });
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

  handleSubmit = () => {
    console.log("submitted");
  };

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
      return <div>Add Choices</div>;
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
              Correct Answer
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
