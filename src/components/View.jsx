import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function View(){

    const [title, setTitle] = useState("");
    const [score, setScore] = useState("");
    const [watched, setWatched] = useState(false);
    
    useEffect(() => {
        setTitle(localStorage.getItem('title'));
        setScore(localStorage.getItem('score'));
        setWatched(localStorage.getItem('watched'));
    }, []
    )

    return(
        <div className="view--container">
            <h1>{title}</h1>
            <p>Watched: {watched === "true" ? "Yes" : "No"}</p>
            <p>Score: {score < 0 ? "N/A" : score}</p>
        </div>
    )
}