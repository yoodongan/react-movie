import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import React from 'react';

const Detail = ({title, }) => {
    const[loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const {movieId} = useParams();
    const getMovie = async () => {
        const json = await (
                (await fetch(
                        `https://yts.mx/api/v2/movie_details.json?movie_id=${movieId}`)
                ).json()
        );
        console.log(json.data.movie);
        setLoading(false);
        setData(json.data.movie);
        console.log(data);
        // console.log(data);
    }
    console.log(data);
    console.log(data.genres);

    useEffect(() => {
        getMovie();
    }, []);

    return (
            <div>
                <h1>Movie Detail</h1>
                <h3>{loading ? <div>Loading...</div> : null}</h3>
                <h2>{data.title}</h2>
                <img src={data.medium_cover_image} alt=""/>
                <h3>Released year : {data.year}</h3>
                <h3>Rating : {data.rating}</h3>
                <div>
                    {(data.hasOwnProperty("genres")?
                        <ul>
                         {data.genres.map((g)=><li key={g}>{g}</li>)}
                        </ul> : null)}
                </div>
            </div>
    )
}
export default Detail;
