import React from "react";
import CustomForm from "../components/Form";

class CourseCreate extends React.Component {
  render() {
    return (
      <div>
        <h2>Create A New Course</h2>
        <CustomForm requestType="post" buttonText="Create" courseID={null} />
      </div>
    );
  }
}

export default CourseCreate;
