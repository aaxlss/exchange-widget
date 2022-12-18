import React from "react";

const ButtonConfirm = ({onClick, children}) => {
    return (
        <buton
            onClick={onClick}
            class="bg-primary-widget text-white p-4 rounded-md h-1/2 flex align-middle items-center"
          >
            {children}
          </buton>
    ) 
}

export {ButtonConfirm}