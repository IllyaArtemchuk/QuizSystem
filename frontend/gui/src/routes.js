import React from "react";
import { Route } from "react-router-dom";
import CourseList from "./containers/CourseListView";

const BaseRouter = () => (
  <div>
    <Route exact path="/" component={CourseList} />
    <Route exact path="/:courseID" component={CourseList} />
  </div>
);

export default BaseRouter;
