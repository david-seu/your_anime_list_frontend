import React, { Fragment, useEffect, useState } from "react";
import {Button, Table} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from "react-router-dom";
import Anime from "../data/Anime.js";

export default function Home(){

    let history = useNavigate();

    const [animeList, setAnimeList] = useState([]);

    useEffect(() => {
        animeList.length > 0 && localStorage.setItem('animeList', JSON.stringify(animeList));
    }, [animeList]);

    useEffect(() => {
        const animeList = JSON.parse(localStorage.getItem('animeList'));
        if(animeList){
            setAnimeList(animeList);
        }
        else{
            setAnimeList(Anime);
        }
      }, []);

    const handleDelete = (index) => {
        if(window.confirm("Are you sure you want to delete this?"))
        {
        setAnimeList(animeList.filter((_, i) => i !== index));    
        history("/");
        }
    }

    const handleEdit = (id, title, score, watched) => {
        localStorage.setItem('title', title);
        localStorage.setItem('score', score);
        localStorage.setItem('watched', watched);
    }

    const handleView = (title, score, watched) => {
        localStorage.setItem('title', title);
        localStorage.setItem('score', score);
        localStorage.setItem('watched', watched);
    }
    

    return(
        <Fragment>
            <div className="home--container">
                <h1>Your Anime List</h1>
                <br />
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>
                                Title
                            </th>
                            <th>
                                Watched
                            </th>
                            <th>
                                Score
                            </th>
                            <th>
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                                animeList.map((anime, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>
                                                {anime.title}
                                            </td>
                                            <td>
                                                {anime.watched ? "Yes" : "No"}
                                            </td>
                                            <td>
                                                {anime.score > 0 ? anime.score : "N/A"}
                                            </td>
                                            <td key={index}>
                                                <Link to={`/edit/${anime.id}` }>
                                                <button className="btn btn-primary" onClick={() => handleEdit(anime.id, anime.title, anime.score, anime.watched)}>Edit</button>
                                                </Link>
                                                &nbsp;
                                                <Link to={`/view/${anime.id}`}>
                                                    <button className="btn btn-primary" onClick={() => handleView(anime.title, anime.score, anime.watched)}>View</button>
                                                </Link>
                                                &nbsp;
                                                <button className="btn btn-primary" onClick={() => handleDelete(index)}>DELETE</button>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </Table>
                <br />
                <Link to={'/add'}>
                    <Button className="btn btn-lg btn-add">Add</Button>
                </Link>
            </div>
        </Fragment>
    )
}

