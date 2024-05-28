import React, {useEffect, useState} from "react";
import SudokuBoard from "../sudokuField/SudokuBoard.js";
import IndexButton from "./indexButtons";
import "./index_style.css"
import NumberField from "../numberField/NumberField";

export default function IndexField() {
    const [showSudokuBoard, setShowSudokuBoard] = useState(false);
    const [showGeneratedSudokuBoard, setShowGeneratedSudokuBoard] = useState(false);
    const [idList, setIdList] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const [useNumber, setUseNumber] = useState(null);
    const [backToIndexFlag, setBackToIndexFlag] = useState(false);

    const handleButtonClick = (id) => {
        setCurrentId(id);
        setShowSudokuBoard(true);
    };
    const generateSudoku = () => {
        setShowGeneratedSudokuBoard(true);
    }
    const backToIndex = () => {
        setShowGeneratedSudokuBoard(false);
        setShowSudokuBoard(false);
        setBackToIndexFlag(!backToIndexFlag);
    }

    useEffect(() => {
        fetch("http://localhost:8080/idList")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data)) {
                    setIdList(data);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    }, [backToIndexFlag]);

    return (
        <> {(!showSudokuBoard && !showGeneratedSudokuBoard) &&
            <div>
                <div className={"is-flex is-justify-content-center mb-6"}>
                    <button className="button is-primary is-medium" id={"createButton"} onClick={generateSudoku}>Create
                        Sudoku
                    </button>
                </div>
                <div className="container custom-container">
                    <div className="columns is-multiline is-centered">
                        {idList.map((id, index) => (
                            <div className="column is-centered is-flex is-justify-content-center" key={index}>
                                <IndexButton value={index + 1} onClick={() => handleButtonClick(id)}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        }
            <div>
                {showSudokuBoard &&
                    (<SudokuBoard
                        userNumber={useNumber}
                        url={`http://localhost:8080/take?id=${currentId}`}/>)
                }
                {showSudokuBoard && (
                    <>
                        <NumberField setNumber={setUseNumber}/>
                        <div className={"is-flex is-justify-content-center mt-6"}>
                            <button className="button" id="createButton" onClick={backToIndex}>Back</button>
                        </div>
                    </>
                )}
            </div>
            <div>
                {showGeneratedSudokuBoard &&
                    (<SudokuBoard
                        userNumber={useNumber}
                        url={`http://localhost:8080/generate`}/>)
                }
                {showGeneratedSudokuBoard && (
                    <>
                        <NumberField setNumber={setUseNumber}/>
                        <div className={"is-flex is-justify-content-center mt-6"}>
                            <button className="button" id="createButton" onClick={backToIndex}>Back</button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
