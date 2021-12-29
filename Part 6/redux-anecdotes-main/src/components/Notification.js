import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Notification = () => {
  const notifications = useSelector((state) => state.notifications);
  /*   const [visible, setvisible] = useState(false); */

  /*   useEffect(() => {
    setvisible(true);
    setTimeout(() => setvisible(false), 5000);
  }, [notifications]); */
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

export default Notification;
