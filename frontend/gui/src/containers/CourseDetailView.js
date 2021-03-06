import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import CustomForm from "../components/Form";
import QuizList from "./QuizList";
import history from "../history";
import { Card, Icon, Button, Typography, message } from "antd";

class CourseDetail extends React.Component {
  _isMounted = false;

  state = {
    course: [],
    user: {},
    settingsShowing: false,
    editShowing: false,
    deleteTriggered: false
  };

  getUserData = () => {
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
        message.error(err.message);
      });
  };

  getCourseData = () => {
    const courseID = this.props.match.params.courseID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .get(`http://127.0.0.1:8000/api/v1/course/${courseID}/`)
      .then(res => {
        this.setState({
          course: res.data
        });
      })
      .catch(err => {
        console.log(err.message);
        message.error(err.message);
        history.push("/home");
      });
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.token !== null) {
      this.getUserData();
      this.getCourseData();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.token !== prevProps.token ||
      this.props.location.pathname !== prevProps.location.pathname
    ) {
      this.getUserData();
      this.getCourseData();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  handleSettingsVisibility = e => {
    this.state.settingsShowing
      ? this.setState({ settingsShowing: false })
      : this.setState({ settingsShowing: true });
  };

  handleEditVisibility = e => {
    this.state.editShowing
      ? this.setState({ editShowing: false })
      : this.setState({ editShowing: true });
  };

  showDeleteConfirm = e => {
    this.state.deleteTriggered
      ? this.setState({ deleteTriggered: false })
      : this.setState({ deleteTriggered: true });
  };

  handleDelete = e => {
    const courseID = this.props.match.params.courseID;
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .delete(`http://127.0.0.1:8000/api/v1/course/${courseID}/`)
      .then(res => {
        history.push("/home");
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  render() {
    return (
      <div>
        {this.state.editShowing ? (
          <div>
            <CustomForm
              requestType="put"
              course={this.state.course}
              courseID={this.props.match.params.courseID}
              buttonText="Update"
              content={this.state.course}
              token={this.props.token}
            />
            <Button type="primary" onClick={e => this.handleEditVisibility(e)}>
              Cancel Edit
            </Button>
          </div>
        ) : (
          <Card
            style={{ textAlign: "center" }}
            extra={
              <div style={{ verticalAlign: "baseline" }}>
                {this.state.settingsShowing ? (
                  <span>
                    <Icon
                      onClick={e => this.showDeleteConfirm(e)}
                      style={{
                        fontSize: "30px",
                        marginRight: "10px",
                        color: "rgb(230, 0, 0)"
                      }}
                      type="delete"
                    />
                    <Icon
                      onClick={e => this.handleEditVisibility(e)}
                      style={{
                        fontSize: "30px",
                        marginRight: "10px",
                        color: "rgb(116, 173, 214)"
                      }}
                      type="edit"
                    />
                  </span>
                ) : (
                  <div></div>
                )}
                {this.state.user.role == "TE" ? (
                  <Icon
                    type="setting"
                    onClick={e => this.handleSettingsVisibility(e)}
                    style={{ fontSize: "30px" }}
                  />
                ) : null}
              </div>
            }
            title={this.state.course.title}
          >
            <p>{this.state.course.description}</p>
          </Card>
        )}

        {this.state.deleteTriggered ? (
          <Card title="Are you sure you want to delete this course?">
            <p>
              Deleting this course will delete all the quizes associated with
              it.
            </p>
            <p>
              <Button
                type="danger"
                onClick={e => this.handleDelete(e)}
                style={{ marginRight: "15px" }}
              >
                DELETE
              </Button>
              <Button type="primary" onClick={e => this.showDeleteConfirm(e)}>
                Cancel
              </Button>
            </p>
          </Card>
        ) : (
          <div></div>
        )}
        <Typography style={{ textAlign: "center", fontSize: "25px" }}>
          Quizes
        </Typography>

        <QuizList
          courseID={this.props.match.params.courseID}
          token={this.props.token}
          role={this.state.user.role}
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

export default connect(mapStateToProps)(CourseDetail);
