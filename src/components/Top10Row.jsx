import { useEffect, useRef, useState } from "react";
import "../css/Top10Row.css";

function Top10Row() {

    const [movies, setMovies] = useState([]);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const movieListRef = useRef(null);

    useEffect(() => {

        fetch(
            `https://api.themoviedb.org/3/trending/movie/week?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=tr-TR`
        )
            .then((response) => response.json())
            .then((data) => {
                setMovies(data.results.slice(0, 10));
            });

    }, []);

    const checkScroll = () => {

        const element = movieListRef.current;

        if (!element) return;

        setCanScrollLeft(element.scrollLeft > 0);

        setCanScrollRight(
            element.scrollLeft + element.clientWidth <
            element.scrollWidth - 5
        );
    };

    const scrollLeft = () => {
        movieListRef.current.scrollBy({
            left: -800,
            behavior: "smooth"
        });
    };

    const scrollRight = () => {
        movieListRef.current.scrollBy({
            left: 800,
            behavior: "smooth"
        });
    };

    return (
        <section className="top10-row">

            <h2>Türkiye'de Top 10</h2>

            <div className="top10-container">

                {canScrollLeft && (
                    <button
                        className="top10-scroll-button left"
                        onClick={scrollLeft}
                    >
                        ‹
                    </button>
                )}

                <div
                    className="top10-list"
                    ref={movieListRef}
                    onScroll={checkScroll}
                >

                    {movies.map((movie, index) => (

                        <div className="top10-card" key={movie.id}>

                            <div className="top10-rank">
                                {index + 1}
                            </div>

                            <div className="top10-poster">

                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                />

                                <div className="top10-info">

                                    <p>{movie.title}</p>

                                    <div className="top10-meta">

                                        <span>
                                            ⭐ {movie.vote_average?.toFixed(1)}
                                        </span>

                                        <span>
                                            {movie.release_date
                                                ? movie.release_date.slice(0, 4)
                                                : ""}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

                {canScrollRight && (
                    <button
                        className="top10-scroll-button right"
                        onClick={scrollRight}
                    >
                        ›
                    </button>
                )}

            </div>

        </section>
    );
}

export default Top10Row;