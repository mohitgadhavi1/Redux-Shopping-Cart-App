import React from "react";
import { Alert } from "@mui/material";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

function Notification({ type, message }) {
  const notification = useSelector((state) => state.ui.notification);
  const dispatch = useDispatch();
  const closeHandler = () => {
    dispatch(uiActions.showNotification({
        open:false,
    }));
  };

  return (
    <div>
      {notification.open && (
        <Alert onClose={closeHandler} severity={type}>
          {message}
        </Alert>
      )}
    </div>
  );
}

export default Notification;
