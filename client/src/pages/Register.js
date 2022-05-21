import React, { useState, useEffect } from "react";
import Logo from "../components/Logo";
import Wrapper from "../assets/wrappers/RegisterPage";
import FormRow from "../components/FormRow";
import Alert from "../components/Alert";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";
//global context and useNavigate later

const initialState = {
  name: "",
  email: "",
  password: "",
  type: "Farmer",
  mobile: "",
  isMember: false,
  showAlert: false,
};

// if possible prefer local state
// global state
const Register = () => {
  const [values, setValues] = useState(initialState);
  const { isLoading, showAlert, displayAlert, registerUser, user, loginUser } =
    useAppContext();
  const navigator = useNavigate();
  //handle from input values
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    // e.preventDefault();
    // const { name, email, password, type, mobile, isMember } = values;
    // if (values.isMember) {
    //   if (!password || !email) {
    //     displayAlert();
    //     return;
    //   } else {
    //     const currentUser = { email, password };
    //     loginUser(currentUser);
    //   }
    // } else {
    //   if (!name || !email || !password || !type || !mobile) {
    //     displayAlert();
    //     return;
    //   } else {
    //     const currentUser = { name, email, password, type, mobile };
    //     registerUser(currentUser);
    //   }
    // }
    e.preventDefault();
    const { name, email, password, type, mobile, isMember } = values;
    if (!email || !password || (!isMember && !name && type && mobile)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password, type, mobile };
    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
    console.log(values);
  };
  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigator("/");
        
      }, 3000);
    }
  }, [user, navigator]);
  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <>
      <Wrapper className="full-page">
        <form className="form" onSubmit={onSubmit}>
          <Logo />
          <h3>{values.isMember ? "Login" : "Register"}</h3>
          {showAlert && <Alert />}

          {!values.isMember && (
            <>
              <FormRow
                type="text"
                name="name"
                value={values.name}
                handleChange={handleChange}
              />
              <FormRow
                type="text"
                name="mobile"
                value={values.mobile}
                handleChange={handleChange}
              />
              <div className="form-row">
                <label htmlFor="type" className="form-label">
                  Type
                </label>
                <select
                  name="type"
                  value={values.type}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="Farmer">Farmer</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
            </>
          )}
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block">
            submit
          </button>
          <p>
            {values.isMember ? "Not a member yet?" : "Already a member?"}

            <button type="button" onClick={toggleMember} className="member-btn">
              {values.isMember ? "Register" : "Login"}
            </button>
          </p>
        </form>
      </Wrapper>
    </>
  );
};

export default Register;
