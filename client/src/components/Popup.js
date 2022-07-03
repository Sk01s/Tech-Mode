import React, { useEffect, useState } from "react";

export default function Popup({ title = Text, text = Text }) {
  const [notification, setNotification] = useState();
  const timing = 3000;
  useEffect(() => {
    setNotification(
      <div
        className="popup"
        style={{
          animation: `poping ${timing}ms`,
        }}
      >
        <h3 className="title">{title}</h3>
        <p className="text">{text}</p>
      </div>
    );

    setTimeout(() => setNotification(<></>), timing);
  }, []);

  return notification;
}
