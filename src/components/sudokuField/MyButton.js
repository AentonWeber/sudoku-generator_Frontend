import React from "react";

export function MyButton({value, rowIndex, colIndex, handleClick, isInitial}) {
    const buttonStyle = {
        borderRadius: 0,

    };

    const getClassName = () => {
        let classNames = 'button';
        if (value == null) {
            classNames += ' empty';
        }
        if(value != null && !isInitial) {
           classNames += ' is-info';
        }
        if (rowIndex % 3 === 0) {
            classNames += ' top-border';
        }
        if (rowIndex % 3 === 2) {
            classNames += ' bottom-border';
        }
        if (colIndex % 3 === 0) {
            classNames += ' left-border';
        }
        if (colIndex % 3 === 2) {
            classNames += ' right-border';
        }
        return classNames;
    };

    return (
        <button
            className={getClassName()}
            style={buttonStyle}
            onClick={handleClick}
        >
            {value}
        </button>
    );
}