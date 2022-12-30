import { useEffect, useState } from "react"
import { BottomNavbar, Searchbar, Sidemenu } from "../../components"
import axios from "axios";
import styles from "./home.module.scss";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const HomePage: React.FC = () => {
    const [trendingMovies, setTrendingMovies] = useState<any>([]);
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
    })

    return(
        <>
            <Sidemenu/>

            <section className="sidemenu-page">                
                <div>
                    <h1>Trending Movies</h1>
                    
                    <div className={styles.scrollView}>
                        {trendingMovies.map((movie: any) => (
                            <img key={movie.id} title={movie.title} src={`https://image.tmdb.org/t/p/w1280${movie.poster_path}`} alt={movie.title}/>
                        ))}
                    </div>
                </div>
            </section>
            <BottomNavbar/>
        </>
    )
}