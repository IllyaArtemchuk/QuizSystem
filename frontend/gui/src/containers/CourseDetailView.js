import React from "react";
import Courses from "../components/Courses";
import axios from "axios";

class CourseDetail extends React.Component {
  state = {
    course: []
  };

  componentDidMount() {
    axios
      .get(`http://127.0.0.1:8000/api/v1/1/${courseID}/quizes/`)
      .then(res => {
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

export default CourseDetail;
