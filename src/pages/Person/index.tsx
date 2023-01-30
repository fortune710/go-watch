import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { usePerson } from "../../hooks/usePerson";
import { Sidemenu, Slides } from "../../components";
import styles from "./styles.module.scss";
import { Button } from "@mui/material";

export const Person = () => {
    const { id } = useParams();
    const data = usePerson(id);
    const navigate = useNavigate();
    const [seeMore, setSeeMore] = useState<boolean>(false);
    const { isLoadingDetails, details, isLoadingMovies, movies } = data;
    const { isLoadingTVShows, shows, isLoadingSocials, socials } = data;
    const { isLoadingMoreImages, moreImages } = data;
    
    return (
        <React.Fragment>
            <Sidemenu/>
            <main className="sidemenu-page">
                <div className={`${styles.container}`}>
                    <img 
                        src={`https://image.tmdb.org/t/p/w1280${details?.profile_path}`}
                        className={styles.avatar} 
                        alt={details?.name}
                    />

                    <div>
                        <h2>{details?.name}</h2>
                        <p>Date of Birth: {formatDate(details?.birthday)}</p>
                    </div>
                </div>

                {
                    movies ? (
                    <section>
                        <h2>Movies starred in</h2>
                        <Slides>
                            <Skeleton isVisible={isLoadingMovies} />
                            <Skeleton isVisible={isLoadingMovies} />
                            <Skeleton isVisible={isLoadingMovies} />
                            <Skeleton isVisible={isLoadingMovies} />
                            <Skeleton isVisible={isLoadingMovies} />

                            {
                                movies?.cast?.map((movie: any) => (
                                    <div className={`${styles.scrollCard}`} onClick={() => navigate(`/movie/${movie?.id}`)}>
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} 
                                            alt={movie.title} 
                                        />
                                        <h3>Character: {movie?.character}</h3>
                                        <p>Movie: {movie?.title}</p>
                                    </div>
                                ))
                            }
                        </Slides>
                    </section>
                    ) : null
                }

                {
                    shows ? (
                    <section>
                        <h2>TV Shows starred in</h2>
                        <Slides>
                            <Skeleton isVisible={isLoadingTVShows} />
                            <Skeleton isVisible={isLoadingTVShows} />
                            <Skeleton isVisible={isLoadingTVShows} />
                            <Skeleton isVisible={isLoadingTVShows} />
                            <Skeleton isVisible={isLoadingTVShows} />
                            
                            {
                                shows?.cast?.map((movie: any) => (
                                    <div className={styles.scrollCard} onClick={() => navigate(`/movie/${movie?.id}`)}>
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w1280/${movie.poster_path}`} 
                                            alt={movie.title} 
                                        />
                                        <h3>Character: {movie?.character}</h3>
                                        <p>Movie: {movie?.title}</p>
                                    </div>
                                ))
                            }
                        </Slides>
                    </section>
                    ) : null
                }

                <section className={styles.container}>
                    <div className={styles.biography}>
                        <h2>Biography</h2>
                        <p>{seeMore ? details?.biography : details?.biography.substring(0,50)}</p>
                        <Button onClick={() => setSeeMore(!seeMore)}>
                            See More
                        </Button>
                    </div>
                    <div>
                        <ul>
                            <li>Twitter: {socials?.facebook_id}</li>
                        </ul>
                    </div>

                </section>

                <section>
                    <h2>More Images of {details?.name}</h2>

                    <Slides>
                        <Skeleton isVisible={isLoadingMoreImages} />
                        <Skeleton isVisible={isLoadingMoreImages} />
                        <Skeleton isVisible={isLoadingMoreImages} />
                        <Skeleton isVisible={isLoadingMoreImages} />
                        <Skeleton isVisible={isLoadingMoreImages} />
                        {
                            moreImages?.profiles?.map((photo:any) => (
                                <img 
                                    alt="Just another picture"
                                    className={styles.moreImage}
                                    src={`https://image.tmdb.org/t/p/w1280/${photo.file_path}`}
                                />
                            ))
                        }
                    </Slides>
                </section>
            </main>
        </React.Fragment>
    )
}

const Skeleton: React.FC<{isVisible: boolean}> = ({ isVisible }) => {
    if(!isVisible) return null;
    return (
        <div className={`skeleton ${styles.scrollCard}`}>
            <div className={styles.skeletonAvatar}/>
            <div className={styles.skeletonDetails}>
                <div className={styles.skeletonName}/>
                <div className={styles.skeletonDate}/>
            </div>
        </div>
    )
}


function formatDate(input:string) {
    var date = new Date(input);
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return monthNames[monthIndex] + ' ' + day + ', ' + year;
}
