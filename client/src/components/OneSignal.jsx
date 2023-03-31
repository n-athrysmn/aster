import React, { useEffect } from "react";

function OneSignalComponent() {
  useEffect(() => {
    const OneSignal = window.OneSignal || [];
    OneSignal.push(() => {
      OneSignal.on("notificationDisplay", (event) => {
        console.log("OneSignal notification displayed:", event);
      });
    });
  }, []);

  return <div></div>;
}

export default OneSignalComponent;
