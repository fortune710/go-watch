import { useEffect } from "react"
import { BottomNavbar, Sidemenu } from "../../components"
import { useAuth } from "../../hooks/useAuth"
import { useReadDocsFromFirestore } from "../../hooks/useFirestore"

export const FavouritesPage: React.FC = () => {
    const { user } = useAuth()
    const { documents } = useReadDocsFromFirestore(`users/${user?.uid}/favourites`);

    useEffect(() => {
        console.log(documents)
    }, [documents])

    return(
        <>
            <Sidemenu/>
            <main className="sidemenu-page">
                <h1>Your Favourites</h1>
                {
                    !user ? <h2>You need to be logged in to see your favourites</h2> :
                    (
                        <section>
                        { documents.length === 0 ? <h2>You have no favourites</h2> : 
                            documents.map(val => (
                                <div>
                                    <h2>{val.title}</h2>
                                    <img src={val.poster_path} alt={val.title}/>
                                </div>
                            ))
                        }
                        </section>
                    )
                }
            </main>
            <BottomNavbar/>
        </>
    )
}