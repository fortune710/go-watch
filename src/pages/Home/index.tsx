import { useEffect, useState } from "react"
import { BottomNavbar, Searchbar, Sidemenu, Slides } from "../../components"
import axios from "axios";
import styles from "./home.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
    const navigate = useNavigate();

    /*
    const { isLoading, data:searchResults } = useQuery(["search-data"], () => {
        if(!query) return;
        const data = axios.get(`https://api.themoviedb.org/3/search/multi?api_key=e77b613c447296755dab014d1426012a&query=${query}}`)
        .then((res) => {
            console.log(res.data)
            return res.data
        })
        return data
    })*/

    const { isLoading: loadingTrendingMovies, data: trendingMovies } = useQuery(["trending-movies"], async () => {
        return await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=e77b613c447296755dab014d1426012a`)
        .then((res) => {
            return res.data.results
        })
    })

    const { isLoading: loadingTrendingShows, data: trendingShows } = useQuery(["trending-shows"], async () => {

        return await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=e77b613c447296755dab014d1426012a`)
        .then((res) => {
            return res.data.results;
        })
    })


    return(
        <>
            <Sidemenu/>

            <section className="sidemenu-page">               
                <div className={styles.section}>
                    <h2>Trending Movies</h2>
                    
                    <Slides>
                        <Skeleton isVisible={loadingTrendingMovies}/>
                        <Skeleton isVisible={loadingTrendingMovies}/>
                        <Skeleton isVisible={loadingTrendingMovies}/>
                        <Skeleton isVisible={loadingTrendingMovies}/>
                        <Skeleton isVisible={loadingTrendingMovies}/>
                        <Skeleton isVisible={loadingTrendingMovies}/>
                        <Skeleton isVisible={loadingTrendingMovies}/>

                    {
                        trendingMovies?.map((movie: any) => {
                            return (
                            <div key={movie.id} title={movie?.title} className={styles.scrollCard} onClick={() => navigate(`/movie/${movie.id}`)}>
                                <img title={movie.title} src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie.title}/>
                            </div>
                            )
                        
                            }
                        )
                    }
                    </Slides>
                </div>

                <div className={styles.section}>
                    <h2>Trending Shows</h2>
                    <Slides>
                        <Skeleton isVisible={loadingTrendingShows}/>
                        <Skeleton isVisible={loadingTrendingShows}/>
                        <Skeleton isVisible={loadingTrendingShows}/>
                        <Skeleton isVisible={loadingTrendingShows}/>
                        <Skeleton isVisible={loadingTrendingShows}/>
                        <Skeleton isVisible={loadingTrendingShows}/>
                        <Skeleton isVisible={loadingTrendingShows}/>

                        {
                            trendingShows ? (
                                trendingShows?.map((movie: any) => (
                                    <div key={movie.id} className={styles.scrollCard} onClick={() => navigate(`/show/${movie.id}`)}>
                                        <img title={movie.title} src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} alt={movie.title}/>
                                    </div>
                                )) 
                            ): null
                        }
                    </Slides>
                </div>
            </section>
            <BottomNavbar/>
        </>
    )
}

interface SkeletonProps {
    isVisible: boolean
}

const Skeleton: React.FC<SkeletonProps> = ({ isVisible }) => {
    if(!isVisible) return null
    
    return(
        <div className={styles.scrollCard}/>
    )
}