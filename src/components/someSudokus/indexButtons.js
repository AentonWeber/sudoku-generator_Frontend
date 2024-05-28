import React from "react";

export default function IndexButtons({value, onClick}) {
    return (
        <button
            onClick={onClick}
            className={"button is-large"}
            value={value}>
            {value}
        </button>
    );
}