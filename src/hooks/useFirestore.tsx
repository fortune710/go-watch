import { collection, getDocs, setDoc, addDoc, getDoc, getFirestore, doc, onSnapshot } from "firebase/firestore";
import { app } from "../utils";
import { useState, useEffect } from "react";
const firestore = getFirestore(app)

export const useReadDocFromFirestore = (path:string) => {
    const [document, setDoc] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const query = doc(firestore, path)

    useEffect(() => {
        getDoc(query)
        .then(doc => {
            setDoc(doc.data())
        })
    }, [path]);

    return { document, loading, error };
}

export const useReadDocsFromFirestore = (path:string) => {
    const query = collection(firestore, path);
    const [documents, setDocs] = useState<any[]>([]);
    
    useEffect(() => {
        const unsubscribe = onSnapshot(query, {
            next: (querySnapshot) => {
                let data: any[] = []
                querySnapshot.forEach((doc) => (
                    data = [...data, doc.data()]
                ))
                setDocs(data)
            }
        })
        return () => unsubscribe()
    }, [path]);

    return { documents };
}

export const useWriteDocToFirestore = (path:string, data:any) => {
    const query = doc(firestore, path)
    try {
        setDoc(query, data)
        return 'success'
    } catch (error) {
        return 'error'
    }
}