import React from "react";

export default function Popup({ title = Text, text = Text }) {
  return (
    <div className="popup">
      <h3 className="title">{title}</h3>
      <p className="text">{text}</p>
    </div>
  );
}
