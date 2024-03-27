import React from "react";
import {Form, Button} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate} from "react-router-dom";

export default function Add(){

    const[title, setTitle] = React.useState("");
    const[score, setScore] = React.useState("");
    const[watched, setWatched] = React.useState(false);

    let history = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = Date.now();
        
        let newAnime = {
            id: id,
            title: title,
            watched: watched ? "true" : "false",
            score: score
        }

        localStorage.setItem("anime", JSON.stringify(newAnime));
        const animeList = JSON.parse(localStorage.getItem('animeList'));
        let newAnimeList = animeList.concat(newAnime);
        localStorage.setItem("animeList", JSON.stringify(newAnimeList));
        
        history("/");
    }

    return(
        <div className="add--container">
            <Form className="gap-2">
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="Enter title" required onChange={(e) => setTitle(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formAge">
                    <Form.Label>Score</Form.Label>
                    <Form.Control type="number" placeholder="Enter score" required onChange={(e) => setScore(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formWatched">
                    <Form.Check type="checkbox" label="Watched" required onChange={(e) => setWatched(e.target.value)}/>
                </Form.Group>
                <Button onClick={(e) => handleSubmit(e)} type="submit">
                    Submit
                </Button>
            </Form>
        </div>
    )
}