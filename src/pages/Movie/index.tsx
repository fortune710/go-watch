import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import styles from "./movie.module.scss";
import { Chip } from "@mui/material";
import { ActorCard, ReviewCard, SimilarMovie, Slides } from "../../components";
import { BackButton } from "../../components/BackButton/back-button";

interface Genre {
    id: number,
    name: string
}

export const MovieDetailPage = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState<any>()
    const [credits, setCredits] = useState<any>()
    const [reviews, setReviews] = useState<any>();
    const [similarMovies, setSimilar] = useState<any[]>();


    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e77b613c447296755dab014d1426012a&language=en-US`)
        .then(res => {
            setMovie(res.data)
        })

        axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=e77b613c447296755dab014d1426012a&language=en-US&language=en-US`)
        .then(res => {
            setCredits(res.data)
        })

        axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=e77b613c447296755dab014d1426012a&language=en-US&language=en-US`)
        .then(res => {
            setReviews(res.data)
        })

        axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=e77b613c447296755dab014d1426012a&language=en-US&language=en-US`)
        .then(res => {
            console.log(res.data.results)
            setSimilar(res.data.results)
        })

        

    }, [])
  return (
    <main>
        <BackButton/>
        {
            movie && (
            <div>
                <img className={styles.movieImage} src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} alt="Poster"/>
                <section className={styles.movieInfo}>
                    <h2>{movie.title}</h2>
                    <h4>{movie.tagline}</h4>
                    <p>
                        Release Date: {movie.release_date}
                    </p>
                    <div>
                        {
                            movie.genres.map((genre:Genre) => (
                                <Chip key={genre.id} color="primary" label={genre.name} clickable={false}/>
                            ))
                        }
                    </div>

                    <div>
                        <h3>Overview</h3>
                        <p>{movie.overview}</p>
                    </div>
                </section>
            </div>
            )

        }
        {
            credits && (
                <>
                <section>
                    <h2>Cast</h2>
                    <Slides>
                    {
                        credits.cast.map((actor:any) => (
                            <ActorCard
                                key={actor.id}
                                character={actor.character}
                                image={'https://image.tmdb.org/t/p/w500'+actor.profile_path}
                                actorName={actor.name}
                            />
                        ))
                    }
                    </Slides>
                </section>
                
                
                </>
            )
        }

        {
            reviews && (
            <>
                <section>
                    <h2>Reviews</h2>
                    {
                        reviews.results.slice(0, 3).map((review:any) => (
                            <ReviewCard
                                date={review.created_at}
                                author={review.author}
                                content={review.content}
                            />
                        ))
                    }
                </section>
            
            </>
            )
        }
        <section>
            <h3>If you liked this movie, check out these one too</h3>
            <Slides>
            {
                similarMovies?.map((movie:any) => (
                    <SimilarMovie
                        image={'https://image.tmdb.org/t/p/w200'+movie.backdrop_path}
                        name={movie.title}
                        rating={movie.vote_average}
                    />
                ))
            }            
            </Slides>

        </section>
    </main>
  )
}

