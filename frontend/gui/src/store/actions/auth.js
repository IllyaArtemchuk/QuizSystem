import * as actionsTypes from "./actionTypes";
import axios from "axios";
import history from "../../history";

export const authStart = () => {
  return {
    type: actionsTypes.AUTH_START
  };
};

export const authSuccess = token => {
  return {
    type: actionsTypes.AUTH_SUCCESS,
    token: token
  };
};

export const authFail = error => {
  return {
    type: actionsTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  return {
    type: actionsTypes.AUTH_LOGOUT
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authLogin = (username, password) => {
  return dispatch => {
    console.log(username, password);
    dispatch(authStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .post("http://localhost:8000/api/v1/rest-auth/login/", {
        username: username,
        email: "",
        password: password
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        history.push("/home");
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authSignup = (username, email, password1, password2, role) => {
  return dispatch => {
    dispatch(authStart());
    axios.defaults.headers = {
      "Content-Type": "application/json"
    };
    axios
      .post("http://localhost:8000/api/v1/rest-auth/registration/", {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
        role: role
      })
      .then(res => {
        const token = res.data.key;
        const expirationDate = new Date(new Date().getTime() + 3600 * 1000);
        localStorage.setItem("token", token);
        localStorage.setItem("expirationDate", expirationDate);
        dispatch(authSuccess(token));
        dispatch(checkAuthTimeout(3600));
        history.push("/home");
      })
      .catch(err => {
        dispatch(authFail(err));
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (token === undefined) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        dispatch(authSuccess(token));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
