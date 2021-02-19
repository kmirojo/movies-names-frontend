import { ChangeEvent, useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { IMovie } from "../interfaces/Movie";

const MovieList = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);

    const { socket } = useContext(SocketContext);

    useEffect(() => {
        socket.on("current-movies", (movies: IMovie[]) => {
            setMovies(movies);
        });

        return () => {
            socket.off("current-movies");
        };
    }, [socket]);

    const nameChanged = (ev: ChangeEvent<HTMLInputElement>, id: string) => {
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
        socket.emit("change-movie-name", { id, name });
    };

    const vote = (id: string) => {
        socket.emit("vote-movie", { id });
    };

    const deleteMovie = (id: string) => {
        socket.emit("delete-movie", { id });
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
