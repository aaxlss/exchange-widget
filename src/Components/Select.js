import React from "react";

const Select = ({children, onChange}) => {
    return (
        <select onChange={onChange} class="h-1/2 w-auto border-2 border-neutral-widget rounded-md px-2 py-1">
            {children}
        </select>
    );
}

export {Select}