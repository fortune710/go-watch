import { BottomNavbar, Sidemenu } from "../../components"
import { useAuth } from "../../hooks/useAuth"
import { useReadDocsFromFirestore } from "../../hooks/useFirestore";
import styles from "./favourites.module.scss";
import { Link } from "react-router-dom";
import { Skeleton } from "../../components";
import { Helmet } from "react-helmet-async";

export const FavouritesPage: React.FC = () => {
    const { user } = useAuth()
    const { documents, loading } = useReadDocsFromFirestore(`users/${user?.uid}/favourites`);

    
    return(
        <>
            <Helmet>
                <title>Your Favourites</title>
            </Helmet>
            <Sidemenu/>
            <main className={`sidemenu-page ${styles.page}`}>
                {
                    !user ? <CallToSignIn/> : 
                    (
                        <section className={styles.section}>
                            <h2>Your Favourites</h2>
                            
                            <div className={styles.favourites}>
                                <Skeleton isVisible={loading} customClassName={styles.skeleton}/>
                                <Skeleton isVisible={loading} customClassName={styles.skeleton}/>
                                <Skeleton isVisible={loading} customClassName={styles.skeleton}/>
                                <Skeleton isVisible={loading} customClassName={styles.skeleton}/>
                            </div>

                            { 
                                documents.length === 0 ? <h2>You have no favourites</h2> : (
                                    <div className={styles.favourites}>
                                    {
                                        documents.map(val => (
                                            <article>
                                                <div className={styles.imageHolder}>
                                                    <Skeleton
                                                        isVisible={!val.poster_path ? true : false}
                                                        customClassName={styles.imageHolder}
                                                    />
                                                    <img src={val.poster_path} alt={val.title}/>
                                                </div>
                                                <h3>{val.title}</h3>
                                                <Skeleton
                                                    isVisible={!val.title ? true : false}
                                                    customClassName="loadingText"
                                                />
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


const CallToSignIn: React.FC = () => (
    <div className={styles.callToSignIn}>
        <h4>You need to be signed in to see your favourites</h4>
        <Link className={styles.loginButton} to="/login">
            Login
        </Link>
    </div>
)