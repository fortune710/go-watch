import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface usePersonHook {
    isLoadingDetails: boolean;
    isLoadingMovies: boolean;
    isLoadingTVShows: boolean;
    isLoadingSocials: boolean;
    isLoadingCredits: boolean;
    isLoadingMoreImages: boolean;
    moreImages: any;
    socials: any;
    credits: any;
    details: any;
    movies: any;
    shows: any;
}

const API_KEY = import.meta.env.VITE_API_KEY;

export const usePerson = (id:string|number|undefined): usePersonHook => {
    const { isLoading: isLoadingDetails, data: details } = useQuery({ queryKey: ["person", id], queryFn: () => {
        const data = axios.get(`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}&language=en-US`)
         .then(res => res.data)
         return data
        } 
    });

    const { isLoading: isLoadingMovies, data:movies } = useQuery({ queryKey: ["person-movie", id], queryFn: async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
         .then(res => res.data)
         return data
        }

    })

    const { isLoading: isLoadingCredits, data: credits } = useQuery({ queryKey: ["person-movie", id], queryFn: () => {
        const data = axios.get(`https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${API_KEY}&language=en-US`)
         .then(res => res.data)
         return data
        }
        //Perform some sort of Pagination here
    })

    const { isLoading: isLoadingSocials, data: socials } = useQuery({ queryKey: ["person-movie", id], queryFn: async () => {
        const data = await axios.get(`https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${API_KEY}&language=en-US`)
        .then(res => res.data)
         console.log(data)
         return data
        }

    })

    const { isLoading: isLoadingTVShows, data:shows } = useQuery({ queryKey: ["person-shows", id], queryFn: () => {
        const data = axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
         .then(res => res.data)
         return data

        }
    })

    const { isLoading: isLoadingMoreImages, data: moreImages } = useQuery({ queryKey: ["person-shows", id], queryFn: () => {
        const data = axios.get(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${API_KEY}&language=en-US`)
         .then(res => res.data)
         return data

        }
    })

    return { 
        isLoadingDetails, 
        isLoadingMovies, 
        isLoadingTVShows,
        isLoadingSocials,
        isLoadingCredits,
        isLoadingMoreImages,
        moreImages,
        details,
        movies,
        shows,
        socials,
        credits,
    }
}