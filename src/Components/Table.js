import React from "react";

const Table = ({ children }) => {
  return (
    <div class="w-full flex">
      <table class="table-auto w-full ">{children}</table>
    </div>
  );
};

export { Table };
