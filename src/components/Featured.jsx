import { useEffect, useState } from "react";
import "../css/Featured.css";

const genreNames = {
    10759: "Aksiyon & Macera",
    16: "Animasyon",
    35: "Komedi",
    80: "Suç",
    99: "Belgesel",
    18: "Dram",
    10751: "Aile",
    10762: "Çocuk",
    9648: "Gizem",
    10763: "Haber",
    10764: "Reality",
    10765: "Bilim Kurgu & Fantastik",
    10766: "Pembe Dizi",
    10767: "Talk Show",
    10768: "Savaş & Politik",
    37: "Western"
};

function Featured() {

    const [movie, setMovie] = useState(null);
    const [videoKey, setVideoKey] = useState(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {

        const getFeatured = async () => {

            try {

                // Netflix Türkiye'de bulunan popüler dizileri getir
                const response = await fetch(
                    `https://api.themoviedb.org/3/discover/tv?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=tr-TR&watch_region=TR&with_watch_providers=8&with_watch_monetization_types=flatrate&sort_by=popularity.desc&page=1`
                );

                const data = await response.json();

                // Görseli ve açıklaması olan içerikleri al
                const candidates = data.results.filter(
                    (item) =>
                        item.backdrop_path &&
                        item.overview &&
                        item.id !== 2316 //Videosu gelmiyor
                );

                // Her yenilemede farklı bir içerik seçebilmek için karıştır
                const shuffled = [...candidates].sort(
                    () => Math.random() - 0.5
                );

                // Fragmanı olan ilk içeriği bul
                for (const item of shuffled) {

                    const videoResponse = await fetch(
                        `https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US`
                    );

                    const videoData = await videoResponse.json();

                    const trailer = videoData.results.find(
                        (video) =>
                            video.site === "YouTube" &&
                            video.type === "Trailer" &&
                            video.key
                    );

                    if (trailer) {
                        setMovie(item);
                        setVideoKey(trailer.key);
                        break;
                    }
                }

            } catch (error) {

                console.error("Hero verisi alınamadı:", error);

            }

        };

        getFeatured();

    }, []);

    // Veri gelene kadar hero gösterme
    if (!movie) {
        return null;
    }

    return (
        <section
            className="featured"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            }}
        >

            {isHovered && videoKey && (
                <iframe
                    className="featured-video"
                    src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&controls=0&rel=0`}
                    title={movie.name}
                    allow="autoplay"
                />
            )}

            <div className="featured-content">

                <h1>{movie.name}</h1>

                <div className="featured-info">

                    <span>
                        {movie.first_air_date
                            ? new Date(movie.first_air_date).getFullYear()
                            : ""}
                    </span>

                    <span>•</span>

                    <span>
                        {movie.genre_ids
                            ?.slice(0, 2)
                            .map((id) => genreNames[id])
                            .filter(Boolean)
                            .join(" • ")}
                    </span>

                </div>

                <p>
                    {movie.overview.length > 220
                        ? movie.overview.slice(0, 220) + "..."
                        : movie.overview}
                </p>

                <div className="featured-buttons">

                    <button>▶ Oynat</button>

                    <button>ⓘ Daha Fazla Bilgi</button>

                </div>

            </div>

        </section>
    );
}

export default Featured