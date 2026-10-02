import { useEffect, useRef, useState } from "react";
import "../css/MovieRow.css";

import { FaPlay } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

function MovieRow({ title, endpoint }) {
    const [movies, setMovies] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const movieListRef = useRef(null);

    // Filmleri API'den çek
    useEffect(() => {
        const url = new URL(
            `https://api.themoviedb.org/3/${endpoint}`
        );

        url.searchParams.append(
            "api_key",
            import.meta.env.VITE_TMDB_API_KEY
        );

        url.searchParams.append(
            "language",
            "tr-TR"
        );

        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results);
            });
    }, [endpoint]);

    // Scroll durumunu kontrol et
    const checkScroll = () => {
        const element = movieListRef.current;

        if (!element) return;

        setCanScrollLeft(element.scrollLeft > 0);

        setCanScrollRight(
            element.scrollLeft + element.clientWidth <
            element.scrollWidth - 5
        );
    };

    // Sola kaydır
    const scrollLeft = () => {
        movieListRef.current.scrollBy({
            left: -800,
            behavior: "smooth",
        });
    };

    // Sağa kaydır
    const scrollRight = () => {
        movieListRef.current.scrollBy({
            left: 800,
            behavior: "smooth",
        });
    };

    return (
        <section className="movie-row">
            <h2>{title}</h2>

            <div className="movie-container">
                {canScrollLeft && (
                    <button
                        className="scroll-button left"
                        onClick={scrollLeft}
                    >
                        ‹
                    </button>
                )}

                <div
                    className="movie-list"
                    ref={movieListRef}
                    onScroll={checkScroll}
                >
                    {movies.map((movie) => (
                        <div
                            className="movie-card"
                            key={movie.id}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title || movie.name}
                            />

                            <div className="movie-hover">
                                <h3>
                                    {movie.title || movie.name}
                                </h3>

                                <div className="movie-hover-buttons">
                                    <button>
                                        <FaPlay />
                                    </button>

                                    <button>
                                        <FaPlus />
                                    </button>

                                    <button>
                                        <FaThumbsUp />
                                    </button>
                                </div>

                                <div className="movie-meta">
                                    <span>
                                        ⭐ {movie.vote_average?.toFixed(1)}
                                    </span>

                                    <span>
                                        {movie.release_date
                                            ? movie.release_date.slice(0, 4)
                                            : movie.first_air_date
                                                ? movie.first_air_date.slice(0, 4)
                                                : ""}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {canScrollRight && (
                    <button
                        className="scroll-button right"
                        onClick={scrollRight}
                    >
                        ›
                    </button>
                )}
            </div>
        </section>
    );
}

export default MovieRow;