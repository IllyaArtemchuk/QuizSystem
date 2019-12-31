import React from "react";
import Courses from "../components/Courses";
import axios from "axios";
import { Card } from "antd";

class CourseDetail extends React.Component {
  state = {
    course: []
  };

  componentDidMount() {
    const courseID = this.props.match.params.courseID;
    axios.get(`http://127.0.0.1:8000/api/v1/course/${courseID}/`).then(res => {
      this.setState({
        course: res.data
      });
    });
  }
  render() {
    return (
      <Card title={this.state.course.title}>
        <p></p>
      </Card>
    );
  }
}

export default CourseDetail;
