import React, { Fragment, useEffect, useState } from "react";
import  {Table} from "react-bootstrap";
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

    const handleEdit = (title, score, watched) => {
        localStorage.setItem('title', title);
        localStorage.setItem('score', score);
        localStorage.setItem('watched', watched);
    }

    const handleView = (title, score, watched) => {
        localStorage.setItem('title', title);
        localStorage.setItem('score', score);
        localStorage.setItem('watched', watched);
    }

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete the selected items?"))
        {
            setAnimeList(animeList.filter((anime) => anime.checked !== true));
            history("/");
        }
    }

    const handleCheck = (id) => {
        let newAnimeList = localStorage.getItem('animeList') ? JSON.parse(localStorage.getItem('animeList')) : animeList;
        newAnimeList.map((anime) => {
            if(anime.id === id){
                anime.checked = !anime.checked;

            }
            return animeList;
        })
        setAnimeList(newAnimeList);
    }
    
    const handleDownload = () => {
        const fileData = localStorage.getItem('animeList');
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'animeList.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
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
                                                <input className="checkbox" type="checkbox" checked={anime.checked} onChange={() => handleCheck(anime.id)}/>
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </Table>
                <br />
                
                <div className="button-container">
                    <Link to={'/add'}>
                        <button className="btn btn-primary btn-lg btn-add">Add</button>
                    </Link>
                    <button className="btn btn-primary btn-lg btn-add" onClick={() => handleDelete()}>Delete</button>
                    <button className="btn btn-primary btn-lg btn-add" onClick={() => handleDownload()}>Download</button>
                </div>
            </div>
        </Fragment>
    )
}