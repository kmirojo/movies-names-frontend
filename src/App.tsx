import React, { useEffect, useState } from "react";
import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import io from "socket.io-client";
import { IMovie } from "./interfaces/Movie";

const connectSocketServer = () => {
    // Connection with Socket Server
    const socket = io.connect("http://localhost:8080", {
        transports: ["websocket"],
    });
    return socket;
};

function App() {
    const [socket] = useState(connectSocketServer());
    const [online, setOnline] = useState(false);
    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        socket.on("connect", () => {
            setOnline(true);
        });

        socket.on("current-movies", (moviesFromServer: IMovie[]) => {
            setMovies(moviesFromServer);
        });

        socket.on("disconnect", () => {
            setOnline(false);
        });
    }, [socket]);

    const setSocketStatus = () => {
        if (online) {
            return (
                <span className="socket-status-label text-success">Online</span>
            );
        }

        return <span className="socket-status-label text-danger">Offline</span>;
    };

    const vote = (id: string) => {
        socket.emit("vote-movie", { id });
    };

    const deleteMovie = (id: string) => {
        socket.emit("delete-movie", { id });
    };

    const changeMovieName = (id: string, name: string) => {
        socket.emit("change-movie-name", { id, name });
    };

    const createMovie = (name: string) => {
        socket.emit("new-movie", { name });
    };

    return (
        <div className="container">
            <div className="alert">
                <p>
                    Service status:
                    {setSocketStatus()}
                </p>
            </div>

            <h1>Movies</h1>
            <hr />
            <div className="row">
                <div className="col-8">
                    <MovieList
                        data={movies}
                        vote={vote}
                        deleteMovie={deleteMovie}
                        changeMovieName={changeMovieName}
                    />
                </div>
                <div className="col-4">
                    <AddMovie createMovie={createMovie} />
                </div>
            </div>
        </div>
    );
}

export default App;
