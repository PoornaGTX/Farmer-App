import React, { useState } from "react";
import { Alert, FormRow } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useAppContext } from "../context/appContext";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [mobile, setMobile] = useState(user?.mobile);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !email && !mobile) {
      displayAlert();
      return;
    }
    updateUser({ name, email, mobile });
  };
  return (
    <Wrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="name"
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormRow
            labelText="mobile"
            type="text"
            name="mobile"
            value={mobile}
            handleChange={(e) => setMobile(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please Wait..." : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
