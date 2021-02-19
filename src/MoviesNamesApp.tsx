import React from "react";
import HomePage from "./HomePage";
import { SocketProvider } from "./context/SocketContext";

const MoviesNamesApp = () => {
    return (
        <SocketProvider>
            <HomePage />
        </SocketProvider>
    );
};

export default MoviesNamesApp;
