import React, { useContext } from "react";
import { SocketContext } from "./context/SocketContext";

import AddMovie from "./components/AddMovie";
import MovieList from "./components/MovieList";
import MoviesChart from "./components/MoviesChart";

function HomePage() {
    const { online } = useContext(SocketContext);

    const setSocketStatus = () => {
        if (online) {
            return (
                <span className="socket-status-label text-success">Online</span>
            );
        }

        return <span className="socket-status-label text-danger">Offline</span>;
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
                <div className="col">
                    <MoviesChart />
                </div>
            </div>

            <div className="row">
                <div className="col-8">
                    <MovieList />
                </div>
                <div className="col-4">
                    <AddMovie />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
