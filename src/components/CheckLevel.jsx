import React from "react";

function CheckLevel({ name, userId, checkFilterLevel }) {
  return (
    <>
      <div className="check">
        <input
          type="checkbox"
          onClick={(e) => {
            checkFilterLevel(userId, e.target.checked);
          }}
        />
        <li>{name}</li>
      </div>
    </>
  );
}

export default CheckLevel;