import React, {useState} from "react";

export default function Header() {
    const [helpMessage, setHelpMessage] = useState(false);

    const closeModal = () => {
        setHelpMessage(false);
    };

    const openModal = () => {
        setHelpMessage(true);
    };

    return (
        <>
            <header className="header-container">
                <h1 className="title is-1 has-text-centered mb-4 mt-3">Sudoku</h1>
                <div className="is-flex is-justify-content-flex-end">
                    <button className="button mr-6 is-rounded" onClick={openModal}>
                        <span className="material-symbols-outlined">
                            question_exchange
                        </span>
                    </button>
                </div>
            </header>

            {helpMessage && (
                <div className={`modal ${helpMessage ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={closeModal}></div>
                    <div className="modal-content">
                        <div className="box custom-modal-box" id="custom-modal-box">
                            <p className="has-text-weight-bold is-size-3">Sudoku Grundlagen</p>
                            <p className="is-size-6 has-text-left">
                                Sudoku ist ein Logikrätsel, das auf einem 9x9 Gitter basiert. Das Hauptziel ist es,
                                die leeren Felder so zu füllen, dass in jeder Zeile, in jeder Spalte und in jedem
                                der neun 3x3-Unterquadrate jede Zahl von 1 bis 9 genau einmal vorkommt.
                            </p>
                            <p className="is-size-6 has-text-left">
                                <strong>Regeln:</strong>
                                <ul>
                                    <li>Jede Zahl von 1 bis 9 muss genau einmal in jeder Zeile vorkommen.</li>
                                    <li>Jede Zahl von 1 bis 9 muss genau einmal in jeder Spalte vorkommen.</li>
                                    <li>Jede Zahl von 1 bis 9 muss genau einmal in jedem 3x3-Unterquadrat vorkommen.
                                    </li>
                                </ul>
                            </p>
                            <p className="is-size-6 has-text-left">
                                Du kannst eine Zahl unten auswählen und durch Klick auf die orangenen Felder eingeben.
                                Es ist nur möglich, blaue Felder zu löschen oder zu überschreiben
                            </p>
                        </div>
                    </div>
                    <button className="modal-close is-large" aria-label="close" onClick={closeModal}></button>
                </div>
            )}
        </>
    );
}
