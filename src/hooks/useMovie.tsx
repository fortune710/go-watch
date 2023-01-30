import { useQuery } from "@tanstack/react-query"
import axios from "axios"

interface MovieData {
    details: any,
    loadingDetails: boolean,
    errorOnLoad: any,
    credits: any,
    loadingCredits: boolean,
    reviews: any,
    loadingReviews: boolean
    similarMovies: any,
    loadingSimilarMovies: boolean
}

export const useMovies = (id:string) : MovieData => {
    const { isLoading: loadingDetails, data: details, error: errorOnLoad } = useQuery(["movie", id], () => {
        const data = axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=e77b613c447296755dab014d1426012a&language=en-US`)
        .then(res => {
            return res.data
        })
        return data
    })

    const { isLoading: loadingCredits, data: credits } = useQuery(["movie-credits", id], async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=e77b613c447296755dab014d1426012a&language=en-US&language=en-US`)
        .then(res => {
            return res.data
        })
        return data
    })

    const { isLoading: loadingReviews, data: reviews } = useQuery(["movie-reviews", id], async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=e77b613c447296755dab014d1426012a&language=en-US&language=en-US`)
        .then(res => {
            return res.data
        })
        return data
    })

    const { isLoading: loadingSimilarMovies, data: similarMovies } = useQuery(["similar-movies", id], async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=e77b613c447296755dab014d1426012a&language=en-US&language=en-US`)
        .then(res => {
            return res.data.results
        })
        return data
    })
    
    return {
        loadingDetails,
        details,
        errorOnLoad,
        loadingCredits,
        credits,
        loadingReviews,
        reviews,
        loadingSimilarMovies,
        similarMovies,
    }
}