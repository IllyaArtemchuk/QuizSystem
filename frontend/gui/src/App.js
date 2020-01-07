import React from "react";
import "antd/dist/antd.css";
import CustomLayout from "./containers/Layout";
import BaseRouter from "./routes";
import { Router } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import { message } from "antd";
import * as actions from "./store/actions/auth";
import history from "./history";

class App extends React.Component {
  state = { user: {} };
  getUserData = () => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.props.token}`
    };
    axios
      .get("http://127.0.0.1:8000/api/v1/user/")
      .then(res => {
        this.setState({ user: res.data }, () => {
          console.log("USER PROPS IN APP.JS", this.state.user);
        });
      })
      .catch(err => {
        message.error(err.message);
      });
  };
  componentDidMount() {
    if (this.props.token !== null) {
      this.getUserData();
    }
    this.props.onTryAutoSignup();
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.getUserData();
    }
  }
  render() {
    return (
      <div className="App">
        <Router history={history}>
          <CustomLayout {...this.props} user={this.state.user}>
            <BaseRouter />
          </CustomLayout>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.token !== null,
    token: state.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
