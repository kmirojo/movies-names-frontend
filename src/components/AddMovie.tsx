import { ChangeEvent, FormEvent, useState } from "react";
import { IAddMovie } from "../interfaces/Movie";

const AddMovie = ({ createMovie }: IAddMovie) => {
    const [value, setValue] = useState("");

    const onsubmit = (ev: FormEvent<HTMLFormElement>) => {
        ev.preventDefault();

        if (value.trim().length > 0) {
            createMovie(value);
            setValue("");
        }
    };

    const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
        setValue(ev.target.value);
    };

    return (
        <>
            <h3>Add Movie</h3>
            <form onSubmit={onsubmit}>
                <input
                    type="text"
                    className="form-control"
                    placeholder="New movie name"
                    value={value}
                    onChange={onChange}
                />
            </form>
        </>
    );
};

export default AddMovie;
