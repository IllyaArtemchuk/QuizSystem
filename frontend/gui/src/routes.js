import React from "react";
import { Route } from "react-router-dom";
import CourseList from "./containers/CourseListView";
import CourseDetail from "./containers/CourseDetailView";
import CourseCreate from "./containers/CourseCreateView";

const BaseRouter = () => (
  <div>
    <Route exact path="/home/:userID" component={CourseList} />
    <Route exact path="/course/:courseID" component={CourseDetail} />
    <Route exact path="/create/course" component={CourseCreate} />
  </div>
);

export default BaseRouter;
