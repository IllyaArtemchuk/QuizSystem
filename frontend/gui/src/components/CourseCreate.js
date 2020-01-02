import React from "react";
import CustomForm from "./Form";

class CourseCreate extends React.Component {
  render() {
    return (
      <div>
        <CustomForm requestType="post" buttonText="Create" teacher={} />
      </div>
    );
  }
}

export default CourseCreate;
