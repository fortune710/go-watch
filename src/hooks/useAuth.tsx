import { useState, useEffect } from 'react';
import { app } from '../utils';
import { getAuth, User, updateProfile } from 'firebase/auth';


export const useAuth = () => {
    const auth = getAuth(app);
    
    const updateProfilePicture = (photoURL:string) => {
        updateProfile(auth.currentUser!, {
            photoURL
        })
    }
    
    const updateUsername = (displayName:string) => {
        updateProfile(auth.currentUser!, {
            displayName
        })
    }

    return { user: auth.currentUser, updateProfilePicture, updateUsername };
}