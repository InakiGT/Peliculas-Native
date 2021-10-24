import axios from "axios";

const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '630798599dd5c8034914b690a8120e6a',
        language: 'es-ES'
    }
});

export default movieDB;