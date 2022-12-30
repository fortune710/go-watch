import axios from "axios";
import { useState, useEffect } from "react";
import { BottomNavbar, Searchbar, Sidemenu } from "../../components"
import styles from './search.module.scss';
import { useNavigate } from "react-router-dom";

export const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [searchResults, setResults] = useState<any[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        if(!query) {
            setResults([])
            return;
        }
        axios.get(`https://api.themoviedb.org/3/search/multi?api_key=e77b613c447296755dab014d1426012a&query=${query}}`)
        .then((res) => {
            console.log(res.data)
            setResults(res.data.results)
        })
    }, [query])

    return(
        <>
            <Sidemenu/>
            <div className="sidemenu-page">
                <Searchbar onChange={(e) => setQuery(e.target.value)}/>
                <ul className={styles.searchResults}>
                    {
                        searchResults.map((result:any) => {
                            let route = ""
                            if(result.media_type === 'person'){
                                route = `/person/${result.id}`
                            } else if(result.media_type === 'tv'){
                                route = `/show/${result.id}`
                            } else if(result.media_type === 'movie'){
                                route = `/movie/${result.id}`
                            }
                            
                            return (
                                <li onClick={() => navigate(route)}>
                                    <img width={50} src={`https://image.tmdb.org/t/p/w1280${result.poster_path}`} alt="" />
                                    <h5>{!result.name ? result.title : result.name}</h5>
                                </li>
                            )
 
                        })
                    }
                </ul>

            </div>
            <BottomNavbar/>
        </>
    )
}