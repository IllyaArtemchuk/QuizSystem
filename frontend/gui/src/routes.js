import React from "react";
import { Route, Redirect } from "react-router-dom";
import CourseDetail from "./containers/CourseDetailView";
import QuizDetail from "./containers/QuizDetail";
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
    <PrivateRoute exact path="/course/:courseID" component={CourseDetail} />
    <PrivateRoute exact path="/quiz/:quizID" component={QuizDetail} />
  </div>
);

export default BaseRouter;
