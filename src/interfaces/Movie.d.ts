export interface IMovie {
    id: string;
    name: string;
    votes: number;
}

export interface IAddMovie {
    createMovie: (name: string) => void;
}
