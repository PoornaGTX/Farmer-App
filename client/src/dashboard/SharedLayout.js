import React from "react";
import { Link, Outlet } from "react-router-dom";
import Wrapper from "../assets/wrappers/SharedLayout";
import { NavBar, SmallSidebar, BigSideBar } from "../components/index";
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSideBar />
        <div>
          <NavBar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
      {/* <nav>
        <Link to="all-jobs">all-jobs</Link>
        <Link to="add-job">add-job</Link>
      </nav>
      <Outlet /> */}
    </Wrapper>
  );
};

export default SharedLayout;
