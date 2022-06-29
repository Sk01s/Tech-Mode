import React from "react";
import MaterialIconsReact from "material-icons-react";
export default function Promises() {
  return (
    <div className="promises-container grid gap-2 ">
      <div className="promise-card flex align-ce gap-3">
        <MaterialIconsReact icon="local_shipping" />
        <h3>Curb-side pickup</h3>
      </div>
      <div className="promise-card flex align-ce gap-3">
        <MaterialIconsReact icon="inventory_2" />
        <h3>Free shipping on orders over $50</h3>
      </div>
      <div className="promise-card flex align-ce gap-3">
        <MaterialIconsReact icon="payments" />
        <h3>compatitive prices guaranteed</h3>
      </div>
      <div className="promise-card flex align-ce gap-3">
        <MaterialIconsReact icon="schedule" />
        <h3>Available to you 24/7</h3>
      </div>
    </div>
  );
}
