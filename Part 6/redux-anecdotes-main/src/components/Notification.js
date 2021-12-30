import React from "react";
import { connect } from "react-redux";

const Notification = (props) => {
  const notifications = props.notifications;
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return (
    <div>
      {notifications !== null ? <div style={style}>{notifications}</div> : null}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications,
  };
};

const ConnectedNotifications = connect(mapStateToProps)(Notification);

export default ConnectedNotifications;
