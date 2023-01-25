import { Box, Button, Input, InputBase, SxProps } from "@mui/material";
import { Movies } from "./movies";
import LegoFamily from "../../assets/Component.svg";
import Logo from "../../assets/logo.png";
import { Laptop, TabletAndroid, PhoneIphone, Gamepad, SportsEsports } from "@mui/icons-material";
import styles from "./landing.module.scss";
import { Footer } from "../../components";
import { useInView } from "react-intersection-observer";

import LaptopMockup from "../../assets/laptop.svg";
import PhoneMockup from "../../assets/phone.svg";
import { useNavigate } from "react-router-dom";
export const LandingPage = () => {
    const [ref, inView] = useInView();
    const navigate = useNavigate();

    const loginButtonStyles:SxProps = {
        boxShadow: 0,
        borderColor: '#fff',
        backgroundColor: 'rgba(2, 2, 2, 0.48)',
        position: "fixed",
        right: '1rem',
        color: 'white',
        top: '0.3rem',
        display: inView ? "block" : "none",
        zIndex: 999
    }

    const secondLoginStyles: SxProps = {
        boxShadow: 0,
        borderColor: '#fff',
        backgroundColor: 'rgba(2, 2, 2, 0.48)',
        color: 'white',
    }


    return(
        <main className={styles.landingPage}>
            <nav className={`${inView ? styles.noDisplay : styles.display} ${styles.secondNav}`}>
                <img src={Logo} alt="Logo"/>

                <div>
                    <Button href="/signup" variant="contained">
                        Sign Up
                    </Button>
                    <Button href="/login" sx={secondLoginStyles} variant="outlined">
                        Login
                    </Button>
                </div>
            </nav>


            <section ref={ref} className={styles.introduction}>
                <nav>
                    <Button href="/login" sx={loginButtonStyles} variant="outlined">
                        Login
                    </Button>
                </nav>

                <div className={styles.greeting}>
                    <img src={Logo} alt="Logo"/>

                    <h2>Infinite Hours. Endless streams</h2>
                    <p>
                        You love movies, we do too. 
                        That's why we've curated all the details, just for you.
                    </p>

                    <div className={styles.input}>
                        <InputBase placeholder="Enter your email"/>
                        <Button variant="contained">
                            Continue
                        </Button>
                    </div>

                    <p>No subscription. No hidden fees. Just vibes</p>
                </div>
                <div className={styles.gradientBottom}></div>
            </section>

            <section className={styles.secondSection}>
                <div className={styles.secondSectionIntro}>
                    <h2>Go Watch Privilege</h2>
                    <p>Exclusive details, even in unrealeased titles</p>
                </div>

                <div className={styles.movies}>
                    {
                        Movies.map((movie) => (
                            <img key={movie.id} className={styles.movieCard} src={movie.image} title={movie.name} alt={`${movie.name}`}/>
                        ))
                    }
                </div>
            </section>

            <section className={styles.familyFriendly}>
                <div>
                    <h3>From Action Packed to Family Friendly</h3>
                    <p>Check out the collection</p>                    
                </div>

                <div>
                    <img className={styles.laptop} src={LaptopMockup} width={600} alt="" />
                    <img className={styles.phone} src={PhoneMockup} width={160} alt="" />
                </div>

            </section>

            <section className={styles.devicesSection}>
                <h2>Check Movie Details from Any Device</h2>
                <div className={styles.devices}>
                    <div className={styles.deviceCard}>
                        <Laptop sx={{ fontSize: 60 }}/>
                        <h4>Laptop</h4>
                    </div>
                    <div className={styles.deviceCard}>
                        <TabletAndroid sx={{ fontSize: 60 }}/>
                        <h4>Tablet</h4>
                    </div>
                    <div className={styles.deviceCard}>
                        <PhoneIphone sx={{ fontSize: 60 }}/>
                        <h4>Phone</h4>
                    </div>
                    <div className={styles.deviceCard}>
                        <SportsEsports sx={{ fontSize: 60 }}/>
                        <h4>Game Console</h4>
                    </div>

                </div>
            </section>
            <Footer />
        </main>
    )
}