import React from "react";
import Courses from "../components/Courses";
import CustomForm from "../components/Form";
import axios from "axios";
import { Card, Icon, Button } from "antd";

class CourseDetail extends React.Component {
  state = {
    course: [],
    settingsShowing: false,
    editShowing: false,
    deleteTriggered: false
  };

  componentDidMount() {
    const courseID = this.props.match.params.courseID;
    axios.get(`http://127.0.0.1:8000/api/v1/course/${courseID}/`).then(res => {
      this.setState({
        course: res.data
      });
    });
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
    axios
      .delete(`http://127.0.0.1:8000/api/v1/course/${courseID}/`)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        {this.state.editShowing ? (
          <div>
            <CustomForm
              requestType="put"
              courseID={this.props.match.params.courseID}
              buttonText="Update"
              content={this.state.course}
            />
            <Button type="primary" onClick={e => this.handleEditVisibility(e)}>
              Cancel Edit
            </Button>
          </div>
        ) : (
          <Card
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
                <Icon
                  type="setting"
                  onClick={e => this.handleSettingsVisibility(e)}
                  style={{ fontSize: "30px" }}
                />
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
      </div>
    );
  }
}

export default CourseDetail;
