import React, { Component } from "react";
import classes from "./layout.module.css";

import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import Footer from "../footer/footer";

class layout extends Component {
  state = { showSidebar: false };

  sidebarClosedHandler = () => {
    this.setState({ showSidebar: false });
  };

  toggleSidebarHandler = () => {
    this.setState((prevState) => {
      return { showSidebar: !prevState.showSidebar };
    });
  };

  render() {
    return (
      <div className={classes.content}>
        <Navbar toggleSidebar={this.toggleSidebarHandler}/>
        <Sidebar open={this.state.showSidebar} closed={this.sidebarClosedHandler}/>
        <div className={classes.mainContent}>{this.props.children}</div>
        <Footer/>
      </div>
    );
  }
}

export default layout;
