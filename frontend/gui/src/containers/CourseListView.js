import React from "react";
import Courses from "../components/Courses";
import axios from "axios";

class CourseList extends React.Component {
  state = {
    courses: []
  };

  componentDidMount() {
    if (this.props.token !== null) {
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${this.props.token}`
      };
      axios.get(`http://127.0.0.1:8000/api/v1/courses/`).then(res => {
        this.setState({
          courses: res.data
        });
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
      axios.get(`http://127.0.0.1:8000/api/v1/courses/`).then(res => {
        this.setState({
          courses: res.data
        });
      });
    }
  }
  render() {
    return <Courses data={this.state.courses} />;
  }
}

export default CourseList;
