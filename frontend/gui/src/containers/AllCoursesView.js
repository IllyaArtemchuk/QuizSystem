import React from "react";
import { List, Button, message } from "antd";
import { connect } from "react-redux";
import axios from "axios";

class AllCourses extends React.Component {
  state = {
    courses: [],
    student: {}
  };
  getAllCourseData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.get(`http://127.0.0.1:8000/api/v1/courses/all/`).then(res => {
      this.setState({
        courses: res.data
      });
    });
  };

  getStudentData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios.get(`http://127.0.0.1:8000/api/v1/student/current/`).then(res => {
      this.setState({
        student: res.data
      });
    });
  };

  componentDidMount() {
    if (this.props.token !== null) {
      this.getAllCourseData();
      this.getStudentData();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.getAllCourseData();
      this.getStudentData();
    }
  }

  joinCourse = item => {
    const newStudents = item.students.concat(this.state.student.id);
    console.log(item.title);
    console.log(item.description);
    console.log(item.teacher.id);
    console.log(item.quizes);
    axios
      .put(`http://127.0.0.1:8000/api/v1/course/${item.id}/`, {
        title: item.title,
        description: item.description,
        teacher: item.teacher.id,
        students: newStudents,
        quizes: item.quizes
      })
      .then(window.location.reload(false))
      .catch(err => message.error(err.message));
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: "center" }}></h1>
        <List
          pagination={{
            onChange: page => {
              console.log(page);
            },
            pageSize: 4
          }}
          size="large"
          bordered
          dataSource={this.state.courses}
          renderItem={item => (
            <List.Item style={{ textAlign: "center" }}>
              <List.Item.Meta
                avatar={
                  <Button
                    onClick={() => this.joinCourse(item)}
                    style={{ marginRight: "-200px" }}
                  >
                    Join
                  </Button>
                }
                title={item.title}
                description={item.teacher.username}
              />
              {item.description}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token
  };
};

export default connect(mapStateToProps)(AllCourses);
