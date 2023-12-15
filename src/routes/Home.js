import React, {useEffect, useState} from 'react';
import Movie from "../components/Movie";
import styles from "./Home.module.css";
const Home = () => {
    const [loading, setLoading] = React.useState(true);
    const [movies, setMovies] = React.useState([]);

    useEffect(() => {
        fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`)
        .then((resp) => resp.json())
        .then((json) => {
            setMovies(json.data.movies);
            setLoading(false);
        });
    }, []);

    return (
            <div className={styles.container}>
                {loading ? (
                        <div className={styles.loader}>
                            <span>Loading...</span>
                        </div>
                ) : (
                        <div className={styles.movies}>
                            {movies.map((movie) => (
                                    <Movie
                                            id={movie.id}
                                            key={movie.id}  // 이걸 넣어줘야 콘솔 에러가 나지 않는다. 단, Movie.js에서는 key를 사용하지 않는다.
                                            title={movie.title}
                                            year={movie.year}
                                            genres={movie.genres}
                                            coverImg={movie.medium_cover_image}
                                            summary={movie.summary}
                                    />
                            ))}
                        </div>
                )}
            </div>
    )
}

export default Home;
