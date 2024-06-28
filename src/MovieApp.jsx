import { useState } from 'react'
import './MovieApp.css'

export const MovieApp = () => {

    const [search, setSearch] = useState('')
    const [moviesList, setMoviesList] = useState(null)

    const urlBase = 'https://api.themoviedb.org/3/search/movie'
    const API_KEY = 'f3d681fd28f6a09c258003997e680346'

    const handleChange = ({ target }) => {
        setSearch(target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        fetchMovies()
    }

    const fetchMovies = async () => {
        try {
            const response = await fetch(`${urlBase}?query=${search}&api_key=${API_KEY}&language=es-ES`)
            const data = await response.json()
            setMoviesList(data.results)
        } catch (error) {
            console.error('Has been ocur an error: ', error)
        }
    }

    return (
        <div className='container'>
            <h1>Find your favorite movie</h1>

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder='Find a movie' value={search}
                    onChange={handleChange} />

                <button>Find</button>
            </form>
            {moviesList && 
                <div className="movie-list">
                    {moviesList.map(movie => (
                        <div key={movie.id} className='movie-card'>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
