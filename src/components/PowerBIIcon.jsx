import React from "react";

const PowerBIIcon = ({ className, size = 24, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    fill={color}
    viewBox="0 0 24 24"
    className={className}
  >
    <path d="M21.5 2h-19A.5.5 0 0 0 2 2.5v19a.5.5 0 0 0 .5.5h19a.5.5 0 0 0 .5-.5v-19a.5.5 0 0 0-.5-.5ZM12 18.5a.5.5 0 0 1-1 0v-9a.5.5 0 0 1 1 0Zm3 0a.5.5 0 0 1-1 0v-4a.5.5 0 0 1 1 0Zm-6 0a.5.5 0 0 1-1 0v-6a.5.5 0 0 1 1 0Z" />
  </svg>
);

export default PowerBIIcon;
