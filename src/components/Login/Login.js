import React, { useEffect, useReducer, useState } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const validationOFEmail = (state, action) => {
  if (action.type === "INPUT_EMAIL") {
    return {
      emailValue: action.val,
      isValid: action.val.includes("@"),
    };
  }
  if (action.type === "INPUT_EMAIL_BLUR") {
    return {
      emailValue: state.emailValue,
      isValid: state.emailValue.includes("@"),
    };
  }
  return state;
};

const initialState = {
  emailValue: "",
  isValid: undefined,
};

const validationOfPassword = (state, action) => {
  console.log(state, "state");
  console.log(action, "action");
  if (action.type === "INPUT_PASSWORD") {
    return {
      passwordValue: action.val,
      isPasswordValue: action.val.trim().length > 6,
    };
  }
  if (action.type === "INPUT_PASSWORD_BLUR") {
    return {
      passwordValue: state.passwordValue,
      isPasswordValue: state.passwordValue.trim().length > 6,
    };
  }
  return state;
};

const initialPasswordState = {
  passwordValue: "",
  isPasswordValue: undefined,
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();

  const [emailState, dispatchEmail] = useReducer(validationOFEmail, initialState);
  const [passwordState, dispatchPassword] = useReducer(
    validationOfPassword,
    initialPasswordState
  );

  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isPasswordValue: isPwdValue } = passwordState;

  useEffect(() => {
    // useEffect hook
    const timer = setTimeout(() => {
      setFormIsValid(
        !emailState.emailValue.includes("@") &&
          passwordState.passwordValue.trim().length > 6 // user жазган email де @ белгиси жок болсо  false  болот && password узундугу 6 дан чон болсо
      );
      setFormIsValid(passwordState.passwordValue);
    }, 1500); //

    return () => {
      clearTimeout(timer);
    };
  }, [emailIsValid, isPwdValue]); //

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "INPUT_EMAIL", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "INPUT_PASSWORD", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_EMAIL_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_PASSWORD_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    // props.onLogin(emailState.emailValue, passwordState.passwordValue);
    props.onLogin(emailState.emailValue, passwordState.passwordValue);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.emailValue === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email" className={classes.title}>
            E-Mail
          </label>
          <input
            type="email"
            id="email"
            value={emailState.emailValue}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.passwordValue === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.passwordValue}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
