import React, { useEffect, useState } from "react";
import { IMovie } from "../interfaces/Movie";

const MovieList = ({ data, vote, deleteMovie, changeMovieName }: any) => {
    const [movies, setMovies] = useState(data);

    useEffect(() => {
        console.log(data);
        setMovies(data);
    }, [data]);

    const nameChanged = (
        ev: React.ChangeEvent<HTMLInputElement>,
        id: string
    ) => {
        const newName = ev.target.value;
        setMovies((movies: IMovie[]) =>
            movies.map((movie) => {
                if (movie.id === id) {
                    movie.name = newName;
                }

                return movie;
            })
        );
    };

    const onFocusLost = (id: string, name: string) => {
        changeMovieName(id, name);
    };

    const createRows = () => {
        return movies.map((movie: IMovie) => (
            <tr key={movie.id}>
                <td>
                    <button
                        className="btn btn-primary"
                        onClick={vote.bind(this, movie.id)}
                    >
                        +1
                    </button>
                </td>
                <td>
                    <input
                        type="text"
                        className="form form-control"
                        value={movie.name}
                        onChange={(event) => nameChanged(event, movie.id)}
                        onBlur={onFocusLost.bind(null, movie.id, movie.name)}
                    />
                </td>
                <td>
                    <h3>{movie.votes}</h3>
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={deleteMovie.bind(null, movie.id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Votes</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>{createRows()}</tbody>
            </table>
        </>
    );
};

export default MovieList;
