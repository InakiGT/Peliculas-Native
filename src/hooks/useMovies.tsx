import { useEffect, useState } from "react";

import movieDB from '../api/movieDB';
import { MoviesResponse, Movie } from '../interfaces/movieInterface';


interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
}

export const useMovies = () => {
    
    const [ isLoading, setIsLoaging ] = useState(true);
    const [ moviesState, setMoviesState ] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upcoming: [],
    });

    const getMovies = async () => {

        const nowPlayingPromise = movieDB.get<MoviesResponse>('/now_playing');
        const popularPromise    = movieDB.get<MoviesResponse>('/popular');
        const topRatedPromise   = movieDB.get<MoviesResponse>('/top_rated');
        const upcomingPromise   = movieDB.get<MoviesResponse>('/upcoming');

        // Ejecuta todas de las peticiones de manera simultanea, si una falla todas lo hacen
        const res = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upcomingPromise
        ]);

        setMoviesState({
            nowPlaying:res[0].data.results,
            popular: res[1].data.results,
            topRated: res[2].data.results,
            upcoming: res[3].data.results,
        });

        setIsLoaging(false);
    }

    useEffect(() => {
        getMovies();
    }, []);

    return {
        ...moviesState,
        isLoading
    }
}