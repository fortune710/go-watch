import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'
import styles from "./seasons.module.scss";
import { ActorCard, BackButton, Slides } from '../../components';

export const TVShowSeasonPage = () => {
    const { id, season_num } = useParams<{id: string, season_num:string}>();

    const { isLoading, data, error } = useQuery(['tv-show-seasons', id], async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${season_num}?api_key=e77b613c447296755dab014d1426012a&language=en-US`)
        console.log(response.data)
        return response.data;
    })

    return (
        <div>
            <BackButton/>
            {isLoading && <h2>Loading...</h2>}
            <section className={styles.introduction}>
                <img src={"https://image.tmdb.org/t/p/w500"+data?.poster_path} alt="poster image"/>

                <div>
                    <h2>Season {data?.season_number}</h2>

                    <p>{data?.overview}</p>
                </div>
            </section>

            <section>
                <h3>Episodes</h3>
                <ul className={styles.episodes}>
                {
                    data?.episodes.map((episode: any) => (
                        <li key={episode.id}>
                            <img src={"https://image.tmdb.org/t/p/w500"+episode.still_path} alt="episode still"/>
                            <div>
                                <h3>{episode.name}</h3>
                                <div>
                                    <h5>Episode {episode.episode_number}</h5>
                                    <h5>Aired on: {episode.air_date}</h5>
                                </div>
                                <p>{episode.overview}</p>
                            </div>
                        
                        </li>
                    ))
                }
                </ul>
            </section>

        </div>
    )
}
