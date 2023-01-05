import { useEffect } from "react"
import { BottomNavbar, Sidemenu } from "../../components"
import { useAuth } from "../../hooks/useAuth"
import { useReadDocsFromFirestore } from "../../hooks/useFirestore";
import styles from "./favourites.module.scss";
import { Skeleton } from "@mui/material";

export const FavouritesPage: React.FC = () => {
    const { user } = useAuth()
    const { documents, loading } = useReadDocsFromFirestore(`users/${user?.uid}/favourites`);

    
    return(
        <>
            <Sidemenu/>
            <main className="sidemenu-page">
                {
                    !user ? <h4>You need to be logged in to see your favourites</h4> :
                    (
                        <section className={styles.section}>
                            <h2>Your Favourites</h2>
                            { 
                                loading ? <LoadingSection/> :
                                documents.length === 0 ? <h2>You have no favourites</h2> : (
                                    <div className={styles.favourites}>
                                    {
                                        documents.map(val => (
                                            <article>
                                                <img src={val.poster_path} alt={val.title}/>
                                                <h3>{val.title}</h3>
                                            </article>
                                        ))
                                    }
                                    </div>
                                )
                            }
                        </section>
                    )
                }
            </main>
            <BottomNavbar/>
        </>
    )
}


const LoadingSection: React.FC = () => {
    return(
        <div className={styles.favourites}>
            <Skeleton width={'100%'} height={150}/>
            <Skeleton width={'100%'} height={150}/>
            <Skeleton width={'100%'} height={150}/>
            <Skeleton width={'100%'} height={150}/>
        </div>
    )
}