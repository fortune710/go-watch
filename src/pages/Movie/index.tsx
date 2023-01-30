import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import styles from "./movie.module.scss";
import { Chip } from "@mui/material";
import { ActorCard, ReviewCard, Sidemenu, SimilarMovie, Skeleton, Slides } from "../../components";
import { BackButton } from "../../components/BackButton/back-button";
import { useMovies } from "../../hooks/useMovie";

interface Genre {
    id: number,
    name: string
}

export const MovieDetailPage = () => {
    const { id } = useParams<{ id: string }>();
    if(!id) return null

    const navigate = useNavigate();

    const { loadingDetails } = useMovies(id);
    const data = useMovies(id);
    const { details, errorOnLoad } = data;
    const { loadingCredits, credits } = data;
    const { loadingReviews, reviews } = data;
    const { loadingSimilarMovies, similarMovies } = data;

  return (
    <>
        <Sidemenu/>
        <main className="sidemenu-page">
            <BackButton/>
            <div className={styles.details}>
                <Skeleton 
                    customClassName={styles.loadingImage} 
                    isVisible={loadingDetails}
                />
                {/* Try using an image holder, if UX issues persist */}
                <img 
                    className={styles.movieImage} 
                    src={`https://image.tmdb.org/t/p/w1280${details?.poster_path}`} 
                    alt={`Poster of ${details?.title}`}
                />
                <section>
                    <h2>{details?.title}</h2>
                    <h4>{details?.tagline}</h4>
                    <Skeleton
                        isVisible={loadingDetails}
                        customClassName={styles.loadingText}
                    />
                    <p>
                        Release Date: {details?.release_date}
                    </p>
                    <div>
                        {
                            details?.genres?.map((genre:Genre) => (
                                <Chip key={genre.id} color="primary" label={genre.name} clickable={false}/>
                            ))
                        }
                    </div>

                </section>
            </div>

            <section>
                <h3>Overview</h3>
                <p>{details?.overview}</p>
                <Skeleton
                    isVisible={loadingDetails}
                    customClassName={styles.loadingOverview}
                />
            </section>
            {
                credits && (
                    <>
                    <section>
                        <h2>Cast</h2>
                        <Slides>
                            <Skeleton
                                customClassName={styles.loadingActors}
                                isVisible={loadingCredits}
                            />
                            <Skeleton
                                customClassName={styles.loadingActors}
                                isVisible={loadingCredits}
                            />
                            <Skeleton
                                customClassName={styles.loadingActors}
                                isVisible={loadingCredits}
                            />
                            <Skeleton
                                customClassName={styles.loadingActors}
                                isVisible={loadingCredits}
                            />

                        {
                            credits.cast.map((actor:any) => (
                                <ActorCard
                                    key={actor.id}
                                    character={actor.character}
                                    image={'https://image.tmdb.org/t/p/w500'+actor.profile_path}
                                    actorName={actor.name}
                                    onClickCard={() => navigate(`/person/${actor.id}`)}
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
                        <div className={styles.reviews}>
                        {
                            reviews.results.slice(0, 3).map((review:any) => (
                                <ReviewCard
                                    date={review.created_at}
                                    author={review.author}
                                    content={review.content}
                                />
                            ))
                        }
                        </div>
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
    
    </>
  )
}

