import React from "react";

const Input = ({ children, value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      class="border-2 border-gray rounded px-2 py-1"
    >
      {children}
    </input>
  );
};

export { Input };
