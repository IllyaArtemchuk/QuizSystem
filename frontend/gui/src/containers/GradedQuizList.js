import React from "react";
import { List, Progress, message, Row, Col } from "antd";
import { connect } from "react-redux";
import axios from "axios";

class GradedQuizList extends React.Component {
  state = {
    graded: []
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
      this.getGradedData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.getGradedData();
    }
  }

  render() {
    return (
      <div>
        <Row style={{ textAlign: "center", fontSize: "25px" }}>
          Graded Quizes
        </Row>
        <Row>
          <Col span={8}></Col>
          <List
            dataSource={this.state.graded}
            itemLayout="horizontal"
            renderItem={item => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Progress
                      type="circle"
                      percent={item.grade * 100}
                      width={55}
                    />
                  }
                  title={item.quiz.title}
                />
              </List.Item>
            )}
          />
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

export default connect(mapStateToProps)(GradedQuizList);
