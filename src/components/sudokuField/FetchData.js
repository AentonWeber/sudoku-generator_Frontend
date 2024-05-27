/*
import React, { useEffect, useState } from 'react';

export default function FetchData() {
    const [board, setBoard] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/generate')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data && Array.isArray(data.board)) {
                    setBoard(data.board);
                    console.log(board)
                }
            })
            .catch(err => console.error('Fetch error:', err));
    }, []);

    return board;

}





wird derzeit nicht gebraucht hebe ich mir aber sicherheits halber noch auf!!!
*/
