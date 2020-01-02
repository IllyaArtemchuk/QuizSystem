import React from "react";
import { Route, Redirect } from "react-router-dom";
import CourseList from "./containers/CourseListView";
import CourseDetail from "./containers/CourseDetailView";
import CourseCreate from "./containers/CourseCreateView";
import PrivateRoute from "./PrivateRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";

const BaseRouter = () => (
  <div>
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <PrivateRoute exact path="/home" component={Home} />
    <PrivateRoute exact path="/home/:userID" component={CourseList} />
    <PrivateRoute exact path="/course/:courseID" component={CourseDetail} />
    <PrivateRoute exact path="/create/course" component={CourseCreate} />
  </div>
);

export default BaseRouter;
