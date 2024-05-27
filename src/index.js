import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import Header from "../src/components/header/Header.js";
import SomeSudokus from "../src/components/someSudokus/SomeSudokus.js";
import 'bulma/css/bulma.min.css';
import "../src/components/sudokuField/styleField.css";


function Page() {



    return (
        <div>
            <Header />
            <SomeSudokus />

        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Page/>);
