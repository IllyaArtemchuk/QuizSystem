import React from "react";
import Courses from "../components/Courses";
import axios from "axios";

class CourseList extends React.Component {
  state = {
    courses: []
  };

  componentDidMount() {
    const userID = this.props.match.params.userID;
    axios.get(`http://127.0.0.1:8000/api/v1/${userID}/courses/`).then(res => {
      this.setState({
        courses: res.data
      });
    });
  }
  render() {
    return <Courses data={this.state.courses} />;
  }
}

export default CourseList;
