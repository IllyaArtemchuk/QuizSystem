import React from "react";
import Courses from "../components/Courses";
import axios from "axios";

class CourseList extends React.Component {
  state = {
    courses: []
  };

  componentDidMount() {
    axios.get("http://127.0.0.1:8000/api/v1/1/courses/").then(res => {
      this.setState({
        courses: res.data
      });
      console.log(res.data);
    });
  }
  render() {
    return <Courses data={this.state.courses} />;
  }
}

export default CourseList;
