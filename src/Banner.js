import React, { useEffect, useState } from 'react'
import './Banner.css'
import axios from "./axios"
import requests from "./Request"

function Banner() {
    const [movie, setMovie] = useState([]);
    const [showDetails, setShowDetails] = useState(false);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
                ]
            )
            return request;
        }
        fetchData();
    }, []);

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }

    const handlePlayClick = () => {
        alert(`Playing: ${movie?.name || movie?.title}`);
    };

    const handleMoreInfoClick = () => {
        setShowDetails(!showDetails);
    };

    return (
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
            backgroundPosition: "center center",
        }}>
            <div className='banner__contents'>
                <h1 className='banner__title'>{movie?.name || movie?.title || movie?.original_name}</h1>
                <div className='banner__buttons'>
                    <button className='banner__button banner__button--play' onClick={handlePlayClick}>
                        ▶ Play
                    </button>
                    <button className='banner__button' onClick={handleMoreInfoClick}>
                        ⓘ More Info
                    </button>
                </div>
                <h1 className='banner__description'>
                    {showDetails ? movie?.overview : truncate(movie?.overview, 150)}
                </h1>
                {movie?.vote_average && (
                    <div className='banner__rating'>
                        ★ {movie.vote_average.toFixed(1)}
                    </div>
                )}
            </div>
            <div className='banner--fadeBottom'></div>
        </header>
    )
}

export default Banner