import React, {useEffect, useState} from "react";
import "./styleField.css";
import {MyButton} from "./MyButton";
import Confetti from "react-confetti";

export default function SudokuFlexbox({userNumber, url}) {
    const initialGrid = Array(9).fill(null).map(() => Array(9).fill({value: null, isInitial: false}));
    const [loaded, setLoaded] = useState(false);
    const [board, setBoard] = useState(initialGrid);
    const [winMessage, setWinMessage] = useState(false);
    const [loseMessage, setLoseMessage] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    useEffect(() => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data.board)) {
                    setBoard(data.board.map(row => {
                        return row.map(entry => {
                            return entry !== 0 ? {value: entry, isInitial: true} : {value: null, isInitial: false}
                        });
                    }));
                    setLoaded(true);
                }
            })
            .catch(err => console.error('Fetch error:', err));
    }, [url]);

    const sendBoardToBackend = async (board) => {
        const boardArray = board.map(row => row.map(cell => cell.value !== null ? cell.value : 0));
        const boardDTO = {"board": boardArray, "id": null};
        console.log(JSON.stringify(boardDTO));

        try {
            const response = await fetch("http://localhost:8080/check", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(boardDTO)
            });
            const result = await response.json();
            if (result.correct) {
                setModalMessage("Das Sudoku ist korrekt gelöst!");
                setWinMessage(true);

            } else {
                setModalMessage("Das Sudoku ist nicht korrekt gelöst.");
                setLoseMessage(true);

            }

        } catch (error) {
            console.error("Error checking board:", error);
        }
    };

    const closeModal = () => {
        setWinMessage(false);
        setLoseMessage(false);
    };

    const handleClick = (rowIndex, colIndex) => {
        const tmpBoard = [...board];
        tmpBoard[rowIndex][colIndex].value = userNumber;
        setBoard(tmpBoard);
        if (!checkBoardFinish(tmpBoard)) {
            sendBoardToBackend(tmpBoard);
        }
    };

    return (
        loaded ? (
            <div className="container has-text-centered is-flex is-flex-direction-column is-align-items-center">
                {board.map((row, rowIndex) => (
                    <div className="columns is-flex is-flex-direction-row" key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            board[rowIndex][colIndex].isInitial ? (
                                <MyButton key={colIndex}
                                          value={board[rowIndex][colIndex].value}
                                          isInitial={true}
                                          rowIndex={rowIndex}
                                          colIndex={colIndex}
                                />
                            ) : <MyButton
                                key={colIndex}
                                value={board[rowIndex][colIndex].value}
                                rowIndex={rowIndex}
                                colIndex={colIndex}
                                handleClick={() => handleClick(rowIndex, colIndex)}
                            />
                        ))}
                    </div>
                ))}
                {winMessage && (
                    <div className={`modal ${winMessage ? 'is-active' : ''}`}>
                        <div className="modal-background" onClick={closeModal}></div>
                        <div className="modal-content">
                            <div className="box custom-modal-box is-flex is-flex-direction-column box"
                                 id="custom-modal-box">
                                <img
                                    src="https://media.tenor.com/GNiThyoqaXAAAAAi/%E3%81%8A%E3%82%81%E3%81%A7%E3%81%A8%E3%81%86-%E5%AC%89%E3%81%97%E3%81%84.gif"
                                    alt="Gratulation"
                                />
                                <p className={"has-text-weight-bold is-size-1 "}>{modalMessage}</p>
                                <ConfettiComponent/>


                            </div>

                        </div>
                        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                    </div>
                )}


                {loseMessage && (
                    <div className={`modal ${loseMessage ? 'is-active' : ''}`}>
                        <div className="modal-background" onClick={closeModal}></div>
                        <div className="modal-content">
                            <div className="box custom-modal-box is-flex is-flex-direction-column box"
                                 id="custom-modal-box">
                                <p className={"has-text-weight-bold is-size-1 "}>{modalMessage}</p>
                                <img
                                    src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExcXJzeHdpdDNyY2t1cTViaDMyOTUzMjFoeXVqaGhydjM5azlwOXR2dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/10h8CdMQUWoZ8Y/giphy.gif"
                                    alt="looser"
                                />
                            </div>

                        </div>
                        <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                    </div>
                )}


            </div>
        ) : (
            <p>Loading...</p>
        )
    );
}

const ConfettiComponent = () => {
    return (
        <Confetti
            width={window.innerWidth * 0.36}
            height={window.innerHeight * 0.75}
        />
    );
}


function checkBoardFinish(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j].value == null) {
                return true;
            }
        }
    }
    return false;
}
