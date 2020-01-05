import React from "react";
import { Card, Progress, Button, Row, Col } from "antd";

class QuizComplete extends React.Component {
  calculatePercentage = () => {
    return this.props.correctRatio * 100;
  };

  render() {
    return (
      <Card title="You have completed the quiz">
        <Row>
          <Progress
            type="circle"
            percent={this.calculatePercentage()}
            style={{ marginRight: "20px" }}
          />
          You scored {this.props.numberCorrect} out of {this.props.questions}
        </Row>

        <Button type="primary" style={{ marginTop: "25px" }}>
          {" "}
          Return To Course{" "}
        </Button>
      </Card>
    );
  }
}

export default QuizComplete;
