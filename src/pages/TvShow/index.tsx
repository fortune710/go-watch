import { useParams } from "react-router-dom";
import { useTvShow } from "../../hooks/useTvShow";
import styles from './tv-show.module.scss';
import { Avatar, Button, Chip } from "@mui/material";
import { ActorCard, BackButton, ReviewCard, SimilarMovie, Slides } from "../../components";
import { Bookmark, BookmarkAdd, Star } from "@mui/icons-material";

export const TVShowPage: React.FC = () => {
    const { id } = useParams<{ id:string }>();
    const show = useTvShow(id);

    const buttonStyle = {
        textTransform:'capitalize',
        margin: '0 auto',
        width: '80%'
    }
    if(!show) return null;

    const { details, providers, credits, reviews, similar } = show;
    return(

        <>
        <BackButton/>
        <main className={styles.content}>
            <div className={styles.details}>
                { !details?.poster_path && <div className={styles.emptyImage}>Loading Image</div> }
                <img src={"https://image.tmdb.org/t/p/w500"+details?.poster_path} alt={details?.name}/>
                <section>

                    <div>
                        <div className={styles.title}>
                            <h1>{details?.name}</h1>

                            <span className={styles.rating}>
                                <Star/>
                                <span>{details?.vote_average}</span>
                            </span>
                        </div>
                        {
                            details?.genres.map((genre: any) => (
                                <Chip color="primary" key={genre.id} clickable={false} label={genre.name}/>
                            ))
                        }
                        <h4>First Aired: {details?.first_air_date}</h4>
                        { details?.last_air_date && <h4>Last Aired: {details?.last_air_date}</h4> }
                    </div>

                    <Button variant="contained" sx={buttonStyle} startIcon={<BookmarkAdd/>}>
                        Add to Favourites
                    </Button>
                </section>
            </div>

            <section>
                <h2>Overview</h2>
                <p>{details?.overview}</p>
            </section>

            <section className={styles.cast}>
                <h2>Cast</h2>
                <Slides>
                    {
                        credits?.cast.map((actor: any) => (
                            <ActorCard 
                                key={actor.id} 
                                image={"https://image.tmdb.org/t/p/w500"+actor?.profile_path} 
                                character={actor.character}
                                actorName={actor.name}
                            />
                        ))
                    }
                </Slides>
            </section>

            <section>
                <h2>Current Season</h2>
                {
                    details?.seasons.slice(-1).map((season:any) => (
                        <div className={styles.currentSeason} title={`Season ${details?.number_of_seasons}`}>
                            <img 
                                src={"https://image.tmdb.org/t/p/w500"+season.poster_path} 
                                alt={`Season ${details?.number_of_seasons}`}
                            />
                            <div>
                                <h3>{season.name}</h3>
                                <h5>{season.episode_count} episodes</h5>
                                <p>Premiered on {season.air_date}</p>
                            </div>
                        </div>
                    ))
                }

            </section>

            {
                !providers?.results ? (
                    <h2>Not available on any streaming services</h2>
                ) : (
                    <section className={styles.providers}>

                    <h2>Watch on</h2>
                    <ul>
                        {
                            providers?.results.US?.flatrate.map((provider: any) => (
                                <li key={provider.provider_id}>
                                    <Avatar src={"https://image.tmdb.org/t/p/original"+provider?.logo_path} alt={provider.provider_name}/>
                                    <p>{provider.provider_name}</p>
                                </li>
                            ))
                            
                        }
                    </ul>
                </section>
                )
            }
            <section>
                <h2>Reviews</h2>
                {
                    reviews?.slice(0, 3).map((review:any) => (
                        <ReviewCard
                            key={review.author}
                            author={review.author}
                            content={review.content}
                            date={review.created_at}
                        />
                    ))
                }
            </section>

            <section>
                <h2>If you like {details?.name}, then you'll love</h2>
                <Slides>
                    {
                        similar?.results.map((show: any) => {
                            return (
                                <SimilarMovie
                                    key={show.id}
                                    name={show.name}
                                    rating={show.vote_average}
                                    image={"https://image.tmdb.org/t/p/w500"+show?.backdrop_path}
                                />
                            )
                        })
                            
                                                
                    }
                </Slides>
            </section>


            
        </main>
        
        
        </>
    )
}