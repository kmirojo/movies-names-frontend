import { useEffect, useMemo, useState } from "react";
import io from "socket.io-client";
import { IMovie } from "../interfaces/Movie";

const useSocket = (serverPath: string) => {
    // Connection with Socket Server
    // UseMemo => Executes the connection only if serverPath changes
    const socket = useMemo(
        () => io.connect(serverPath, { transports: ["websocket"] }),
        [serverPath]
    );

    const [online, setOnline] = useState(false);
    const [movies, setMovies] = useState<IMovie[]>([]);

    // online management when socket is connected/disconnected
    useEffect(() => {
        setOnline(socket.connected);
    }, [socket]);

    useEffect(() => {
        socket.on("connect", () => {
            setOnline(true);
        });
    }, [socket]);

    useEffect(() => {
        socket.on("disconnect", () => {
            setOnline(false);
        });
    }, [socket]);

    useEffect(() => {
        socket.on("current-movies", (movies: IMovie[]) => {
            setMovies(movies);
        });

        return () => {
            socket.off("current-movies");
        };
    }, [socket]);

    return {
        socket,
        online,
        movies,
    };
};
export default useSocket;
