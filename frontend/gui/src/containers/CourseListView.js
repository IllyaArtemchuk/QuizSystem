import React from "react";
import Courses from "../components/Courses";
import axios from "axios";

class CourseList extends React.Component {
  state = {
    courses: []
  };

  getCourseData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.get(`http://127.0.0.1:8000/api/v1/courses/`).then(res => {
      this.setState({
        courses: res.data
      });
    });
  };

  componentDidMount() {
    if (this.props.token !== null) {
      this.getCourseData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.getCourseData();
    }
  }
  render() {
    return <Courses data={this.state.courses} />;
  }
}

export default CourseList;
