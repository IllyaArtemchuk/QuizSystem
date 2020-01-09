import React from "react";
import { Route, Redirect } from "react-router-dom";
import CourseDetail from "./containers/CourseDetailView";
import AllCourses from "./containers/AllCoursesView";
import QuizTake from "./containers/QuizTake";
import PrivateRoute from "./PrivateRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import QuizCreateQuestions from "./containers/QuizCreate";

const BaseRouter = () => (
  <div>
    <Route exact path="/login/" component={Login} />
    <Route exact path="/signup/" component={Signup} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
    <PrivateRoute exact path="/home" component={Home} />
    <PrivateRoute exact path="/course/:courseID" component={CourseDetail} />
    <PrivateRoute exact path="/enroll" component={AllCourses} />
    <PrivateRoute exact path="/quiz/:quizID" component={QuizTake} />
    <PrivateRoute
      exact
      path="/quiz/:quizID/create"
      component={QuizCreateQuestions}
    />
  </div>
);

export default BaseRouter;
