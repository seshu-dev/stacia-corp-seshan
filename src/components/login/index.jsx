import React from "react";
import styles from "./login.module.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { emailId, gender, name, role } from "../../base/reducer/loginReducer";
import{ users }from '../../utils/utils'


function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loginReducer = useSelector((state) => state.loginReducer);
  console.log(loginReducer, "loginReducer")

  const [loginInfo, setLoginInfo] = useState({ email: "", password: "", emailValidate: false, emailMandatory: false, passwordMandatory: false, fieldMandatory: false, invalidError: false });
  const getLoginInfo = (e) => {
    if (e.target.name == "email") {
      if (e.target.value) {
        setLoginInfo({ ...loginInfo, email: e.target.value, emailValidate: false, emailMandatory: false, invalidError: false });
      } else {
        setLoginInfo({ ...loginInfo, email: e.target.value, emailMandatory: true, emailValidate: false, invalidError: false });
      }

    } else {
      if (e.target.value) {
        setLoginInfo({ ...loginInfo, password: e.target.value, passwordMandatory: false, invalidError: false });
      } else {
        setLoginInfo({ ...loginInfo, password: e.target.value, passwordMandatory: true, invalidError: false });
      }

    }
  };
  const doValidateEmail = () => {
    if (loginInfo.email) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginInfo.email)) {
        setLoginInfo({ ...loginInfo, emailValidate: false });
      } else {
        setLoginInfo({ ...loginInfo, emailValidate: true });
      }
    } else {
      setLoginInfo({ ...loginInfo, emailMandatory: true });
    }
  };
  const doPasswordcheck = () => {
    if (!loginInfo.password) {
      setLoginInfo({ ...loginInfo, passwordMandatory: true });
    }
  }
  const doLogin = async () => {
    if (!loginInfo.emailValidate && !loginInfo.emailMandatory && !loginInfo.passwordMandatory) {
      let user = await users.filter((userValue) => {
        return loginInfo.email == userValue.email;
      });
      if (user.length == 1) {
        console.log(user[0], "userValue");
        dispatch(emailId(user[0].email))
        dispatch(gender(user[0].gender))
        dispatch(role(user[0].role))
        dispatch(name(user[0].name))
        sessionStorage.setItem("emailId", user[0].email);
        sessionStorage.setItem("name", user[0].name);
        sessionStorage.setItem("role", user[0].role);

        navigate('/movie');

      } else {
        setLoginInfo({ ...loginInfo, invalidError: true });
      }
    } else {
      setLoginInfo({ ...loginInfo, fieldMandatory: true });
    }

  }
  console.log(loginInfo, "loginInfo");
  return (
    <div className={styles.loginModal}>
      <div className={styles.loginTop}>
        <div className={styles.logoName}>FLIX MOVIES</div>
        <h2 className={styles.title}>LOGIN</h2>
        <div className={styles.insideEmail}>
          <span className={styles.emailName}>Email Id: </span>{" "}
          <input
            className={styles.inputBox}
            type="text"
            autoComplete="off"
            name="email"
            onChange={getLoginInfo}
            onBlur={doValidateEmail}
            value={loginInfo.email}
          />
        </div>
        {loginInfo.emailValidate && <span className={styles.emailValidationErrorMessage} >Kindly enter the valid email address</span>}
        {loginInfo.emailMandatory && <span className={styles.emailValidationErrorMessage} >Kindly enter the  email address</span>}
        <div className={styles.insidePass}>
          <span className={styles.pass}>Password: </span>{" "}
          <input
            className={styles.password}
            type="password"
            autoComplete="off"
            onChange={getLoginInfo}
            onBlur={doPasswordcheck}
            value={loginInfo.password}
          />
        </div>
        {loginInfo.passwordMandatory && <span className={styles.emailValidationErrorMessage} >Kindly enter the Password</span>}
        {loginInfo.invalidError && <span className={styles.emailValidationErrorMessage} >Invalid User</span>}
        <div className={styles.buttonTop}>
          <button className={styles.loginButton} onClick={doLogin} >LOGIN</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
