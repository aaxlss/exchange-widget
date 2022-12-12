import React from "react";

const Input = ({ children, value, onChange }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      class="border-2 w-auto border-neutral-widget rounded-md px-2 py-1 h-1/2"
    >
      {children}
    </input>
  );
};

export { Input };
