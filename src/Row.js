import React, { useEffect, useState } from 'react'
import './Row.css'
import axios from "./axios"
import LoadingSpinner from './LoadingSpinner'
import MovieModal from './MovieModal'

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                setError(null);
                const request = await axios.get(fetchUrl);
                setMovies(request.data.results);
            } catch (err) {
                setError('Failed to load movies. Please try again later.');
                console.error('Error fetching movies:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [fetchUrl])

    const handleMovieClick = (movie) => {
        setSelectedMovie(movie);
    };

    const closeModal = () => {
        setSelectedMovie(null);
    };

    if (loading) return <LoadingSpinner />;
    
    if (error) {
        return (
            <div className='row'>
                <h2 className='lol'>{title}</h2>
                <div className='error-message'>{error}</div>
            </div>
        );
    }

    return (
        <div className='row'>
            <h2 className='lol'>{title}</h2>
            <div className='row__posters'>
                {movies.map((movie) => ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                    <img 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`} 
                        key={movie?.id} 
                        src={`${base_url}${isLargeRow ? movie?.poster_path : movie.backdrop_path}`} 
                        alt={movie.name || movie.title} 
                        loading="lazy"
                        onClick={() => handleMovieClick(movie)}
                    />)
                )}
            </div>
            {selectedMovie && (
                <MovieModal movie={selectedMovie} onClose={closeModal} />
            )}
        </div>
    )
}

export default Row