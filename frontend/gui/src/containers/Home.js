import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Row, Col } from "antd";
import CourseList from "./CourseListView";

class Home extends React.Component {
  state = {
    user: {}
  };

  componentDidMount() {
    if (this.props.token !== null) {
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
          console.log(this.props.token);
          console.log(err);
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      console.log(this.props.token);
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
          console.log(this.props.token);
          console.log(err);
        });
    }
  }
  render() {
    return (
      <div>
        <Row>
          <Col span={8}></Col>
          <Col style={{ textAlign: "center", fontSize: "20px" }} span={8}>
            Your Courses
          </Col>
          <Col span={6} style={{ textAlign: "right" }}>
            {this.state.user.username}
            {" : "}
            {this.state.user.role === "TE" ? "Teacher" : "Student"}
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row>
          <CourseList token={this.props.token} />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    loading: state.loading,
    error: state.error
  };
};

export default connect(mapStateToProps)(Home);
