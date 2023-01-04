import { Google } from "@mui/icons-material"
import { Button, SxProps, TextField, Snackbar } from "@mui/material"
import styles from './signup.module.scss';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, signInWithPopup, updateProfile } from "firebase/auth";
import { app } from "../../utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const SignUpPage: React.FC = () => {
    const auth = getAuth(app);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const buttonStyles: SxProps = {
        textTransform: 'capitalize'
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

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            updateProfile(userCredential.user, {
                displayName: entries.username as string,
            })
            setOpen(true)
        })
        .then(() => {
            navigate('/home')
        })
    }

    const signUpWithGoogle = async() => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(() => {
            //console.log('Signed in with Google')
            navigate('/home')
        })
    }
    
    return(
        <main>
            <form onSubmit={submitForm} className={styles.form}>
                <div>
                    <h2>Complete your Sign Up</h2>
                    <p>No credit card required.</p>
                </div>
                <TextField 
                    variant="outlined"
                    type="text"
                    label="Name"
                    sx={inputStyles}
                    required
                    name="name"
                    placeholder="Enter your name"
                />

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
                    Sign Up
                </Button>
                
                <Button onClick={signUpWithGoogle} sx={buttonStyles} type="button" startIcon={<Google/>} variant="contained">
                    Sign up with Google
                </Button>
            </form>
        </main>
    )
}