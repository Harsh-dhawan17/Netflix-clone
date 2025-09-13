import React, { useState, useEffect } from 'react';
import './MovieModal.css';
import axios from './axios';

function MovieModal({ movie, onClose }) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (movie) {
            fetchMovieDetails();
        }
    }, [movie]);

    const fetchMovieDetails = async () => {
        try {
            setLoading(true);
            const API_KEY = process.env.REACT_APP_TMDB_API_KEY || "62099b1ebc2c330a49801d478a2d83f7";
            const response = await axios.get(`/movie/${movie.id}?api_key=${API_KEY}&append_to_response=videos,credits`);
            setMovieDetails(response.data);
        } catch (error) {
            console.error('Error fetching movie details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBackdropClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            onClose();
        }
    };

    if (!movie) return null;

    const baseImageUrl = "https://image.tmdb.org/t/p/original/";
    const backdropUrl = movie.backdrop_path ? `${baseImageUrl}${movie.backdrop_path}` : null;
    const posterUrl = movie.poster_path ? `${baseImageUrl}${movie.poster_path}` : null;

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="movie-modal">
                <button className="modal-close" onClick={onClose}>×</button>
                
                {loading ? (
                    <div className="modal-loading">Loading movie details...</div>
                ) : (
                    <>
                        <div className="modal-header" style={{
                            backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
                            backgroundColor: backdropUrl ? 'transparent' : '#222'
                        }}>
                            <div className="modal-header-content">
                                <h1>{movie.title || movie.name}</h1>
                                <div className="modal-meta">
                                    <span className="rating">★ {movie.vote_average?.toFixed(1)}</span>
                                    <span className="year">
                                        {movie.release_date ? new Date(movie.release_date).getFullYear() : 
                                         movie.first_air_date ? new Date(movie.first_air_date).getFullYear() : 'N/A'}
                                    </span>
                                    {movieDetails?.runtime && <span>{movieDetails.runtime} min</span>}
                                </div>
                                <div className="modal-buttons">
                                    <button className="play-btn">▶ Play</button>
                                    <button className="list-btn">+ My List</button>
                                </div>
                            </div>
                        </div>

                        <div className="modal-body">
                            <div className="modal-content">
                                <div className="modal-main">
                                    <p className="modal-overview">{movie.overview}</p>
                                    
                                    {movieDetails?.genres && (
                                        <div className="modal-info">
                                            <strong>Genres:</strong> {movieDetails.genres.map(g => g.name).join(', ')}
                                        </div>
                                    )}
                                    
                                    {movieDetails?.credits?.cast && (
                                        <div className="modal-info">
                                            <strong>Cast:</strong> {movieDetails.credits.cast.slice(0, 5).map(actor => actor.name).join(', ')}
                                        </div>
                                    )}
                                </div>
                                
                                {posterUrl && (
                                    <div className="modal-poster">
                                        <img src={posterUrl} alt={movie.title || movie.name} />
                                    </div>
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default MovieModal;