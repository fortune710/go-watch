import { useEffect, useState } from "react"
import { BottomNavbar, Searchbar, Sidemenu, Slides } from "../../components"
import axios from "axios";
import styles from "./home.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
    const [trendingMovies, setTrendingMovies] = useState<any>([]);
    const [trendingShows, setTrendingShows] = useState<any>([])
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

    

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=e77b613c447296755dab014d1426012a`)
        .then((res) => {
            setTrendingMovies(res.data.results)
        })

        axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=e77b613c447296755dab014d1426012a`)
        .then((res) => {
            setTrendingShows(res.data.results)
        })
    }, [])

    return(
        <>
            <Sidemenu/>

            <section className="sidemenu-page">                
                <div className={styles.section}>
                    <h2>Trending Movies</h2>
                    
                    <Slides>
                        {trendingMovies.map((movie: any) => (
                            <div className={styles.scrollCard} onClick={() => navigate(`/movie/${movie.id}`)}>
                                <img key={movie.id} title={movie.title} src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`} alt={movie.title}/>
                            </div>
                        ))}
                    </Slides>
                </div>

                <div className={styles.section}>
                    <h2>Trending Shows</h2>
                    <Slides>
                        {
                            !trendingShows ? (
                                <>
                                <div className={styles.slideCards}/>
                                <div className={styles.slideCards}/>
                                <div className={styles.slideCards}/>
                                <div className={styles.slideCards}/>
                                <div className={styles.slideCards}/>
                                <div className={styles.slideCards}/>
                                <div className={styles.slideCards}/>                                
                                </>
                                )
                            : <>
                            {
                                trendingShows.map((movie: any) => (
                                    <div className={styles.scrollCard} onClick={() => navigate(`/show/${movie.id}`)}>
                                        <img key={movie.id} title={movie.title} src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} alt={movie.title}/>
                                    </div>
                                ))
                            }
                            </>
                        }
                    </Slides>
                </div>
            </section>
            <BottomNavbar/>
        </>
    )
}