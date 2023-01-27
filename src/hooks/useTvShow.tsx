import { useQuery } from "@tanstack/react-query"
import axios from "axios"

const API_KEY = "e77b613c447296755dab014d1426012a";

export const useTvShow = (id:string|number|undefined) => {
    if(!id) return
    const { isLoading: isLoadingDetails, data: details, error } = useQuery(["tv-show", id], () => {
        const data = axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US`)
        .then(res => {
            return res.data
        })
        return data
    });

    const { isLoading: isLoadingCredits, data: credits, error: errorCredits } = useQuery(["tv-show-credits", id], () => {
        const data = axios.get(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${API_KEY}&language=en-US`)
        .then(res => {
            return res.data
        })
        return data;
    })

    const { isLoading: isLoadingProviders, data: providers, error: errorProviders } = useQuery(["tv-show-providers", id], () => {  
        const data = axios.get(`https://api.themoviedb.org/3/tv/${id}/watch/providers?api_key=${API_KEY}`)
        .then(res => {
            return res.data
        })
        return data;
    })

    const { isLoading: isLoadingSimilar, data: similar, error: errorSimilar } = useQuery(["tv-show-similar", id], () => {
        const data = axios.get(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US`)
        .then(res => {
            return res.data
        })
        return data;
    })

    const { isLoading: isLoadingReviews, data: reviews, error: errorReviews } = useQuery(["tv-show-reviews", id], () => {
        const data = axios.get(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${API_KEY}&language=en-US`)
        .then(res => {
            return res.data.results
        })
        return data;
    })

    return { isLoadingDetails, details, error, isLoadingCredits, credits, errorCredits, isLoadingProviders, providers, errorProviders, isLoadingSimilar, similar, errorSimilar, isLoadingReviews, reviews, errorReviews }
}