import React, {useState, useEffect} from "react";
import {Button, Form} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Anime from "../data/Anime.js";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router-dom";

export default function Edit(){
    const [title, setTitle] = useState("");
    const [score, setScore] = useState("");
    const [watched, setWatched] = useState(false);

    let {id} = useParams();
    id = parseInt(id);

    let history = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const animeList = JSON.parse(localStorage.getItem('animeList'));


        let newAnime = {
            id: id,
            title: title,
            watched: watched,
            score: score
        }
        
        const index = animeList.findIndex((anime) => anime.id === id);
        animeList[index] = newAnime;

        localStorage.setItem("animeList", JSON.stringify(animeList));

        history("/");
    }


    useEffect(() => {
        setTitle(localStorage.getItem('title'));
        setScore(localStorage.getItem('score'));
        setWatched(localStorage.getItem('watched'));
    }, []
    )

    return(
        <div className="edit--container">
            <Form>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" value={title} required onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSore">
                    <Form.Label className="">Score</Form.Label>
                    <Form.Control type="number" value={score} required onChange={(e) => setScore(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formWatched">
                    <Form.Check type="checkbox" label="Watched" value={watched} required onChange={(e) => setWatched(e.target.value)}/>
                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">
                    Update
                </Button>
            </Form>
        </div>
    )
}