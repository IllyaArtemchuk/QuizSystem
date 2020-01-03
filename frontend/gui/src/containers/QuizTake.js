import React from "react";
import connect from "react-redux";
class QuizTake extends React.Component {
  state = {
    quiz: {},
    questions: [],
    choices: [],
    takingQuiz: false,
    questionNumber: 0,
    submittedAnswers: []
  };
  render() {
    return (
      <div>
        <h1> Hello!</h1>
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
