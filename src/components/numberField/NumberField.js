import React from "react"

function NumberField({setHighlightNumber, number, setNumber, styleName}) {
    function numberTake() {
        setHighlightNumber(number);
        setNumber(number);
    }
    return (
        <button className={`button mr-1 ${styleName}`}
                onClick={(e) =>
                    numberTake(e)}>
            {number}
        </button>
    );
}

export default function UseAbleNumbers({setNumber}) {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [highlightNumber, setHighlightNumber] = React.useState(0);

    function deleteNumber() {
        const buttonValue = null;
        setHighlightNumber(0)
        setNumber(buttonValue);
    }
    return (
        <div className={"flex-container has-text-centered mt-6"}>
            <div className={"flex-row"}>
                {numbers.map(number => {
                    let styleName = '';
                    if (number === highlightNumber) {
                        styleName = "is-warning";
                    }
                    return (
                        <NumberField
                            styleName={styleName}
                            setHighlightNumber={setHighlightNumber}
                            key={number}
                            number={number}
                            setNumber={setNumber}
                        />
                    );
                })}

                <button className={`button mr-1 is-large ${highlightNumber === 0 ? 'is-warning' : ''}`}
                        onClick={deleteNumber}>
                    <span className="material-symbols-outlined">
                        ink_eraser
                    </span>
                </button>
            </div>
        </div>
    );
}
