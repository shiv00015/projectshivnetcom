import React from "react";

function CheckRole({ name, userId, checkFilterRole }) {
  return (
    <>
      <div className="check">
        <input
          type="checkbox"
          onClick={(e) => {
            checkFilterRole(userId, e.target.checked);
          }}
        />
        <li>{name}</li>
      </div>
    </>
  );
}

export default CheckRole;