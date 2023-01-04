import { Google } from "@mui/icons-material"
import { Button, SxProps, TextField, Snackbar } from "@mui/material"
import styles from '../SignUp/signup.module.scss';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { app } from "../../utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const LoginPage: React.FC = () => {
    const auth = getAuth(app);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const buttonStyles: SxProps = {
        textTransform: 'capitalize',
        borderRadius: '10px',
        width: '90%',
        height: '50px'
    }

    const inputStyles: SxProps = {
        backgroundColor: '#333',
        color: '#fff',
        borderRadius: '5px',
        width: '100%',
        '::placeholder': {
            color: '#fff',
        }
    }

    const submitForm = (e:any) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const entries = Object.fromEntries(data)

        const email = entries.email as string;
        const password = entries.password as string;

        signInWithEmailAndPassword(auth, email, password)
        .then(() => {
            navigate('/home')
        })
    }

    const signUpWithGoogle = async() => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(() => {
            console.log('Signed in with Google')
            navigate('/home')
        })
    }
    
    return(
        <main>
            <form onSubmit={submitForm} className={styles.form}>
                <div>
                    <h2>Welcome Back!</h2>
                    <p>Everything is still in place</p>
                </div>
                
                <TextField 
                    variant="outlined"
                    type="email"
                    label="Email"
                    sx={inputStyles}
                    required
                    name="email"
                    placeholder="Enter your email"
                />

                <TextField 
                    variant="outlined"
                    type="password"
                    label="Password"
                    sx={inputStyles}
                    required
                    name="password"
                    placeholder="Enter your password"
                />

                <Button sx={buttonStyles} type="submit" variant="contained">
                    Login
                </Button>
                
                <Button onClick={signUpWithGoogle} sx={buttonStyles} type="button" startIcon={<Google/>} variant="contained">
                    Sign in with Google
                </Button>
            </form>
        </main>
    )
}