import { useState } from "react";
import { FaPlus, FaCheck, FaThumbsUp } from "react-icons/fa";

function MovieDetailHero({ title, backdrop, heroVideo }) {
    const [isInList, setIsInList] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [playTrailer, setPlayTrailer] = useState(false);

    return (
        <div
            className={`movie-modal-hero ${playTrailer ? "trailer-playing" : ""}`}
            style={{
                backgroundImage: backdrop
                    ? `linear-gradient(to top, #181818 2%, transparent 75%), url(${backdrop})`
                    : "linear-gradient(to top, #181818, #333)"
            }}
        >
            {heroVideo && (
                <iframe
                    className="movie-modal-hero-video"
                    src={`https://www.youtube-nocookie.com/embed/${heroVideo.key}?autoplay=1&mute=1&controls=0&loop=1&playlist=${heroVideo.key}&playsinline=1&rel=0`}
                    title={`${title} fragmanı`}
                    allow="autoplay; encrypted-media; picture-in-picture"
                />
            )}

            <div className="movie-modal-hero-content">
                <h1>{title}</h1>

                <div className="modal-actions">
                    <button
                        className="modal-play-button"
                        onClick={() => {
                            if (heroVideo) {
                                setPlayTrailer(true);
                            } else {
                                document
                                    .querySelector(".trailer-list")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    });
                            }
                        }}
                    >
                        ▶ Oynat
                    </button>

                    <button
                        className={`modal-icon-button ${isInList ? "selected" : ""}`}
                        onClick={() => setIsInList(!isInList)}
                        title={isInList ? "Listemden çıkar" : "Listeme ekle"}
                        aria-label={isInList ? "Listemden çıkar" : "Listeme ekle"}
                    >
                        {isInList ? <FaCheck /> : <FaPlus />}
                    </button>

                    <button
                        className={`modal-icon-button ${isLiked ? "selected" : ""}`}
                        onClick={() => setIsLiked(!isLiked)}
                        title={isLiked ? "Beğenmekten vazgeç" : "Beğen"}
                        aria-label={isLiked ? "Beğenmekten vazgeç" : "Beğen"}
                    >
                        <FaThumbsUp />
                    </button>
                </div>

                {playTrailer && heroVideo && (
                    <div className="hero-trailer-player">
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${heroVideo.key}?autoplay=1&mute=0&controls=1&playsinline=1&rel=0`}
                            title={`${title} fragman oynatıcı`}
                            allow="autoplay; encrypted-media; picture-in-picture"
                            allowFullScreen
                        />

                        <button
                            type="button"
                            onClick={() => setPlayTrailer(false)}
                        >
                            Fragmanı kapat
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieDetailHero;