import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Notification from "./components/Notification";
import Layout from "./components/Layout";
import { uiActions } from "./store/ui-slice";
let isFirstRender = true;
function App() {
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => {
    return state.auth.isLoggedIn;
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    const sendRequest = async () => {
      //send state as sending request
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request",
          type: "warning",
        })
      );
      const res = await fetch(
        "dummy.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      //send state as request is successfull
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent Request to Database Successfully",
          type: "success",
        })
      );
    };
    sendRequest().catch((err) => {
      //send State as Error
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    });
  }, [cart]);

  return (
    <div className="App">
      {notification && (
        <Notification type={notification.type} message={notification.message} />
      )}
      {!isLoggedIn && <Auth />}

      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
