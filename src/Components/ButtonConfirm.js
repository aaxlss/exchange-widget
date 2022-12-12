import React from "react";

const ButtonConfirm = ({onClick, children}) => {
    return (
        <buton
            onClick={onClick}
            class="bg-primary-widget text-white p-4 rounded-md h-1/2 flex-end absolute bottom-0 left-0 "
          >
            {children}
          </buton>
    ) 
}

export {ButtonConfirm}