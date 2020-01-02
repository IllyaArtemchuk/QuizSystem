import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Row, Col, Button } from "antd";
import CourseList from "./CourseListView";
import CustomForm from "../components/Form";

class Home extends React.Component {
  state = {
    user: {},
    newCourseShowing: false
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

  newCourseToggle = e => {
    this.state.newCourseShowing
      ? this.setState({ newCourseShowing: false })
      : this.setState({ newCourseShowing: true });
  };

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
          {this.state.newCourseShowing ? (
            <CustomForm
              requestType="post"
              user={this.state.user}
              buttonText={"Create"}
              token={this.props.token}
            />
          ) : (
            <CourseList token={this.props.token} />
          )}
        </Row>
        <Row>
          <Col span={8}></Col>
          <Col span={8} style={{ textAlign: "center", marginTop: "15px" }}>
            <Button
              type="primary"
              style={{ marginLeft: "20px" }}
              onClick={e => this.newCourseToggle(e)}
            >
              {this.state.newCourseShowing ? "Cancel" : "New Course"}
            </Button>
          </Col>
          <Col span={8}></Col>
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
