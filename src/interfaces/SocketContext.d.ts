import { IMovie } from "./Movie";

export interface ISocketContext {
    socket: SocketIOClient.Socket;
    online: boolean;
    movies: IMovie[];
}
