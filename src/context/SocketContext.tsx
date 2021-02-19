import React, { createContext } from "react";
import useSocket from "../hooks/useSocket";
import { ISocketContext } from "../interfaces/SocketContext";

export const SocketContext = createContext<ISocketContext>(
    {} as ISocketContext
);

export const SocketProvider = ({ children }: { children: JSX.Element }) => {
    const { socket, online, movies } = useSocket("http://localhost:8080");

    return (
        <SocketContext.Provider value={{ socket, online, movies }}>
            {children}
        </SocketContext.Provider>
    );
};
