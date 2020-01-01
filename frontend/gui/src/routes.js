import React from "react";
import { Route } from "react-router-dom";
import CourseList from "./containers/CourseListView";
import CourseDetail from "./containers/CourseDetailView";
import CourseCreate from "./containers/CourseCreateView";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/home/:userID" component={CourseList} />
    <Route exact path="/courses/:courseID" component={CourseDetail} />
    <Route exact path="/create/course" component={CourseCreate} />
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
  </div>
);

export default BaseRouter;
