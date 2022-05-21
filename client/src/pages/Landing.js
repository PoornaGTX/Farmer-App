import React from "react";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Link } from "react-router-dom";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <div className="container page">
        <div className="info">
          <h1>
            Farmer <span>Trade</span> app
          </h1>
          <p>
            Educated during the grip of the COVID-19 pandemic, the class of 2021
            concludes an unusual academic experience only to face an unsteady
            global economy. Ng’s book sets out to help these job seekers—a group
            that’s often clueless even in the best of times—get started on the
            right foot.
          </p>
          <Link to="/register">
            <button className="btn btn-hero">login/register</button>
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
